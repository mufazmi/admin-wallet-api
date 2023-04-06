import {Request,Response, NextFunction } from "express"
import otpTemplateValidation from "../validations/otp-template-validation"
import otpTemplateService from "../services/otp-template-service";
import responseSuccess from "../utils/response";
import Constants from "../utils/constants";
import ErrorHandler from "../utils/error-handler";


class OtpTemplateController {

    create = async (req:Request,res:Response,next:NextFunction) => {
        const body = await otpTemplateValidation.create.validateAsync(req.body);
        const data = await otpTemplateService.create(body);
        return data ? responseSuccess({res:res,message:Constants.MESSAGE.TEMPLATE_MESSAGE_CREATED}) : next(ErrorHandler.serverError(Constants.MESSAGE.TEMPLATE_MESSAGE_CREATION_FAILED));
    }

    update = async (req:Request,res:Response,next:NextFunction) => {
        const body = await otpTemplateValidation.update.validateAsync(req.body);

    }

    find = async (req:Request,res:Response,next:NextFunction) => {

    }

    findAll = async (req:Request,res:Response,next:NextFunction) => {

    }
    
    destroy = async (req:Request,res:Response,next:NextFunction) => {

    }
}

export default OtpTemplateController