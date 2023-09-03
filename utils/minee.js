import * as mindee from 'mindee';

const cleanPrediction = (prediction) => {
  const {
    lineItems,
    locale,
    totalAmount,
    totalTax,
    totalNet,
    date: invoiceDate,
    dueDate,
    invoiceNumber,
    supplierName,
    supplierAddress,
    customerName,
    customerAddress,
    taxes,
  } = prediction;

  const cleaned = {
    lineItems: lineItems.map((lineItem) => ({
      description: lineItem.description,
      quantity: lineItem.quantity,
      unitPrice: lineItem.unitPrice,
      totalAmount: lineItem.totalAmount,
    })),
    locale: { currency: locale.currency, value: locale.value },
    totalAmount: totalAmount.value,
    totalTax: totalTax.value,
    taxRate: taxes[0].rate,
    totalNet: totalNet.value,
    invoiceDate: invoiceDate.value,
    dueDate: dueDate.value,
    invoiceNumber: invoiceNumber.value,
    supplier: {
      name: supplierName.value,
      address: supplierAddress.value,
    },
    customer: {
      name: customerName.value,
      address: customerAddress.value,
    },
  };

  return cleaned;
};

const extractInvoiceData = async (path) => {
  // Init a new client
  const mindeeClient = new mindee.Client({
    apiKey: process.env.MINDEE_SECRET_KEY,
  });
  // Load a file from disk
  const inputSource = mindeeClient.docFromUrl(path);
  // Parse it
  const apiResponse = await mindeeClient.parse(
    mindee.product.InvoiceV4,
    inputSource
  );
  let result = apiResponse.document;

  return cleanPrediction(result.inference.prediction);
  // return result.inference.prediction;
};

export { extractInvoiceData };
