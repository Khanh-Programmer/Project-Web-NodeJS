const express = require("express"); 
const router = express.Router();
const controller = require("../../controllers/admin/productCategory.controller");
const multer = require('multer');
const upload = multer(); // Sử dụng multer với bộ nhớ tạm thời (memory storage)
const uploadCloud = require("../../middlewares/admins/uploadCloud.middleware.js"); 
const validate = require("../../validates/admin/productCategory.validate.js");
router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create",
     upload.single('thumbnail'), 
     uploadCloud.upload,
     validate.createPost,
     controller.createPost);

module.exports = router;