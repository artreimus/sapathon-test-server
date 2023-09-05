import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

// const configuration = new Configuration({
//   organization: process.env.OPENAI_ORG,
//   apiKey: process.env.OPENAI_API_KEY,
// });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemContent = `
Your role is that of an expert invoice validator. You will receive two input invoices in JSON format, an expected invoice and an estimated invoice. Your task is to determine the validity of the estimated invoice, providing a clear explanation for each field's validation. The validity can only either be VALID or INVALID.

A valid invoice must include the following mandatory fields, formatted correctly:

Invoice Number
Invoice Date
Due Date
Seller's Information (Name, Address including location and zip code)
Customer's Information (Name, Address including location and zip code)
Line Items (containing service or product details). Each line item should include a description, quantity, unit price, and total amount. Optionally, it could also include a VAT rate.
Total Net Amount (excluding VAT)
Total Tax 
Total Amount (including VAT)

For each field in the invoice, output the field's value and provide a concise explanation of your findings, explaining why it meets or fails the validation criteria.

Additionally, ensure that the calculated total amounts (with and without VAT) in the invoice match the values provided, allowing for a 0% margin of error. Use the following formulas to calculate these totals:

Total Amount Without VAT = Total Net Amount
Total Amount With VAT = Total Net Amount + Total Tax 

Display your step-by-step calculations for both the total amount without VAT and with VAT, and compare the results to the values in the input invoice.
 
Lastly, I want you to Meticulously compare the details of the expected invoice with those of the estimated invoice in JSON format. Pay close attention to the following aspects to ensure data similarity and accuracy.

For each field comparison of the invoices, output a concise explanation of your findings, explaining why it meets or fails the validation criteria.

Your response should be accurate, comprehensive, and logically organized to explain the validation process and any discrepancies found.
`;

const userContent = JSON.stringify({
  invoiceNumber: 123,
  invoiceDate: '09/01/2023',
  seller: {
    name: 'IBM',
    address: {
      location: 'New Orchard Road, Armonk, NY',
      zip: 10504,
    },
  },
  customer: {
    name: 'SAP',
    address: {
      location: 'Walldorf, Baden-Württemberg, Germany',
      zip: 69190,
    },
  },
  lineItems: [
    {
      description: 'Phone',
      quantity: 3,
      amount: 800.12,
      vatRate: 0.08,
    },
    {
      description: 'Laptop',
      quantity: 3,
      amount: 1000.51,
      vatRate: 0.1,
    },
    {
      description: 'Computer',
      quantity: 1,
      amount: 1200.58,
      vatRate: 0.1,
    },
  ],
  totalAmountWithoutVAT: 6620.47,
  totalAmountWithVAT: 7214.627,
});

async function OpenAIValidateInvoice(systemContent, userContent) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemContent },
      { role: 'user', content: userContent },
    ],
    temperature: 0.2,
  });

  return response.choices[0];
}

export { OpenAIValidateInvoice, systemContent, userContent };
