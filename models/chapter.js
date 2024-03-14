import { Schema, model, models } from "mongoose";

const chapterSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    default: "",
  },
  videoUrl: {
    type: String,
  },
  muxData: { type: Schema.Types.ObjectId, ref: "muxdata" },
  position: {
    type: Number,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  isFree: {
    type: Boolean,
    default: false,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "course",
  },
});

const ChapterModel = models?.chapter || model("chapter", chapterSchema);

export default ChapterModel;
