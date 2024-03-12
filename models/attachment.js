import { Schema, model, models } from "mongoose";

const attachmentSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "course",
    require: true,
  },
});

const AttachmentModel =
  models?.attachment || model("attachment", attachmentSchema);

export default AttachmentModel;
