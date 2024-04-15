import { Schema, model } from "mongoose";

const stripeCustomerSchema = new Schema({
  userId: {
    type: String,
  },
  stripeCustomerId: {
    type: String,
  },
});

const stripeCustomerModel =
  model.stripeCstripeCustomerSchemaustomer ||
  model("stripeCustomer", stripeCustomerSchema);

export default stripeCustomerModel;
