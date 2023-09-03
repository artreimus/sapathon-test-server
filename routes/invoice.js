import express from 'express';
import { validateInvoice, validateInvoiceTwo } from '../controllers/invoice.js';

const router = express.Router();
router.route('/:id').get(validateInvoice);
router.route('/v2/:id').get(validateInvoiceTwo);

export default router;
