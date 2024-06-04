import mongoose, { model } from "mongoose";

const dataSchema = new mongoose.Schema({
  product_id: {
    title: String,
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  sold: {
    type: Boolean,
  },
  monthSold: {
    type: String,
  },
  dateOfSale: {
    type: String,
    required: true
  },
}, { timestamps: true });

export const Data = model('Data', dataSchema);
