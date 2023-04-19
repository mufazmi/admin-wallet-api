"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_wallet_transaction_validation_1 = __importDefault(require("../validations/admin-wallet-transaction-validation"));
const response_1 = __importDefault(require("../utils/response"));
const error_handler_1 = __importDefault(require("../utils/error-handler"));
const messages_1 = __importDefault(require("../utils/messages"));
const admin_wallet_transaction_service_1 = __importDefault(require("../services/admin-wallet-transaction-service"));
const admin_wallet_service_1 = __importDefault(require("../services/admin-wallet-service"));
const constants_1 = __importDefault(require("../utils/constants"));
class AdminWalletTransactionController {
    constructor() {
        this.createDepositPurchase = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let data = null;
            //@ts-ignore
            const { id } = req.admin;
            const body = yield admin_wallet_transaction_validation_1.default.createDepositPurchase.validateAsync(req.body);
            body.created_by = id;
            const wallet = yield admin_wallet_service_1.default.findOne({});
            if (!wallet)
                return next(error_handler_1.default.notFound(constants_1.default.WALLET.WALLET_NOT_FOUND));
            body.opening_balance = wallet.pool_account;
            if (body.transaction_type === constants_1.default.TRANSACTION.TYPE_DEPOSIT) {
                body.type = constants_1.default.WALLET.TYPE_POOL;
                body.closing_balance = wallet.pool_account + body.amount;
                body.status = constants_1.default.TRANSACTION.STATUS_SUCCESS;
                body.transaction_type = constants_1.default.TRANSACTION.TYPE_CREDIT;
                data = yield admin_wallet_transaction_service_1.default.create(body);
                if (!data)
                    return next(error_handler_1.default.serverError(constants_1.default.TRANSACTION.CREATION_FAILED));
                let finalAmout = wallet.pool_account + body.amount;
                const isWalletUpdated = yield admin_wallet_service_1.default.update({}, { pool_account: finalAmout });
                if (!isWalletUpdated)
                    yield admin_wallet_service_1.default.destroy({ id: data.id });
            }
            else if (body.transaction_type === constants_1.default.TRANSACTION.TYPE_PURCHASE) {
                if (wallet.pool_account < body.amount)
                    return next(error_handler_1.default.forbidden(messages_1.default.WALLET.WALLET_POOL_INSUFFICIENT_BALANCE));
                body.closing_balance = wallet.pool_account - body.amount;
                body.closing_balance = wallet.wallet + body.amount;
                body.type = constants_1.default.WALLET.TYPE_POOL;
                body.status = constants_1.default.TRANSACTION.STATUS_SUCCESS;
                body.transaction_type = constants_1.default.TRANSACTION.TYPE_DEBIT;
                data = yield admin_wallet_transaction_service_1.default.create(body);
                if (!data)
                    return next(error_handler_1.default.serverError(constants_1.default.TRANSACTION.CREATION_FAILED));
                let finalAmout = wallet.pool_account - body.amount;
                let walletFinalAmout = wallet.wallet + body.amount;
                const isWalletUpdated = yield admin_wallet_service_1.default.update({}, { pool_account: finalAmout, wallet: walletFinalAmout });
                if (!isWalletUpdated)
                    yield admin_wallet_service_1.default.destroy({ id: data.id });
            }
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.WALLET.WALLET_TRANSACTION_CREATED }) : next(error_handler_1.default.serverError(messages_1.default.WALLET.WALLET_TRANSACTION_CREATION_FAILED));
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let data = null;
            //@ts-ignore
            const { id } = req.admin;
            const body = yield admin_wallet_transaction_validation_1.default.create.validateAsync(req.body);
            body.created_by = id;
            const wallet = yield admin_wallet_service_1.default.findOne({});
            if (!wallet)
                return next(error_handler_1.default.notFound(constants_1.default.WALLET.WALLET_NOT_FOUND));
            body.opening_balance = wallet.pool_account;
            if (body.type === constants_1.default.WALLET.TYPE_POOL) {
                if (body.transaction_type != constants_1.default.TRANSACTION.TYPE_CREDIT)
                    return next(error_handler_1.default.forbidden(constants_1.default.TRANSACTION.TYPE_NOT_CREDIT));
                body.closing_balance = wallet.pool_account + body.amount;
                body.status = constants_1.default.TRANSACTION.STATUS_SUCCESS;
                data = yield admin_wallet_transaction_service_1.default.create(body);
                if (!data)
                    return next(error_handler_1.default.serverError(constants_1.default.TRANSACTION.CREATION_FAILED));
                let finalAmout = wallet.pool_account + body.amount;
                const isWalletUpdated = yield admin_wallet_service_1.default.update({}, { pool_account: finalAmout });
                if (!isWalletUpdated)
                    yield admin_wallet_service_1.default.destroy({ id: data.id });
            }
            else if (body.type === constants_1.default.WALLET.TYPE_WALLET) {
                if (body.transaction_type == constants_1.default.TRANSACTION.TYPE_CREDIT) {
                    if (wallet.pool_account < body.amount)
                        return next(error_handler_1.default.forbidden(messages_1.default.WALLET.WALLET_INSUFFICIENT_BALANCE));
                    body.closing_balance = wallet.pool_account - body.amount;
                    body.closing_balance = wallet.wallet + body.amount;
                    body.status = constants_1.default.TRANSACTION.STATUS_SUCCESS;
                    data = yield admin_wallet_transaction_service_1.default.create(body);
                    if (!data)
                        return next(error_handler_1.default.serverError(constants_1.default.TRANSACTION.CREATION_FAILED));
                    let finalAmout = wallet.pool_account - body.amount;
                    const isWalletUpdated = yield admin_wallet_service_1.default.update({}, { pool_account: finalAmout });
                    if (!isWalletUpdated)
                        yield admin_wallet_service_1.default.destroy({ id: data.id });
                }
                else {
                    // if (wallet.pool_account < body.amount)
                    //     return next(ErrorHandler.forbidden(Messages.WALLET.WALLET_INSUFFICIENT_BALANCE));
                    body.closing_balance = wallet.pool_account - body.amount;
                    body.closing_balance = wallet.wallet + body.amount;
                    body.status = constants_1.default.TRANSACTION.STATUS_SUCCESS;
                    data = yield admin_wallet_transaction_service_1.default.create(body);
                    if (!data)
                        return next(error_handler_1.default.serverError(constants_1.default.TRANSACTION.CREATION_FAILED));
                    let finalAmout = wallet.pool_account - body.amount;
                    const isWalletUpdated = yield admin_wallet_service_1.default.update({}, { pool_account: finalAmout });
                    if (!isWalletUpdated)
                        yield admin_wallet_service_1.default.destroy({ id: data.id });
                }
            }
            console.log(data);
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.WALLET.WALLET_TRANSACTION_CREATED }) : next(error_handler_1.default.serverError(messages_1.default.WALLET.WALLET_TRANSACTION_CREATION_FAILED));
        });
        this.findOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield admin_wallet_transaction_service_1.default.findAll({ id });
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.WALLET.WALLET_TRANSACTION_FOUND, data: data }) : next(error_handler_1.default.notFound(messages_1.default.WALLET.WALLET_TRANSACTION_NOT_FOUND));
        });
        this.findAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const data = yield admin_wallet_transaction_service_1.default.findAll({});
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.WALLET.WALLET_TRANSACTION_FOUND, data: data }) : next(error_handler_1.default.notFound(messages_1.default.WALLET.WALLET_TRANSACTION_NOT_FOUND));
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //@ts-ignore
            const { admin } = req;
            const body = yield admin_wallet_transaction_validation_1.default.update.validateAsync(req.body);
            body.updated_by = admin.id;
            const template = yield admin_wallet_transaction_service_1.default.findOne({ id });
            if (!template)
                return next(error_handler_1.default.notFound(messages_1.default.WALLET.WALLET_TRANSACTION_NOT_FOUND));
            const data = yield admin_wallet_transaction_service_1.default.update({ id }, body);
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.WALLET.WALLET_TRANSACTION_UPDATED }) : next(error_handler_1.default.serverError(messages_1.default.WALLET.WALLET_TRANSACTION_UPDATE_FAILED));
        });
        this.destroy = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield admin_wallet_transaction_service_1.default.destroy({ id });
            return data ? (0, response_1.default)({ res: res, message: messages_1.default.WALLET.WALLET_TRANSACTION_DELATED }) : next(error_handler_1.default.notFound(messages_1.default.WALLET.WALLET_TRANSACTION_DELETE_FAILED));
        });
    }
}
exports.default = new AdminWalletTransactionController;
