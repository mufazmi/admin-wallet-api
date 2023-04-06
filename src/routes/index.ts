import express from 'express';
const router = express.Router();


import authRoute from '../routes/auth-route';
import messageTemplateRoute from '../routes/message-template-route';
import countryRoute from '../routes/country-route';
import stateRoute from '../routes/state-route';
import cityRoute from '../routes/city-route';
import notificationRoute from '../routes/notification-route';


router.use('/auth', authRoute);
router.use('/message/template', messageTemplateRoute);
router.use('/country', countryRoute);
// router.use('/state', stateRoute);
// router.use('/city', cityRoute);
// router.use('/notification', notificationRoute);



export default router