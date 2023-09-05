import * as mindee from 'mindee';
import { normalizePredictedData } from '../utils/normalizeData.js';

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

  return normalizePredictedData(result.inference.prediction);
  // return result.inference.prediction;
};

export { extractInvoiceData };
