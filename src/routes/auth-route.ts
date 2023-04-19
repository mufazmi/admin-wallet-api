import express from 'express';
import authController from '../controllers/auth-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.post('/register',am(authController.register))
router.post('/login',am(authController.login))
router.post('/verify',am(authController.verify))


export default router;