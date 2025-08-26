module.exports.createPost = async (req, res, next) => {
     // console.log(req.file); 
     // console.log(req.body); 
     // res.send("Create product functionality is not implemented yet.");  
     if (!req.body.title) {
          req.flash('error', 'Vui lòng nhập tiêu đề sản phẩm.');
          res.redirect(req.get('referer'));
          return;
     }
     next();
}