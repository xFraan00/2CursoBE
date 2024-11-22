import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productCollection = "Products";

const productSchema = new mongoose.Schema({
    title: {type: String, require: true, max: 15},
    description: {type: String, require: true, max: 50},
    price: {type: Number, require: true},
    code: {type: String, require: true, max: 6, unique: true},
    status: {type: Boolean, default: true},
    stock: {type: Number, require: true},
    category: {type: String, require: true, max: 15},
    thumbnail: {type: String, require: false, default: "Imagen"}
});

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productCollection, productSchema);

export default productModel;