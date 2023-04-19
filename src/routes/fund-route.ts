import express from 'express';
import merchantFundController from '../controllers/fund-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.get('/',am(merchantFundController.findAll))
router.get('/:id',am(merchantFundController.findOne))

export default router;