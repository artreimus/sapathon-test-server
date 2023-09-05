import { StatusCodes } from 'http-status-codes';
import CustomError from '../errors/index.js';
import * as dotenv from 'dotenv';
import { extractInvoiceData } from '../utils/minee.js';
import InvoiceImage from '../models/InvoiceImage.js';
import {
  OpenAIValidateInvoice,
  systemContent,
  userContent,
} from '../utils/openai.js';
import asyncHandler from 'express-async-handler';
import { normalizeExpectedData } from '../utils/normalizeData.js';

dotenv.config();

const validateInvoiceWithImage = asyncHandler(async (req, res) => {
  const { id: invoiceNum } = req.params;

  if (!invoiceNum) {
    throw new CustomError.CustomAPIError('Please provide invoice number');
  }

  const expectedData = await InvoiceImage.findOne({ invoiceNum });

  if (!expectedData) {
    throw new CustomError.CustomAPIError('Data not found');
  }

  const extractedData = await extractInvoiceData(expectedData.image);

  if (!extractedData) {
    throw new CustomError.CustomAPIError('Failed to extract data');
  }

  const userContent = `
   ##### 
   Expected Invoice ${JSON.stringify(normalizeExpectedData(expectedData))} 
   ##### 
   Estimated Data ${JSON.stringify(extractedData)}
   `;

  // const openAIData = { message: { content: 'Hello World' } };
  const openAIData = await OpenAIValidateInvoice(systemContent, userContent);

  if (!openAIData) {
    throw new CustomError.CustomAPIError(
      'An error was encountered with OpenAPI'
    );
  }

  res.status(StatusCodes.OK).json({ expectedData, extractedData, openAIData });
});

export { validateInvoice, validateInvoiceWithImage };
