import Merchant from '../models/merchant-model';
import { Request, Response, NextFunction } from 'express';
import authValidation from '../validations/auth-validation';
import ErrorHandler from '../utils/error-handler';
import Messages from '../utils/messages';
import responseSuccess from '../utils/response';
import merchantService from '../services/merchant-service';
import { InferAttributes } from 'sequelize';

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


}

export default new MerchantController