// [GET] /products

const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {
        const products = await Product.find({}).sort({ position: "desc" });
        // console.log(products); 
        const newProducts = products.map(product => {
                product.priceNew = (product.price*(100-product.discountPercentage)/100).toFixed(3);
                return product;
        });
        // console.log(newProducts);
        res.render("clients/pages/products/index.pug", {
                pageTitle:"Danh sách sản phẩm",
                products: newProducts
        });
};


// [GET] /products/:slug

module.exports.show = async (req, res) => {
        try {
                const find = {
                        deleted: false,
                        slug: req.params.slug, 
                        status: "active"
                };
                const productDetail = await Product.findOne(find);
                res.render("clients/pages/products/detail.pug", {
                        pageTitle: "Chi tiết sản phẩm",
                        product: productDetail
                });
        } catch (error) {
        return res.redirect(`/products`);
        }
};