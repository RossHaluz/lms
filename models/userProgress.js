import { Schema, model, models } from "mongoose";

const userProgressSchema = new Schema({
  userId: {
    type: String,
  },
  chapterId: {
    type: Schema.Types.ObjectId,
    ref: "chapter",
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const UserProgressModel =
  models.userProgress || model("userProgress", userProgressSchema);

export default UserProgressModel;
