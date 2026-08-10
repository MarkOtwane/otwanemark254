import { Router } from 'express';
import * as heroController from '../controllers/heroController.js';

const router = Router();

router.get('/', heroController.getHero);
router.post('/', heroController.updateHero);
router.delete('/', heroController.deleteHero);

export default router;
