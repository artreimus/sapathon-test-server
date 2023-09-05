import { StatusCodes } from 'http-status-codes';
import CustomError from '../errors/index.js';
import asyncHandler from 'express-async-handler';
import { extractInvoiceData } from '../utils/minee.js';
import InvoiceImage from '../models/InvoiceImage.js';

const updateInvoice = asyncHandler(async (req, res) => {
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

  console.log(extractedData);

  const invoiceImage = await InvoiceImage.findOneAndUpdate(
    { invoiceNum },
    {
      invoiceDate: extractedData.invoiceDate,
      dueDate: extractedData.dueDate,
      supplier: {
        name: extractedData.supplier.name,
        address: extractedData.supplier.address,
      },
      customer: {
        name: extractedData.customer.name,
        address: extractedData.customer.address,
      },
      totalNet: extractedData.totalNet,
      taxRate: extractedData.taxRate,
      totalTax: extractedData.totalTax,
      totalAmount: extractedData.totalAmount,
      locale: {
        currency: extractedData.locale.currency,
        value: extractedData.locale.value,
      },
      lineItems: [...extractedData.lineItems],
    },
    { new: true }
  );

  if (!invoiceImage) {
    throw new CustomError.CustomAPIError('Invoice not found');
  }

  res.status(StatusCodes.OK).json({ invoiceImage });
});

export { updateInvoice };
