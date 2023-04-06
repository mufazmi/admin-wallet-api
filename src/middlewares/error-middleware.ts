import { Request,Response,NextFunction } from "express";
import Constants from "../utils/constants";

const errorMiddleware = (err:any, req:Request, res:Response, next:NextFunction) =>{

    err.statusCode = err.statusCode || Constants.STATUS_CODE.SERVER_ERROR
    err.message = err.message || Constants.SERVER_MESSAGE.SERVER_ERROR
    res.status(err.statusCode).json({success:false,message:err.message})

}

export default errorMiddleware