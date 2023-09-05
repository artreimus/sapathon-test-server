import express from 'express';
import { validateInvoiceWithImage } from '../controllers/validate.js';

const router = express.Router();
router.route('/invoice-image/:id').get(validateInvoiceWithImage);

export default router;
