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
    

}

export default new MerchantController