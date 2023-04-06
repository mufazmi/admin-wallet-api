import express from 'express';
import messageTemplateController from '../controllers/message-template-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.post('/',am(messageTemplateController.create))
router.get('/',am(messageTemplateController.create))
router.get('/:id',am(messageTemplateController.create))
router.patch('/:id',am(messageTemplateController.create))
router.delete('/:id',am(messageTemplateController.create))


export default router;