const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

const validateInvoice = async (req, res) => {
  const { id: invoiceId } = req.params;

  if (!invoiceId) {
    throw new CustomError.CustomAPIError('Please provide invoice number');
  }

  console.log(invoiceId);

  res
    .status(StatusCodes.OK)
    .json({ result: 'API is working', invoiceNum: invoiceId });
};

module.exports = {
  validateInvoice,
};
