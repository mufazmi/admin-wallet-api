import Merchant from '../models/merchant-model';
import { Request,Response,NextFunction } from 'express';
import authValidation from '../validations/auth-validation';
import ErrorHandler from '../utils/error-handler';
import Messages from '../utils/messages';
import tokenService from '../services/token-service';
import MerchantDto from '../dtos/merchant-dto';
import responseSuccess from '../utils/response';
import merchantService from '../services/merchant-service';

class MerchantController{
    
    login = async (req: Request, res: Response, next: NextFunction) => {
        const body = await authValidation.loginMerchant.validateAsync(req.body);

        const merchant = await merchantService.findMerchant({ mobile: body.mobile })
        if (!merchant)
            return next(ErrorHandler.notFound(Messages.AUTH.ACCOUNT_NOT_FOUND))

        const isMatched: boolean = merchantService.verifyPassword(body.password, merchant.password);
        if (!isMatched)
            return next(ErrorHandler.forbidden(Messages.AUTH.INVALID_PASSWORD))

        const tokenPayload = {
            id: merchant.id,
            name: merchant.name,
            mobile: merchant.mobile,
            auth: false
        }

        const { accessToken, refreshToken } = tokenService.generateToken(tokenPayload);
        const response = {
            merchant: new MerchantDto(merchant),
            accessToken,
            refreshToken
        }
        return responseSuccess({ res, message: Messages.AUTH.LOGIN_SUCCESS, data: response })
    }
}

export default new MerchantController