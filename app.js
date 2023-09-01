require('dotenv').config();

const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

const validateInvoiceRouter = require('./routes/invoice');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use('/api/v1/validate-invoice', validateInvoiceRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware); // error handler must always be last

const start = () => {
  try {
    app.listen(port, console.log(`Listening on Port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
