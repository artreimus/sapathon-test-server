const normalizeExpectedData = (expectedData) => {
  const cleaned = {
    invoiceNum: expectedData.invoiceNum,
    invoiceDate: expectedData.invoiceDate,
    dueDate: expectedData.dueDate,
    supplier: {
      name: expectedData.supplier.name,
      address: expectedData.supplier.address,
    },
    customer: {
      name: expectedData.customer.name,
      address: expectedData.customer.address,
    },
    totalNet: expectedData.totalNet,
    taxRate: expectedData.taxRate,
    totalTax: expectedData.totalTax,
    totalAmount: expectedData.totalAmount,
    locale: {
      currency: expectedData.locale.currency,
      value: expectedData.locale.value,
    },
    lineItems: [...expectedData.lineItems],
  };

  return cleaned;
};

const normalizePredictedData = (prediction) => {
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

export { normalizePredictedData, normalizeExpectedData };
