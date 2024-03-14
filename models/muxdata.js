import { models, model, Schema } from "mongoose";

const muxDataSchema = new Schema({
  assetId: { type: String, required: true },
  playbackId: { type: String },
  chapterId: {
    type: Schema.Types.ObjectId,
    ref: "chapter",
    unique: true,
    required: true,
  },
});

const MuxDataModel = models?.muxdata || model("muxdata", muxDataSchema);

export default MuxDataModel;
