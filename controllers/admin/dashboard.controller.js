// [GET] /admin/dashboard

const product = require("../../models/product.model"); 
module.exports.dashboard = async (req, res) => { 
     const products = await product.find();
     res.render("admin/pages/dashboard/index.pug", {
          pageTitle: "Trang quản trị",
          products: products,
     });
};
