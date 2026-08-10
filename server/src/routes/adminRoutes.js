import { Router } from 'express';
import * as adminController from '../controllers/adminController.js';

const router = Router();

router.post('/login', adminController.login);
router.post('/change-password', adminController.changePassword);

export default router;
