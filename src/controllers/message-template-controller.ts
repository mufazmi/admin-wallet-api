import {Request,Response, NextFunction } from "express"
import otpTemplateValidation from "../validations/message-template-validation"
import responseSuccess from "../utils/response";
import Constants from "../utils/constants";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import messageTemplateService from "../services/message-template-service";


class MessageTemplateController {

    create = async (req:Request,res:Response,next:NextFunction) => {
        const body = await otpTemplateValidation.create.validateAsync(req.body);
        const data = await messageTemplateService.create(body);
        return data ? responseSuccess({res:res,message:Messages.MESSAGE.TEMPLATE_MESSAGE_CREATED}) : next(ErrorHandler.serverError(Messages.MESSAGE.TEMPLATE_MESSAGE_CREATION_FAILED));
    }

    update = async (req:Request,res:Response,next:NextFunction) => {
        const {id} = req.params;
        const body = await otpTemplateValidation.update.validateAsync(req.body);
        const template = await messageTemplateService.find({id});
        if(!template)
            return next(ErrorHandler.notFound(Messages.MESSAGE.TEMPLATE_MESSAGE_NOT_FOUND))
        
        const data = await messageTemplateService.update({id},body);
        return data ? responseSuccess({res:res,message:Messages.MESSAGE.TEMPLATE_MESSAGE_UPDATED}) : next(ErrorHandler.serverError(Messages.MESSAGE.TEMPLATE_MESSAGE_UPDATE_FAILED));
    }

    find = async (req:Request,res:Response,next:NextFunction) => {

    }

    findAll = async (req:Request,res:Response,next:NextFunction) => {

    }
    
    destroy = async (req:Request,res:Response,next:NextFunction) => {

    }
}

export default new MessageTemplateController