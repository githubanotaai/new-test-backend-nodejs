import mongoose, {Document, Schema} from "mongoose";

export interface ICategory extends Document {
  title: string;
  description: string;
  ownerId: string;
}

const categorySchema = new Schema<ICategory>({
  title: String,
  description: String,
  ownerId: String,
});

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
