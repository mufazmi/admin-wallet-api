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
const auth_validation_1 = __importDefault(require("../validations/auth-validation"));
const admin_service_1 = __importDefault(require("../services/admin-service"));
const error_handler_1 = __importDefault(require("../utils/error-handler"));
const messages_1 = __importDefault(require("../utils/messages"));
const response_1 = __importDefault(require("../utils/response"));
const otp_service_1 = __importDefault(require("../services/otp-service"));
const token_service_1 = __importDefault(require("../services/token-service"));
const admin_dto_1 = __importDefault(require("../dtos/admin-dto"));
const constants_1 = __importDefault(require("../utils/constants"));
const sms_service_1 = __importDefault(require("../services/sms-service"));
class AuthController {
    constructor() {
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const body = yield auth_validation_1.default.register.validateAsync(req.body);
            const admin = yield admin_service_1.default.findAdmin({ mobile: body.mobile });
            if (admin)
                return next(error_handler_1.default.forbidden(messages_1.default.AUTH.ACCOUNT_ALREADY_REGISTERED));
            const register = yield admin_service_1.default.createAdmin(body);
            const otp = otp_service_1.default.generateOtp();
            const otpRes = yield otp_service_1.default.createOtp({ otp: otp, admin_id: register.id, type: constants_1.default.OTP_TYPE.MOBILE_VERIFICATION });
            yield sms_service_1.default.sendOtp({ mobile: body.mobile, otp: otp });
            return register ? (0, response_1.default)({ res, message: messages_1.default.AUTH.ACCOUNT_CREATED }) : next(error_handler_1.default.serverError());
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const body = yield auth_validation_1.default.login.validateAsync(req.body);
            const admin = yield admin_service_1.default.findAdmin({ mobile: body.mobile });
            if (!admin)
                return next(error_handler_1.default.notFound(messages_1.default.AUTH.ACCOUNT_NOT_FOUND));
            const isMatched = admin_service_1.default.verifyPassword(body.password, admin.password);
            if (!isMatched)
                return next(error_handler_1.default.forbidden(messages_1.default.AUTH.INVALID_PASSWORD));
            const tokenPayload = {
                id: admin.id,
                name: admin.name,
                mobile: admin.mobile,
                auth: false
            };
            const { accessToken, refreshToken } = token_service_1.default.generateToken(tokenPayload);
            const response = {
                admin: new admin_dto_1.default(admin),
                accessToken,
                refreshToken
            };
            return (0, response_1.default)({ res, message: messages_1.default.AUTH.LOGIN_SUCCESS, data: response });
        });
        this.verify = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let isValidToken = false;
            const body = yield auth_validation_1.default.verify.validateAsync(req.body);
            const admin = yield admin_service_1.default.findAdmin({ mobile: body.mobile });
            if (!admin)
                return next(error_handler_1.default.notFound(messages_1.default.AUTH.ACCOUNT_NOT_FOUND));
            const otp = yield otp_service_1.default.verifyOtp({ admin_id: admin.id, otp: body.otp, type: constants_1.default.OTP_TYPE.MOBILE_VERIFICATION });
            if (!otp)
                return next(error_handler_1.default.forbidden(messages_1.default.AUTH.INVALID_OTP));
            //  => otp expired validation
            if (!admin.isPhoneVerified)
                yield admin_service_1.default.updateAdmin({ mobile: admin.mobile }, { isPhoneVerified: true });
            if (body.token) {
                const tokenAdmin = token_service_1.default.verifyAccessToken(body.token);
                if (!tokenAdmin)
                    return next(error_handler_1.default.forbidden(messages_1.default.AUTH.INVALID_ACCESS_TOKEN));
                isValidToken = true;
            }
            if (isValidToken) {
                const tokenPayload = {
                    id: admin.id,
                    name: admin.name,
                    mobile: admin.mobile,
                    auth: true
                };
                const { accessToken, refreshToken } = token_service_1.default.generateToken(tokenPayload);
                const response = {
                    admin: new admin_dto_1.default(admin),
                    accessToken,
                    refreshToken
                };
                return (0, response_1.default)({ res, message: messages_1.default.AUTH.LOGIN_SUCCESS, data: response });
            }
            return (0, response_1.default)({ res, message: messages_1.default.AUTH.ACCOUNT_VERIFIED });
        });
    }
}
exports.default = new AuthController;
