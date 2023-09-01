const express = require('express');
const router = express.Router();

const { validateInvoice } = require('../controllers/invoice');

router.route('/:id').get(validateInvoice);

module.exports = router;
