import { Schema, model, models } from "mongoose";

const categorySchema = new Schema({
    title: {
        type: String,
        require: true
    }
})

const CategoryModel = models?.category || model('category', categorySchema);

export default CategoryModel