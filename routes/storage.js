import express from 'express';
import { updateInvoice } from '../controllers/storage.js';

const router = express.Router();

router.route('/update-invoice/:id').get(updateInvoice);

export default router;
