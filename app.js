import express from 'express';
import * as dotenv from 'dotenv';
import validateInvoiceRouterV1 from './routes/invoice.js';
import storageRouter from './routes/storage.js';
import validateInvoiceRouterV2 from './routes/validate.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import corsOptions from './config/corsOption.js';
import cors from 'cors';
import connectDB from './db/connect.js';

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.set('trust proxy', 1);

app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

app.use('/api/v1/validate-invoice', validateInvoiceRouterV1);
app.use('/api/v1/storage', storageRouter);
app.use('/api/v2/validate-invoice', validateInvoiceRouterV2);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware); // error handler must always be last

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, console.log(`Listening on Port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
