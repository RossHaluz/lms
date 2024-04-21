import { Schema, model, models } from "mongoose";

const purchasesSchema = new Schema({
  userId: {
    type: String,
    unique: false,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "course",
  },
});

const PurchasesModel = models.purchase || model("purchase", purchasesSchema);

export default PurchasesModel;
