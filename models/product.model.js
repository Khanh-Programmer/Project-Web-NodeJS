const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater"); 
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  tags: [String],
  brand: String,
  sku: String,
  weight: Number,
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  warrantyInformation: String,
  shippingInformation: String,
  availabilityStatus: String,
  reviews: [
    {
      user: String,
      comment: String,
      rating: Number,
      date: Date
    }
  ],
  returnPolicy: String,
  minimumOrderQuantity: Number,
  meta: mongoose.Schema.Types.Mixed,
  images: [String],
  thumbnail: String,
  status: String,
  deleted: {
    type: Boolean,
    default: false
  },
  position: Number, 
  slug: {
    type: String,
    slug: "title", 
    unique: true
  },
  deleteAt: Date,
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema, 'products');
module.exports = Product;