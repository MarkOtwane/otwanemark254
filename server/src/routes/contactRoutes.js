import { Router } from 'express';
import * as contactController from '../controllers/contactController.js';

const router = Router();

router.get('/', contactController.getContact);
router.post('/', contactController.updateContact);

export default router;
