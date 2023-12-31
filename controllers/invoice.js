import { StatusCodes } from 'http-status-codes';
import CustomError from '../errors/index.js';
import * as dotenv from 'dotenv';
import { extractInvoiceData } from '../utils/minee.js';

dotenv.config();

const validateInvoice = async (req, res) => {
  const { id: invoiceId } = req.params;

  if (!invoiceId) {
    throw new CustomError.CustomAPIError('Please provide invoice number');
  }

  res
    .status(StatusCodes.OK)
    .json({ result: 'API is working', invoiceNum: invoiceId });
};

export { validateInvoice };
