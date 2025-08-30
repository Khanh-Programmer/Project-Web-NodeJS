// [GET] /admin/products:

const product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchProductHelper = require("../../helpers/searchProduct");
const paginationHelper = require("../../helpers/pageSplit");
const configSystem = require("../../config/system.js") 

module.exports.index = async (req, res) => {  

     // Bộ lọc sản phẩm : 
     const filterStatus = filterStatusHelper(req.query);

     // Lọc sản phẩm theo deleted : 
     let find = {
          deleted: false
     }  

     // Theo trạng thái hoạt động của sản phẩm:
     if(req.query.status) {
          find.status = req.query.status; 
     }

     // Product search function : 
     const objectSearch = searchProductHelper(req.query);

     // console.log(objectSearch.regex); // Check xem có lấy được keyword hay không ???
     if(objectSearch.regex) {
          find.title = objectSearch.regex;
     }

     // Pagination  
     const countProducts = await product.countDocuments(find);
     let objectPagination = paginationHelper(
          {
          currentPage: 1,
          limitItem: 4
          },
          req.query,
          countProducts
     );
     // End-Pagination
     
     // sort 
     let sort = {}; 
     if (req.query.sortKey && req.query.sortValue) {
          sort[req.query.sortKey] = req.query.sortValue
     }
     
     // end-sort 
     // Lấy data :
     const products = await product.find(find)
          .limit(objectPagination.limitItem)
          .skip(objectPagination.skipItem) 
          .sort(sort);
     // console.log(products); Check xem lấy được data từ database ra hay chưa ???
     
     const deletedProducts = await product.find({ deleted: true });

     // Vẽ ra giao diện : 
     res.render("admin/pages/products/index.pug", {
          pageTitle:"Trang quản trị",
          products: products,
          filterStatus: filterStatus,
          keyword: objectSearch.keyword,
          pagination: objectPagination,
          deletedProducts
     });
};

// [GET] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => { 
     const status = req.params.status;
     const id = req.params.id;  
     
     // Update status product : 
     await product.updateOne(
          { _id: id },
          { status: status }
     );   

     req.flash('success', 'Cập nhật trạng thái sản phẩm thành công!'); // Thông báo thành công
     res.redirect(req.get('referer')); 
}; 

// [PATCH] /admin/products/change-multi
module.exports.changeStatusMulti = async (req, res) => { 
     const type = req.body.type; // Lấy kiểu thay đổi trạng thái  
     const ids = req.body.ids.split(", "); // Lấy danh sách ID sản phẩm

     switch (type) {
          case "active":
               await product.updateMany(
                    { _id: { $in: ids } },
                    { status: "active" }
               ); 
               req.flash('success', `Cập nhật trạng thái ${ids.length} sản phẩm thành công!`); // Thông báo thành công
               break;
          case "inactive":
               await product.updateMany(
                    { _id: { $in: ids } },
                    { status: "inactive" }
               );
               req.flash('success', `Cập nhật trạng thái ${ids.length} sản phẩm thành công!`); // Thông báo thành công
               break;
          case "delete-all":
               await product.updateMany(
                    { _id: { $in: ids } },
                    {
                         deleted: true,
                         deleteAt: new Date()
                    }
               );
               req.flash('success', `Xóa ${ids.length} sản phẩm thành công!`); // Thông báo thành công
               break;
          case "change-position": 
               for (const item of ids) {
                    const [productId, position] = item.split("-");
                    await product.updateOne(
                         { _id: productId },
                         { position: parseInt(position) }
                    );
               } 
               req.flash('success', `Cập nhật vị trí ${ids.length} sản phẩm thành công!`); // Thông báo thành công
               break;
          default:
               break;
     } 
     res.redirect(req.get('referer')); 
};

// [DELETE] /admin/products/delete:id/
module.exports.deleteItem = async (req, res) => { 
     const id = req.params.id; 
     // xóa vĩnh viễn :
     // await product.deleteOne({ _id: id });
     
     // xóa mềm : 
     await product.updateOne({ _id: id }, {
          deleted: true,
          deleteAt: new Date()
     });
     req.flash('success', 'Xóa sản phẩm thành công!'); // Thông báo thành công
     res.redirect(req.get('referer'));
};  

// [GET] /admin/products/trash
module.exports.trash = async (req, res) => {
    const deletedProducts = await product.find({ deleted: true });
    res.render("admin/pages/products/trash.pug", {
        pageTitle: "Sản phẩm đã xóa",
        deletedProducts
    });
};

// [Restore] /admin/products/trash/restore:id/
module.exports.restoreItem = async (req, res) => {
     const id = req.params.id;
     await product.updateOne({ _id: id }, {
          deleted: false,
          deleteAt: new Date() // Reset deleteAt to a default value
     });
     req.flash('success', 'Khôi phục sản phẩm thành công!'); // Thông báo thành công
     res.redirect(req.get('referer'));
} 

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
     res.render("admin/pages/products/create.pug", {
          pageTitle: "Thêm sản phẩm"
     });
};

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => { 
     // console.log(req.file); 
     // console.log(req.body); 
     // res.send("Create product functionality is not implemented yet.");  
     req.body.price = parseFloat(req.body.price);
     req.body.stock = parseInt(req.body.stock);
     req.body.discountPercentage = parseFloat(req.body.discountPercentage);
     
     if (req.body.position === '') {
          const countProducts = await product.countDocuments();
          req.body.position = countProducts + 1;
     } else {
          req.body.position = parseInt(req.body.position);
     } 
     // req.body.thumbnail = `/uploads/${req.file.filename}`; // local 

     // Save product to database
     const newProduct = new product(req.body);
     await newProduct.save();
     req.flash('success', 'Thêm sản phẩm thành công!'); // Thông báo thành công
     res.redirect(`${configSystem.prefixAdmin}/products`);
};

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
     try {
          const find = {
               deleted: false,
               _id: req.params.id
          } 
          const productEdit = await product.findOne(find);
          res.render("admin/pages/products/edit.pug", {
          pageTitle: "Chỉnh sửa sản phẩm", 
          product: productEdit
     });
     } catch (error) {
          return res.redirect(`${configSystem.prefixAdmin}/products`);
     }
};

// [PATCH] /admin/products/edit/:id 
module.exports.editPatch = async (req, res) => {
     try {
          const id = req.params.id;
          req.body.price = parseFloat(req.body.price);
          req.body.stock = parseInt(req.body.stock);
          req.body.discountPercentage = parseFloat(req.body.discountPercentage);
          req.body.position = parseInt(req.body.position);

          if (req.body.position === '') {
               const countProducts = await product.countDocuments();
               req.body.position = countProducts + 1;
          } else {
               req.body.position = parseInt(req.body.position);
          }

          if (req.file) {
               req.body.thumbnail = `/uploads/${req.file.filename}`;
          }

          // Update product to database
          await product.updateOne({ _id: id }, req.body);
          req.flash('success', 'Cập nhật sản phẩm thành công!'); // Thông báo thành công
          res.redirect(`${configSystem.prefixAdmin}/products`);
     } catch (error) {
          return res.redirect(`${configSystem.prefixAdmin}/products`);
     }
}; 

// [DETAIL] admin/products/detail/:id
module.exports.detail = async (req, res) => {
     try {
          const find = {
               deleted: false,
               _id: req.params.id
          }
          const productDetail = await product.findOne(find);
          res.render("admin/pages/products/detail.pug", {
               pageTitle: "Chi tiết sản phẩm",
               product: productDetail
          });
     } catch (error) {
          return res.redirect(`${configSystem.prefixAdmin}/products`);
     }
};
