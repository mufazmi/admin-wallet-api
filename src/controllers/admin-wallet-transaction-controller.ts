import { Request, Response, NextFunction } from "express"
import adminWalletTransactionValidation from "../validations/admin-wallet-transaction-validation"
import responseSuccess from "../utils/response";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import adminWalletTransactionService from "../services/admin-wallet-transaction-service";
import adminWalletService from "../services/admin-wallet-service";
import Constants from "../utils/constants";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import AdminWalletTransactionModel from "../models/admin-wallet-transaction-model";
import AdminWalletModel from "../models/admin-wallet";


class AdminWalletTransactionController {

    createDepositPurchase = async (req: Request, res: Response, next: NextFunction) => {
        let data: InferAttributes<AdminWalletTransactionModel> | any = null;
        //@ts-ignore
        const { id } = req.admin;
        const body: InferCreationAttributes<AdminWalletTransactionModel> = await adminWalletTransactionValidation.createDepositPurchase.validateAsync(req.body);
        body.created_by = id;
        const wallet: InferAttributes<AdminWalletModel> | null = await adminWalletService.findOne({});
        if (!wallet)
            return next(ErrorHandler.notFound(Constants.WALLET.WALLET_NOT_FOUND))

        body.opening_balance = wallet.pool_account

        if (body.transaction_type === Constants.TRANSACTION.TYPE_DEPOSIT) {

            body.type = Constants.WALLET.TYPE_POOL
            body.closing_balance = wallet.pool_account + body.amount
            body.status = Constants.TRANSACTION.STATUS_SUCCESS
            body.transaction_type = Constants.TRANSACTION.TYPE_CREDIT
            data = await adminWalletTransactionService.create(body);

            if (!data)
                return next(ErrorHandler.serverError(Constants.TRANSACTION.CREATION_FAILED))

            let finalAmout = wallet.pool_account + body.amount

            const isWalletUpdated = await adminWalletService.update({}, { pool_account: finalAmout })

            if (!isWalletUpdated)
                await adminWalletService.destroy({ id: data.id })


        } else if (body.transaction_type === Constants.TRANSACTION.TYPE_PURCHASE) {

            if (wallet.pool_account < body.amount)
                return next(ErrorHandler.forbidden(Messages.WALLET.WALLET_POOL_INSUFFICIENT_BALANCE));

            body.closing_balance = wallet.pool_account - body.amount
            body.closing_balance = wallet.wallet + body.amount
            body.type = Constants.WALLET.TYPE_POOL
            body.status = Constants.TRANSACTION.STATUS_SUCCESS
            body.transaction_type = Constants.TRANSACTION.TYPE_DEBIT
            data = await adminWalletTransactionService.create(body);

            if (!data)
                return next(ErrorHandler.serverError(Constants.TRANSACTION.CREATION_FAILED))

            let finalAmout = wallet.pool_account - body.amount
            let walletFinalAmout = wallet.wallet + body.amount

            const isWalletUpdated = await adminWalletService.update({}, { pool_account: finalAmout, wallet: walletFinalAmout })

            if (!isWalletUpdated)
                await adminWalletService.destroy({ id: data.id })
        }

        return data ? responseSuccess({ res: res, message: Messages.WALLET.WALLET_TRANSACTION_CREATED }) : next(ErrorHandler.serverError(Messages.WALLET.WALLET_TRANSACTION_CREATION_FAILED));
    }


