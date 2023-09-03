import express from 'express';
import {
  validateInvoice,
  validateInvoiceWithImage,
} from '../controllers/validate.js';

const router = express.Router();
router.route('/:id').get(validateInvoice);
router.route('/invoice-image/:id').get(validateInvoiceWithImage);

export default router;
