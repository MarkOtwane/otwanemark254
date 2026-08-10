import { Router } from 'express';
import * as testimonialController from '../controllers/testimonialController.js';

const router = Router();

router.get('/', testimonialController.getTestimonials);
router.post('/', testimonialController.createTestimonial);
router.put('/:id', testimonialController.updateTestimonial);
router.delete('/:id', testimonialController.deleteTestimonial);

export default router;
