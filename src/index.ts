import express, {Request,Response,NextFunction, Application} from 'express';
import dotenv from 'dotenv'
import ErrorHandler from './utils/error-handler';
import errorMiddleware from './middlewares/error-middleware';
const cookieParser = require('cookie-parser');

dotenv.config()
import dbInit from './configs/db/init';

//DB Init
dbInit();
const PORT:Number = Number(process.env.PORT || 3000)

const app:Application = express()
app.use(express.json())

//Cookie Parser Middleware
// app.use(cookieParser);

//Routes
import authRoute from './routes/auth-route';
import messageTemplateRoute from './routes/message-template-route';

//Auth Route
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/message/template',messageTemplateRoute);

// Not Found Middleware
app.use((req:Request,res:Response,next:NextFunction)=>{
    return next(ErrorHandler.notFound())
})

//Error Middleware
app.use(errorMiddleware)

//Listning Server
app.listen(PORT,()=>console.log(`SERVER IS LISTING ON ${PORT}`))