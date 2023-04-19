"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_route_1 = __importDefault(require("./auth-route"));
const message_template_route_1 = __importDefault(require("../routes/message-template-route"));
const admin_wallet_transaction_route_1 = __importDefault(require("../routes/admin-wallet-transaction-route"));
const country_route_1 = __importDefault(require("../routes/country-route"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth-middleware"));
router.use('/auth', auth_route_1.default);
router.use('/message/template', message_template_route_1.default);
router.use('/country', country_route_1.default);
router.use('/admin/wallet/transaction', auth_middleware_1.default, admin_wallet_transaction_route_1.default);
// router.use('/state', stateRoute);
// router.use('/city', cityRoute);
// router.use('/notification', notificationRoute);
exports.default = router;