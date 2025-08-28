const productCategory = require("../../models/productCategory.model");
const configSystem = require("../../config/system.js") 
// [GET] /admin/products-category
module.exports.index = async (req, res) => {
     let find = {
          deleted: false
     } 
     const productsCategory = await productCategory.find(find); 
     res.render("admin/pages/productCategory/index",
          {
               pageTitle: "Danh mục sản phẩm", 
               productsCategory: productsCategory,
          }); 
}

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
     let find = {
          deleted: false
     }; 
     const records = await productCategory.find(find);
     res.render("admin/pages/productCategory/create",
          {
               pageTitle: "Thêm danh mục sản phẩm",
               records: records
          }); 
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => { 
     if (req.body.position === '') {
          const countProducts = await productCategory.countDocuments();
          req.body.position = countProducts + 1;
     } else {
          req.body.position = parseInt(req.body.position);
     } 
     const newCategory = new productCategory(req.body);
     await newCategory.save();
     res.redirect(`${configSystem.prefixAdmin}/products-category`);
};