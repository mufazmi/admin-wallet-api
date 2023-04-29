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
import { InferAttributes, InferCreationAttributes } from "sequelize";
import AdminWalletModel from "../models/admin-wallet";
import adminWalletTransactionService from "../services/admin-wallet-transaction-service";
import AdminWalletTransactionModel from "../models/admin-wallet-transaction-model";
import db from "../configs/db/db";

class MerchantFundController {

    findOne = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        console.log({id})
        const data = await merchantFundService.findOne({ id });
        return data ? responseSuccess({ res: res, message: Messages.MERCHANT.FUND_MERCHANT_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.MERCHANT.FUND_MERCHANT_NOT_FOUND));
    }

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        const { status } = req.params;
        let payload: { status?: string } = {}
        if (status)
            payload.status = status;
        const data = await merchantFundService.findAll(payload);
        return data.length > 0 ? responseSuccess({ res: res, message: Messages.MERCHANT.FUND_MERCHANT_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.MERCHANT.FUND_MERCHANT_NOT_FOUND));
    }


    approve = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { admin } = req;
        const body = await fundValidation.update.validateAsync(req.body);
        const { id } = req.params;

        const timestamp: Date = new Date();
        const fund = await fundService.findOne({ id });
        if (!fund)
            return next(ErrorHandler.notFound(Messages.FUND.NOT_FOUND))

        if (body.action == Constants.STATUS.REJECTED)
            await fundService.update({ id }, body);

        const adminWallet: InferAttributes<AdminWalletModel> | null = await adminWalletService.findOne({})

        if (!adminWallet || adminWallet!.wallet < fund.amount)
            return next(ErrorHandler.forbidden(Messages.WALLET.WALLET_INSUFFICIENT_BALANCE));

        const t = await db.transaction();

        try{


            const walletSummary : InferCreationAttributes<AdminWalletTransactionModel> = new AdminWalletTransactionModel({
                type:Constants.WALLET.TYPE_WALLET,
                transaction_type:Constants.TRANSACTION.TYPE_DEBIT,
                transaction:'From Wallet To Merchantt',
                amount:fund.amount,
                opening_balance:adminWallet!.wallet,
                closing_balance:adminWallet!.wallet - fund.amount,
                status:Constants.TRANSACTION.STATUS_SUCCESS,
                remark:'On Merchant Fund Request',
            });
            await AdminWalletTransactionModel.create(walletSummary,{transaction:t});
            
            await adminWalletService.update({ id: adminWallet!.id }, { wallet: adminWallet!.wallet - fund.amount });
            await adminWalletTransactionService.create(walletSummary)

            t.commit();

        }
        catch(e){
            console.log("Catched Exception is=====>",e)
            t.rollback();
        }


 
        // await adminWalletTransactionService.create(walletSummary);
        // await merchantWal

        
        return res.send("ok")

    }

}

export default new MerchantFundController