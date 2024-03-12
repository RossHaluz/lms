import { Schema, model, models } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  courses: {
      type: [Schema.Types.ObjectId],
      ref: 'course'
  },
});

const CategoryModel = models?.category || model("category", categorySchema);

export default CategoryModel;
