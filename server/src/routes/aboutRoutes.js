import { Router } from 'express';
import * as aboutController from '../controllers/aboutController.js';

const router = Router();

router.get('/', aboutController.getAbout);
router.post('/', aboutController.updateAbout);
router.get('/quick-facts', aboutController.getQuickFacts);
router.post('/quick-facts', aboutController.upsertQuickFact);
router.delete('/quick-facts/:id', aboutController.deleteQuickFact);

export default router;
