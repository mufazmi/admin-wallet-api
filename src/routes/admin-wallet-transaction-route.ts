import express from 'express';
import adminWalletTransactionController from '../controllers/admin-wallet-transaction-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.post('/',am(adminWalletTransactionController.create))
router.post('/deposit',am(adminWalletTransactionController.createDepositPurchase))


export default router;