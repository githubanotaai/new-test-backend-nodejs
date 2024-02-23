import mongoose, {Document, Schema} from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  category: Schema.Types.ObjectId;
  ownerId: string;
}

const productSchema = new Schema<IProduct>({
  title: String,
  description: String,
  price: Number,
  category: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
  ownerId: String,
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
