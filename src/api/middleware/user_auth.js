const jwt = require("jsonwebtoken");

exports.auth_token = (req, res, next) => {
    console.log("here");
    const header = req.headers['authorization'];
    const token = header.split(" ")[1];
    if(token == null){
        return res.status(401).json({
            message: "token not found"
        })
    }
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err){
            return res.status(401).json({
                message: "token does not match",
            })
        }
        
        // req.user = user;
        next();
    })
};