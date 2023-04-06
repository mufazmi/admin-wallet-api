import express from 'express';


const router = express.Router();

import authRoute from '../routes/auth-route';
import messageTemplateRoute from '../routes/message-template-route';


router.use('/auth',authRoute);
router.use('/message/template',messageTemplateRoute);

export default router