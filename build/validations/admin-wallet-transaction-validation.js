"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const constants_1 = __importDefault(require("../utils/constants"));
class AdminWalletTransactionValidation {
    constructor() {
        // declare order: number
        // declare type: string
        // declare transaction_type: string
        // declare transaction: string
        // declare amount: number
        // declare closing_balance: number
        // declare remark: string
        // declare status: string
        this.create = joi_1.default.object({
            order: joi_1.default.string().min(2).max(100).required(),
            type: joi_1.default.string().valid(constants_1.default.WALLET.TYPE_POOL, constants_1.default.WALLET.TYPE_WALLET).required(),
            transaction_type: joi_1.default.string().valid(constants_1.default.TRANSACTION.TYPE_CREDIT, constants_1.default.TRANSACTION.TYPE_DEBIT).required(),
            transaction: joi_1.default.string().min(2).max(255).required(),
            amount: joi_1.default.number().min(1).required(),
            remark: joi_1.default.string().min(2).max(250).required(),
            status: joi_1.default.boolean().default(true)
        });
        this.createDepositPurchase = joi_1.default.object({
            transaction_type: joi_1.default.string().valid(constants_1.default.TRANSACTION.TYPE_DEPOSIT, constants_1.default.TRANSACTION.TYPE_PURCHASE).required(),
            transaction: joi_1.default.string().min(2).max(255).optional(),
            amount: joi_1.default.number().min(1).required(),
            remark: joi_1.default.string().min(2).max(250).required(),
            status: joi_1.default.boolean().default(true)
        });
        this.update = joi_1.default.object({
            name: joi_1.default.string().min(2).max(100).optional(),
            status: joi_1.default.boolean().default(true),
            state_id: joi_1.default.string().uuid().optional(),
        });
    }
}
exports.default = new AdminWalletTransactionValidation;
