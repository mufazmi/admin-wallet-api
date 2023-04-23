import express from 'express';
import navigationController from '../controllers/navigation-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.post('/',am(navigationController.create))
router.get('/',am(navigationController.findAll))
router.get('/:id',am(navigationController.findOne))
router.patch('/:id',am(navigationController.update))
router.delete('/:id',am(navigationController.destroy))

export default router;