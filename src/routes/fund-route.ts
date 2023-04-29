import express from 'express';
import fundController from '../controllers/fund-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.get('/',am(fundController.findAll))
router.get('/:id',am(fundController.findOne))
router.get('/:status',am(fundController.findAll))
router.post('/:id',am(fundController.approve))

export default router;