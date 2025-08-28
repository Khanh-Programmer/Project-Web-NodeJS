const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater"); 
mongoose.plugin(slug);

const productCategorySchema = new mongoose.Schema({
     title: { type: String, required: true }, 
     parent_id: {
          type: String, 
          default:""
     },
     description: String,
     thumbnail: String,
     status: String,
     position: Number, 
     deleted: {
          type: Boolean,
          default: false
     },
     slug: {
          type: String,
          slug: "title", 
          unique: true
     },
     deleteAt: Date,
     }, {
          timestamps: true
     });

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema, 'products-category');
module.exports = ProductCategory;