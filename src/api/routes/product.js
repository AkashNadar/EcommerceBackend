const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const {auth_token} = require('../middleware/user_auth.js');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "./uploads");
    },
    filename: function (req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter
})

router.post("/",upload.array("ProductImg", 5), productController.createProduct);
router.get("/", auth_token, productController.getAllProduct);

router.get("/:productId", productController.getProduct);

router.patch("/:productId", productController.updateProduct);

router.delete("/:productId", productController.deleteProduct);

module.exports = router;