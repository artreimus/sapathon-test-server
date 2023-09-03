import { StatusCodes } from 'http-status-codes';
import CustomError from '../errors';
import asyncHandler from 'express-async-handler';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadInvoice = asyncHandler(async (req, res) => {
  const { invoiceNum: public_id, photo } = req.body;

  if (!name || !prompt || !photo) {
    throw new BadRequestError('Please provide all fields');
  }

  const photoUrl = await cloudinary.uploader.upload(photo, {
    timeout: 180000,
    use_filename: false,
    public_id,
    folder: 'sapathon-test',
  });

  if (!photoUrl) {
    throw new CustomError.CustomAPIError(
      'An error was encountered while saving the image'
    );
  }

  res.status(StatusCodes.OK).json({ success: true, data: photoUrl });
});

const getInvoice = asyncHandler(async (req, res) => {
  const { invoiceNum: public_id, photo } = req.body;

  if (!name || !prompt || !photo) {
    throw new BadRequestError('Please provide all fields');
  }

  const photoUrl = await cloudinary.uploader.upload(photo, {
    timeout: 180000,
    use_filename: false,
    public_id,
    folder: 'sapathon-test',
  });

  if (!photoUrl) {
    throw new CustomError.CustomAPIError(
      'An error was encountered while saving the image'
    );
  }

  res.status(StatusCodes.OK).json({ success: true, data: photoUrl });
});

export { uploadInvoice };
