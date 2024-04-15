import { Schema, model } from "mongoose";

const purchasesSchema = new Schema({
  userId: {
    type: String,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "course",
  },
});

const PurchasesModel = model.purchase || model("purchase", purchasesSchema);

export default PurchasesModel;
