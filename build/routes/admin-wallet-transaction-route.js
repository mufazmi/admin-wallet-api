"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_wallet_transaction_controller_1 = __importDefault(require("../controllers/admin-wallet-transaction-controller"));
const am = require('../middlewares/async-middleware');
const router = express_1.default.Router();
router.post('/', am(admin_wallet_transaction_controller_1.default.create));
router.post('/deposit', am(admin_wallet_transaction_controller_1.default.createDepositPurchase));
exports.default = router;
