import Merchant from '../models/merchant-model';
import { Request, Response, NextFunction } from 'express';
import authValidation from '../validations/auth-validation';
import ErrorHandler from '../utils/error-handler';
import Messages from '../utils/messages';
import responseSuccess from '../utils/response';
import merchantService from '../services/merchant-service';
import { InferAttributes } from 'sequelize';
import { AuthRequest } from '../interfaces/interface';
import merchantValidation from '../validations/merchant-validation';
import Constants from '../utils/constants';
import kycDocumentService from '../services/kyc-document-service';
import fileHelper from '../helpers/file-helper';

class MerchantController {

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        const { status } = req.params;
        let payload: { status?: string } = {}
        if (status)
            payload.status = status;
        const data = await merchantService.findAll(payload);
        return data.length > 0 ? responseSuccess({ res: res, message: Messages.MERCHANT.FUND_MERCHANT_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.MERCHANT.FUND_MERCHANT_NOT_FOUND));
    }

    findOne = async (req: Request, res: Response, next: NextFunction) => {
        const { status } = req.params;
        let payload: { status?: string } = {}
        if (status)
            payload.status = status;
        const data: InferAttributes<Merchant> | null = await merchantService.findOne(payload);
        return data ? responseSuccess({ res: res, message: Messages.MERCHANT.FUND_MERCHANT_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.MERCHANT.FUND_MERCHANT_NOT_FOUND));
    }

    updateKyc = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const body = await merchantValidation.updateKycStatus.validateAsync(req.body);
        const merchant = await merchantService.findOne({ id });
        if (!merchant) {
            return next(ErrorHandler.notFound(Messages.MERCHANT.NOT_FOUND));
        }
        const data = await merchantService.update({ id }, { status: body.status });
        if (data && body.status === Constants.STATUS.REJECTED) {
            const kycDoc = await kycDocumentService.findOne({ merchant_id: id });
            if (kycDoc) {
                const isDestroyed = await kycDoc?.destroy();
                // if (isDestroyed) {
                const filesRemoved = fileHelper.removeAll({ base: Constants.PATH.KYC_IMAGE, paths: [kycDoc?.aadhar_back, kycDoc?.aadhar_front, kycDoc?.pan_front, kycDoc?.proof] });
                if (!filesRemoved) {
                    console.error('Failed to remove files.');
                }
                // }
            }
        }
        return data ? responseSuccess({ res: res, message: Messages.KYC.UPDATED }) : next(ErrorHandler.notFound(Messages.KYC.UPDATE_FAILED));
    };


}

export default new MerchantController