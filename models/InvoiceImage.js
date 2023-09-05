import mongoose from 'mongoose';

const InvoiceImageSchema = mongoose.Schema(
  {
    invoiceNum: {
      type: String,
      required: true,
    },
    locale: { type: { currency: { type: String }, value: { type: String } } },
    invoiceDate: {
      type: String,
    },
    lineItems: {
      type: [
        {
          description: { type: String },
          quantity: { type: Number },
          unitPrice: { type: Number },
          totalAmount: { type: Number },
        },
      ],
    },
    dueDate: {
      type: String,
    },
    supplier: {
      type: { name: { type: String }, address: { type: String } },
    },
    customer: {
      type: { name: { type: String }, address: { type: String } },
    },
    totalNet: {
      type: Number,
    },
    taxRate: {
      type: Number,
    },
    totalTax: {
      type: Number,
    },
    totalAmount: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('InvoiceImage', InvoiceImageSchema);