    create = async (req: Request, res: Response, next: NextFunction) => {
        let data: InferAttributes<AdminWalletTransactionModel> | any = null;
        //@ts-ignore
        const { id } = req.admin;
        const body: InferCreationAttributes<AdminWalletTransactionModel> = await adminWalletTransactionValidation.create.validateAsync(req.body);
        body.created_by = id;
        const wallet: InferAttributes<AdminWalletModel> | null = await adminWalletService.findOne({});
        if (!wallet)
            return next(ErrorHandler.notFound(Constants.WALLET.WALLET_NOT_FOUND))

        body.opening_balance = wallet.pool_account

        if (body.type === Constants.WALLET.TYPE_POOL) {

            if (body.transaction_type != Constants.TRANSACTION.TYPE_CREDIT)
                return next(ErrorHandler.forbidden(Constants.TRANSACTION.TYPE_NOT_CREDIT))

            body.closing_balance = wallet.pool_account + body.amount
            body.status = Constants.TRANSACTION.STATUS_SUCCESS
            data = await adminWalletTransactionService.create(body);

            if (!data)
                return next(ErrorHandler.serverError(Constants.TRANSACTION.CREATION_FAILED))

            let finalAmout = wallet.pool_account + body.amount

            const isWalletUpdated = await adminWalletService.update({}, { pool_account: finalAmout })

            if (!isWalletUpdated)
                await adminWalletService.destroy({ id: data.id })


        } else if (body.type === Constants.WALLET.TYPE_WALLET) {

            if (body.transaction_type == Constants.TRANSACTION.TYPE_CREDIT) {
                if (wallet.pool_account < body.amount)
                    return next(ErrorHandler.forbidden(Messages.WALLET.WALLET_INSUFFICIENT_BALANCE));

                body.closing_balance = wallet.pool_account - body.amount
                body.closing_balance = wallet.wallet + body.amount
                body.status = Constants.TRANSACTION.STATUS_SUCCESS
                data = await adminWalletTransactionService.create(body);

                if (!data)
                    return next(ErrorHandler.serverError(Constants.TRANSACTION.CREATION_FAILED))

                let finalAmout = wallet.pool_account - body.amount

                const isWalletUpdated = await adminWalletService.update({}, { pool_account: finalAmout })

                if (!isWalletUpdated)
                    await adminWalletService.destroy({ id: data.id })
            } else {
                // if (wallet.pool_account < body.amount)
                //     return next(ErrorHandler.forbidden(Messages.WALLET.WALLET_INSUFFICIENT_BALANCE));

                body.closing_balance = wallet.pool_account - body.amount
                body.closing_balance = wallet.wallet + body.amount
                body.status = Constants.TRANSACTION.STATUS_SUCCESS
                data = await adminWalletTransactionService.create(body);

                if (!data)
                    return next(ErrorHandler.serverError(Constants.TRANSACTION.CREATION_FAILED))

                let finalAmout = wallet.pool_account - body.amount

                const isWalletUpdated = await adminWalletService.update({}, { pool_account: finalAmout })

                if (!isWalletUpdated)
                    await adminWalletService.destroy({ id: data.id })
            }
        }

        console.log(data);

        return data ? responseSuccess({ res: res, message: Messages.WALLET.WALLET_TRANSACTION_CREATED }) : next(ErrorHandler.serverError(Messages.WALLET.WALLET_TRANSACTION_CREATION_FAILED));
    }

    findOne = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await adminWalletTransactionService.findAll({ id });
        return data ? responseSuccess({ res: res, message: Messages.WALLET.WALLET_TRANSACTION_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.WALLET.WALLET_TRANSACTION_NOT_FOUND));

    }

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        const data = await adminWalletTransactionService.findAll({});
        return data ? responseSuccess({ res: res, message: Messages.WALLET.WALLET_TRANSACTION_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.WALLET.WALLET_TRANSACTION_NOT_FOUND));
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        //@ts-ignore
        const { admin } = req
        const body = await adminWalletTransactionValidation.update.validateAsync(req.body);
        body.updated_by = admin.id;
        const template = await adminWalletTransactionService.findOne({ id });
        if (!template)
            return next(ErrorHandler.notFound(Messages.WALLET.WALLET_TRANSACTION_NOT_FOUND))

        const data = await adminWalletTransactionService.update({ id }, body);
        return data ? responseSuccess({ res: res, message: Messages.WALLET.WALLET_TRANSACTION_UPDATED }) : next(ErrorHandler.serverError(Messages.WALLET.WALLET_TRANSACTION_UPDATE_FAILED));
    }


    destroy = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await adminWalletTransactionService.destroy({ id });
        return data ? responseSuccess({ res: res, message: Messages.WALLET.WALLET_TRANSACTION_DELATED }) : next(ErrorHandler.notFound(Messages.WALLET.WALLET_TRANSACTION_DELETE_FAILED));
    }
}

export default new AdminWalletTransactionController