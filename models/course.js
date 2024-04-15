import { Schema, model, models } from "mongoose";

const courseSchema = new Schema({
  userId: {
    type: String,
    require: true,
    default: "",
  },
  title: {
    type: String,
    require: true,
    default: "",
  },
  description: {
    type: String,
    require: true,
    default: "",
  },
  imageUrl: {
    type: String,
    require: true,
    default: "",
  },
  price: {
    type: Number,
    require: true,
    default: 0,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
  purchases: {
    type: [Schema.Types.ObjectId],
    ref: "purchases",
  },
  progress: {
    type: String,
  },
  attachments: {
    type: [Schema.Types.ObjectId],
    ref: "attachment",
    default: [],
  },
  chapters: {
    type: [Schema.Types.ObjectId],
    ref: "chapter",
    default: [],
  },
  progress: {
    type: Number,
  },
});

const CourseModel = models?.course || model("course", courseSchema);

export default CourseModel;
