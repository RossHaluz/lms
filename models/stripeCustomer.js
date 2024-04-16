import { Schema, model, models } from "mongoose";

const stripeCustomerSchema = new Schema({
  userId: {
    type: String,
  },
  stripeCustomerId: {
    type: String,
  },
});

const stripeCustomerModel =
  models.stripeCstripeCustomerSchemaustomer ||
  model("stripeCustomer", stripeCustomerSchema);

export default stripeCustomerModel;
