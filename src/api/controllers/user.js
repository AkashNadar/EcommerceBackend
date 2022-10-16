require('dotenv').config();
const User = require('../models/userModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// exports.get_all_users = (req, res) => {
//     res.json({
//         length: studArr.length,
//         studArr
//     })
// }
exports.getAllUsers = (req, res, next) => {
    User.find({})
    .then((users) => {
        res.status(200).json({
            length: users.length,
            users
        })
    })
    .catch((err) => {
        res.status(400).json({
            message: err.message
        })
    })
};


// exports.create_a_user = (req, res) => {
//     let studentName = req.body.studentName;
//     studArr.push(studentName);
//     res.status(201).json({
//         message: "Sucessfully added studentName",
//         user: studentName
//     })
// }

exports.signUp = (req, res, next) => {

    User.find({email: req.body.email})
    .exec()
    .then((result) => {
        console.log("The email existes or not ");
        console.log(result);

        if(result.length >= 1 ){
            console.log("Email Exists!!");
            return res.status(409).json({
                message: "Already email exists"
            })

        }else{

            bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
                if(err){
                    res.status(500).json({
                        error: err.message
                    })
                }else{
                    const user = new User({
                        email: req.body.email,
                        password: hashedPass
                    })

                    user.save()
                    .then((createdUser) => {
                        res.status(201).json({
                            status: "user Created",
                            createdUser
                        })
                    })
                    .catch((err) => {
                        res.status(500).json({
                            error: err.message,
                        });
                    });
                    
                }
            })
        }
    })
    .catch((err) => {
        res.status(500).json({
            error: err.message,
        });
    });

    // const user = new User({
    //     email: req.body.email,
        
    // });
    // user.save()
    // .then((createdUser) => {
    //     res.status(201).json({
    //         status: "user Created",
    //         createdUser
    //     })
    // })
    // .catch((err) => {
    //     res.status(500).json({
    //         error: err.message,
    //     });
    // });
};


exports.login = (req, res, next) => {

    // check if user 
    User.find({email: req.body.email.toLowerCase()})
    .exec()
    .then((user) => {
        // check if user does NOT exist
        
        if(user.length < 1){
            return res.status(404).json({
                message: "Auth failed",
            });
        }
        console.log(user);
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {

            if(err){
                return res.status(401).json({
                    message: "Auth failed",
                });
            }

            if(result){
                const userEmail = {
                    email: req.body.email,
                }
                 
                const accessToken = jwt.sign(userEmail,
                    process.env.SECRET);

                return res.status(200).json({
                
                    message: "Auth successful",
                    accessLevel: user[0].accessLevel,
                    accessToken,
                });
            }
            
        });

    })
    .catch((err) => {
        return res.status(500).json({
            err: err.message
        });
    });
};


// exports.get_a_user = (req, res) => {
//     let userId = req.params.userId;
//     // console.log(user);
//     res.status(200).json({
//         user: studArr[userId]
//     });

// }

exports.getUser = (req, res) => {
    let userId = req.params.userId;

    User.find({_id:userId})
    .exec()
    .then((user) => {
        if(user.length < 1){
            return res.status(404).json({
                message: "Account does not exist",
            });
        }else{
            return res.status(200).json({
                user: user[0]
            });
        }
    })
    .catch((err) => {
        res.status(500).json({
            error: err.message
        });
    });
};

exports.updateUser = (req, res, next) => {
    const id = req.params.userId;
    const updateFields = {};    
    // obj to array conversion 
    const body = Object.entries(req.body);
    for(const key of body){
        updateFields[key[0]] = key[1];
    }

    User.update(
        {_id: id},
        {$set: updateFields}
    )
    .exec()
    .then((result) => {
        res.status(200).json({
            message: "User updated successfully"
        })
    })
    .catch((err) => {
        res.status(400).json({
            message: "User not updated",
        
        })
    })
};

// exports.update_a_user = (req, res) => {
//     let student = req.body.studentName
//     let studentId = req.params.userId
//     let user = user.filter(userName => user_id === studentId)
// }


// exports.delete_a_user = (req, res) => {
    
// }

exports.deleteUser = (req, res, next) => {
    const id = req.params.userId;

    User.findById(id)
    .then((doc) => {
        doc.remove()
        .then((result) => {
            res.status(200).json({
                message: "User is been deleted successfully"
            })
        })
    })
    .catch((err) => {
        res.status(400).json({
            message: err.message
        })
    })
    
};