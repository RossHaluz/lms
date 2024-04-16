import { Schema, model, models } from "mongoose";

const purchasesSchema = new Schema({
  userId: {
    type: String,
    unique: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "course",
    unique: true,
  },
});

const PurchasesModel = models.purchase || model("purchase", purchasesSchema);

export default PurchasesModel;
