
import Otp from "../../models/otp-model";
import Admin from "../../models/admin-model";
import MessageTemplateModel from "../../models/message-template-model";
import config from "../config";
require('./db')

const isDev = config.APP_ENV === 'development'
console.log("config.APP_ENV === 'development'",config.APP_ENV === 'development')

const dbInit = () =>{
    Admin.sync({alter:isDev})
    Otp.sync({alter:isDev})
    MessageTemplateModel.sync({alter:isDev})
}

export default dbInit