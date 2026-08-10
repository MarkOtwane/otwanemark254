import { Router } from 'express';
import * as skillController from '../controllers/skillController.js';

const router = Router();

router.get('/', skillController.getSkills);
router.post('/', skillController.createSkill);
router.put('/:id', skillController.updateSkill);
router.delete('/:id', skillController.deleteSkill);

export default router;
