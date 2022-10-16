// modules exported 
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// internal modules
const userRoutes = require('./api/routes/user');
const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/order');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// for parsing multipart/form-data 
app.use(express.static('public'));

// configurations
app.use(morgan("dev"));

// Mongoose Connection
const DB = 'mongodb+srv://UserName:Password@kuchfkdfda.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("your mongoose is connected"))
    .catch(err => console.log(err.message));


// enabling cors (cross origin resource sharing)
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "Origin, X-Requested-With, Accept, Authorization, Content-Type");
    if (req.method === "OPTIONS") {
        req.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE");
        res.status(200).json({})
    }
    next();
})


// Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// 
app.use("/", (req, res, next) => {
    res.send("Welcome!");
})


// Creating error
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

// catch all error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        }
    })
});

module.exports = app;
