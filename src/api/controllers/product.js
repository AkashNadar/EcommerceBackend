const Product = require('./../models/productModel');

const URL = "http://localhost:4500/products";

exports.createProduct = (req, res, next) => {
    console.log("here");

    console.log(req.body);
    return res.status(200).json({
        message: req.body,
    })
    const product = new Product({   
        ProductName: req.body.ProductName,
        ProductCategory: req.body.ProductCategory,
        ProductPrice: req.body.ProductPrice,
        ProductImage: req.files,
    });
    console.log(JSON.stringify(product.ProductName));
    product.save()
    .then((createdProduct) => {
        res.status(201).json({
            message: "Product created successfully",
            createdProduct: {
                ProductName: createdProduct.ProductName,
                ProductCategory: createdProduct.ProductCategory,
                ProductImg: createdProduct.files,
                request: {
                    type: "GET",
                    url: `${URL}/${createdProduct._id}`
                }
            }

        });
    })
    .catch((error) => {
        res.status(400).json({
            message: "Product not created",
            error: error.message
        })
    });
};

exports.getAllProduct = (req, res, next) => {
    Product.find({})
    .then((products) => {

        const response = {
            conunt: products.length,
            products: products.map(product => {
                return {
                    ProductName: product.ProductName,
                    ProductCategory: product.ProductCategory,
                    request: {
                        type: "GET",
                        URL: `${URL}/${product._id}`
                    } 
                }
            })
        }
        res.status(200).json({
            length: products.length,
            products: response
        })
    })
    .catch((err) => {
        console.log("here");
        res.status(400).json({
            message: err.message
        })
    })
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;

    Product.find({_id:productId})
    .exec()
    .then((product) => {
        return res.status(200).json({
            message: "Product found",
            product
        });
    })
    .catch((error) => {
        res.status(400).json({
            message: "Product not found",
            error: error.message
        })
    })
};

exports.updateProduct = (req, res, next) => {
    const id = req.params.productId;
    const updateFields = {};    
    // obj to array conversion 
    const body = Object.entries(req.body);
    for(const key of body){
        updateFields[key[0]] = key[1];
    }

    Product.update(
        {_id: id},
        {$set: updateFields}
    )
    .exec()
    .then((result) => {
        res.status(200).json({
            message: "Product updated successfully"
        })
    })
    .catch((err) => {
        res.status(400).json({
            message: "Product not updated",
            error: err.message
        })
    })
};

exports.deleteProduct = (req, res, next) => {
    const id = req.params.productId;

    Product.findById(id)
    .then((pro) => {
        pro.remove()
        .then((result) => {
            res.status(200).json({
                message: "Product is been deleted successfully"
            })
        })
    })
    .catch((err) => {
        res.status(400).json({
            message: "Product not deleted",
            error: err.message
        })
    })
};
