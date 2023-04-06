
import Otp from "../../models/otp-model";
import User from "../../models/admin-model";
import config from "../config";
require('./db')

const isDev = config.APP_ENV === 'development'
console.log("config.APP_ENV === 'development'",config.APP_ENV === 'development')

const dbInit = () =>{
    // User.sync({alter:isDev})
    // Otp.sync({alter:isDev})
}

export default dbInit