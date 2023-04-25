import express from 'express';
import merchantController from '../controllers/merchant-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.get('/',am(merchantController.findAll))
router.get('/:id',am(merchantController.findOne))
router.patch('/:id',am(merchantController.update))

export default router;