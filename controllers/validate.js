import { StatusCodes } from 'http-status-codes';
import CustomError from '../errors/index.js';
import * as dotenv from 'dotenv';
import { extractInvoiceData } from '../utils/minee.js';
import InvoiceImage from '../models/Invoice.js';
import {
  OpenAIValidateInvoice,
  systemContent,
  userContent,
} from '../utils/openai.js';

dotenv.config();

const validateInvoice = async (req, res) => {
  const { id: invoiceNum } = req.params;

  if (!invoiceNum) {
    throw new CustomError.CustomAPIError('Please provide invoice number');
  }

  res.status(StatusCodes.OK).json({ result: 'API is working', invoiceNum });
};

const validateInvoiceWithImage = async (req, res) => {
  const { id: invoiceNum } = req.params;

  if (!invoiceNum) {
    throw new CustomError.CustomAPIError('Please provide invoice number');
  }

  const data = await InvoiceImage.findOne({ invoiceNum });

  if (!data) {
    throw new CustomError.CustomAPIError('Data not found');
  }

  const extractedData = await extractInvoiceData(data.image);

  if (!extractedData) {
    throw new CustomError.CustomAPIError('Failed to extract data');
  }

  // const openAIData = { message: { content: 'Hello World' } };
  const openAIData = await OpenAIValidateInvoice(
    systemContent,
    JSON.stringify(extractedData)
  );

  if (!openAIData) {
    throw new CustomError.CustomAPIError(
      'An error was encountered with OpenAPI'
    );
  }

  res.status(StatusCodes.OK).json({ data, extractedData, openAIData });
};

export { validateInvoice, validateInvoiceWithImage };
