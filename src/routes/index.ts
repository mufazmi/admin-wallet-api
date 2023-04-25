import express from 'express';
const router = express.Router();

import authRoute from './auth-route';
import messageTemplateRoute from '../routes/message-template-route';
import adminWalletTransactionRoute from '../routes/admin-wallet-transaction-route';

import countryRoute from '../routes/country-route';
import stateRoute from '../routes/state-route';
import cityRoute from '../routes/city-route';
import notificationRoute from '../routes/notification-route';
import auth from '../middlewares/auth-middleware';
import fundRoute from './fund-route';
import navigationRoute from './navigation-route';
import merchantRoute from './merchant-route';


router.use('/auth', authRoute);
router.use('/message/template', messageTemplateRoute);
router.use('/country', countryRoute);
router.use('/admin/wallet/transaction',auth,adminWalletTransactionRoute)
router.use('/fund',auth,fundRoute)
router.use('/navigation',auth,navigationRoute)
router.use('/state', stateRoute);
router.use('/city', cityRoute);
router.use('/notification', notificationRoute);
router.use('/merchant', merchantRoute);



export default router