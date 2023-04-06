import { Request, Response, NextFunction } from 'express';
import authValidation from '../validations/auth-validation';
import adminService from '../services/admin-service';
import ErrorHandler from '../utils/error-handler';
import Messages from '../utils/messages';
import responseSuccess from '../utils/response';
import otpService from '../services/otp-service';
import tokenService from '../services/token-service';
import AdminDto from '../dtos/admin-dto';
import Constants from '../utils/constants';
import smsService from '../services/sms-service';

class AuthController {

    register = async (req: Request, res: Response, next: NextFunction) => {
        const body = await authValidation.register.validateAsync(req.body);
        const admin = await adminService.findAdmin({ mobile: body.mobile })
        if (admin)
            return next(ErrorHandler.forbidden(Messages.AUTH.ACCOUNT_ALREADY_REGISTERED))
        const register = await adminService.createAdmin(body);
        const otp = otpService.generateOtp();
        const otpRes = await otpService.createOtp({otp:otp,admin_id:register.id,type:Constants.OTP_TYPE.MOBILE_VERIFICATION});
        await smsService.sendOtp({mobile:body.mobile,otp:otp});
        return register ? responseSuccess({ res, message: Messages.AUTH.ACCOUNT_CREATED }) : next(ErrorHandler.serverError());
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        const body = await authValidation.login.validateAsync(req.body);

        const admin = await adminService.findAdmin({ mobile: body.mobile })
        if (!admin)
            return next(ErrorHandler.notFound(Messages.AUTH.ACCOUNT_NOT_FOUND))

        const isMatched: boolean = adminService.verifyPassword(body.password, admin.password);
        if (!isMatched)
            return next(ErrorHandler.forbidden(Messages.AUTH.INVALID_PASSWORD))

        const tokenPayload = {
            id: admin.id,
            name: admin.name,
            mobile: admin.mobile,
            auth: false
        }

        const { accessToken, refreshToken } = tokenService.generateToken(tokenPayload);
        const response = {
            admin: new AdminDto(admin),
            accessToken,
            refreshToken
        }
        return responseSuccess({ res, message: Messages.AUTH.LOGIN_SUCCESS, data: response })
    }

    verify = async (req: Request, res: Response, next: NextFunction) => {
        let isValidToken = false;
        const body = await authValidation.verify.validateAsync(req.body);

        const admin = await adminService.findAdmin({ mobile: body.mobile })
        if (!admin)
            return next(ErrorHandler.notFound(Messages.AUTH.ACCOUNT_NOT_FOUND))

        const otp = await otpService.verifyOtp({ admin_id: admin.id, otp: body.otp, type: Constants.OTP_TYPE.MOBILE_VERIFICATION });
        if (!otp)
            return next(ErrorHandler.forbidden(Messages.AUTH.INVALID_OTP))

        //  => otp expired validation

        if (!admin.isPhoneVerified)
            await adminService.updateAdmin({ mobile: admin.mobile }, { isPhoneVerified: true });

        if (body.token) {
            const tokenAdmin = tokenService.verifyAccessToken(body.token);
            if (!tokenAdmin)
                return next(ErrorHandler.forbidden(Messages.AUTH.INVALID_ACCESS_TOKEN))
            isValidToken = true
        }

        if (isValidToken) {
            const tokenPayload = {
                id: admin.id,
                name: admin.name,
                mobile: admin.mobile,
                auth: true
            }

            const { accessToken, refreshToken } = tokenService.generateToken(tokenPayload);
            const response = {
                admin: new AdminDto(admin),
                accessToken,
                refreshToken
            }

            return responseSuccess({ res, message: Messages.AUTH.LOGIN_SUCCESS, data: response })
        }

        return responseSuccess({ res, message: Messages.AUTH.ACCOUNT_VERIFIED })

    }

}

export default new AuthController