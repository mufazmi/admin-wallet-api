import Joi from 'joi'
import Constants from '../utils/constants';

class AdminWalletTransactionValidation {

    // declare order: number
    // declare type: string
    // declare transaction_type: string
    // declare transaction: string
    // declare amount: number
    // declare closing_balance: number
    // declare remark: string
    // declare status: string

    create = Joi.object({
        order:Joi.string().min(2).max(100).required(),
        type : Joi.string().valid(Constants.WALLET.TYPE_POOL,Constants.WALLET.TYPE_WALLET).required(),
        transaction_type : Joi.string().valid(Constants.TRANSACTION.TYPE_CREDIT,Constants.TRANSACTION.TYPE_DEBIT).required(),
        transaction : Joi.string().min(2).max(255).required(),
        amount : Joi.string().min(2).max(10).required(),
        closing_balance : Joi.string().min(2).max(10).required(),
        remark : Joi.string().min(2).max(10).required(),
        status: Joi.boolean().default(true)
    });

    update = Joi.object({        
        name:Joi.string().min(2).max(100).optional(),
        status: Joi.boolean().default(true),
        state_id : Joi.string().uuid().optional(),
    });

}

export default new AdminWalletTransactionValidation