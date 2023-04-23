import { Response, NextFunction } from "express"
import navigationValidation from "../validations/navigation-validation"
import responseSuccess from "../utils/response";
import ErrorHandler from "../utils/error-handler";
import Messages from '../utils/messages';
import navigationService from "../services/navigation-service";
import { AuthRequest } from "../interfaces/interface";


class NavigationController {

    create = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const body = await navigationValidation.create.validateAsync(req.body);
        const data = await navigationService.create(body);
        return data ? responseSuccess({ res: res, message: Messages.NAVIGATION.NAVIGATION_CREATED }) : next(ErrorHandler.serverError(Messages.NAVIGATION.NAVIGATION_CREATION_FAILED));
    }

    findOne = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await navigationService.findOne({ id });
        return data ? responseSuccess({ res: res, message: Messages.NAVIGATION.NAVIGATION_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.NAVIGATION.NAVIGATION_NOT_FOUND));
    }

    findAll = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const data = await navigationService.findAll({});
        return data ? responseSuccess({ res: res, message: Messages.NAVIGATION.NAVIGATION_FOUND, data: data }) : next(ErrorHandler.notFound(Messages.NAVIGATION.NAVIGATION_NOT_FOUND));
    }

    update = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const body = await navigationValidation.update.validateAsync(req.body);
        const template = await navigationService.findOne({ id });
        if (!template)
            return next(ErrorHandler.notFound(Messages.NAVIGATION.NAVIGATION_NOT_FOUND))

        const data = await navigationService.update({ id }, body);
        return data ? responseSuccess({ res: res, message: Messages.NAVIGATION.NAVIGATION_UPDATED }) : next(ErrorHandler.serverError(Messages.NAVIGATION.NAVIGATION_UPDATE_FAILED));
    }

    destroy = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await navigationService.destroy({id});
        return data ? responseSuccess({ res: res, message: Messages.NAVIGATION.NAVIGATION_DELATED }) : next(ErrorHandler.notFound(Messages.NAVIGATION.NAVIGATION_DELETE_FAILED));
    }
}

export default new NavigationController