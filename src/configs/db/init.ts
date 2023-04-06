
import Otp from "../../models/otp-model";
import Admin from "../../models/admin-model";
import CountryModel from "../../models/country-model";
import MessageTemplateModel from "../../models/message-template-model";
import config from "../config";
import StateModel from "../../models/state-model";
import CityModel from "../../models/city-model";
import NotificationTokenModel from "../../models/notification-token-model";
require('./db')

const isDev = config.APP_ENV === 'development'
console.log("config.APP_ENV === 'development'",config.APP_ENV === 'development')

const dbInit = async () =>{
    // await Admin.sync({alter:isDev})
    // await Otp.sync({alter:isDev})
    // await MessageTemplateModel.sync({alter:isDev})
    // await CountryModel.sync({alter:isDev})
    // await StateModel.sync({alter:isDev})
    // await CityModel.sync({alter:isDev})
    // await NotificationTokenModel.sync({alter:isDev})
}

export default dbInit