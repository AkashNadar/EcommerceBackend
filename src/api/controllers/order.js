const Order = require('./../models/orderModel');

exports.createOrder = (req, res, next) => {
    const product = req.body.products;
    console.log(product);
    const order = new Order({
        products: product
    })
    order.save()
    .then((result) => {
        res.status(201).json({
            result,
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err.message
        })
    });
};

exports.getAllOrder = (req, res, next) => {
    Order.find()
    .populate("products")
    .exec()
    .then(result => {
        res.status(200).json({
            length: result.length,
            products: result
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err.message
        });
    })
};

exports.getOrder = (req, res, next) => {
    const id = req.params.orderId;

    Order.findById(id)
    .populate("products")
    .exec()
    .then(result => {
        res.status(200).json({
            product: result
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err.message
        });
    })

};

exports.updateOrder = (req, res, next) => {
    const id = req.params.orderId;
    const updateFields = {};    
    // obj to array conversion 
    const body = Object.entries(req.body);
    for(const key of body){
        updateFields[key[0]] = key[1];
    }

    Order.update(
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

exports.deleteOrder = (req, res, next) => {
    const id = req.params.orderId;

    Order.findById(id)
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