import {Request,Response, NextFunction } from "express"
import otpTemplateValidation from "../validations/otp-template-validation"
import otpTemplateService from "../services/otp-template-service";


class OtpTemplateController {

    create = async (req:Request,res:Response,next:NextFunction) => {
        const body = await otpTemplateValidation.create.validateAsync(req.body);
        const data = await otpTemplateService.create(body);
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