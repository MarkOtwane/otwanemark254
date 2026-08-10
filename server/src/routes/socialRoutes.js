import { Router } from 'express';
import * as socialController from '../controllers/socialController.js';

const router = Router();

router.get('/', socialController.getSocials);
router.post('/', socialController.createSocial);
router.put('/:id', socialController.updateSocial);
router.delete('/:id', socialController.deleteSocial);

export default router;
