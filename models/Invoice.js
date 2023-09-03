import mongoose from 'mongoose';

const InvoiceImageSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
    invoiceNum: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('InvoiceImage', InvoiceImageSchema);
