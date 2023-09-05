import express from 'express';
import { validateInvoice, validateInvoiceTwo } from '../controllers/invoice.js';

const router = express.Router();
router.route('/:id').get(validateInvoice);

export default router;
