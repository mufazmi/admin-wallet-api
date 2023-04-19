import { Request, Response, NextFunction } from "express"
import responseSuccess from "../utils/response";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import merchantFundService from "../services/fund-service";
import { AuthRequest } from "../interfaces/interface";
import fundService from "../services/fund-service";
import Constants from "../utils/constants";
import fundValidation from "../validations/fund-validation";
import adminWalletService from "../services/admin-wallet-service";
import { InferAttributes } from "sequelize";
import AdminWalletModel from "../models/admin-wallet";

class MerchantFundController {

    findOne = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await merchantFundService.findAll({ id });
        return data ? responseSuccess({ res: res, message: Messages.MERCHANT.FUND_MERCHANT_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.MERCHANT.FUND_MERCHANT_NOT_FOUND));
    }

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        const {status} = req.params;
        let payload: {status?:string} = {} 
        if(status)
            payload.status = status;
        const data = await merchantFundService.findAll(payload);
        return data.length > 1 ? responseSuccess({ res: res, message: Messages.MERCHANT.FUND_MERCHANT_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.MERCHANT.FUND_MERCHANT_NOT_FOUND));
    }


    approve = async (req:AuthRequest,res:Response,next:NextFunction) =>{
        const {admin} = req;
        const body = await fundValidation.update.validateAsync(req.body);
        const {id} = req.params;
        const fund = await fundService.findOne({id});
        if(!fund)
            return next(ErrorHandler.notFound(Messages.FUND.NOT_FOUND))
            
        if(body.action == Constants.STATUS.REJECTED)
            await fundService.update({id},body);

        if(body.action == Constants.STATUS.APPROVED){
            const adminWallet: InferAttributes<AdminWalletModel> | null = await adminWalletService.findOne({})

            if(adminWallet!.wallet < fund.amount)
                return next(ErrorHandler.forbidden(Messages.WALLET.WALLET_INSUFFICIENT_BALANCE));

            
        }

    }

}

export default new MerchantFundController