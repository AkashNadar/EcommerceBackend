const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        required: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    }, 

    password: {
        type: String,
        required: true,
    
    },

    accessLevel: {
        type: String,
        default: "User"
    }, 

    designation: {
        type: String
    },

    firstName: {
        type: String
    },

    lastName: {
        type: String
    }
})


module.exports = mongoose.model("User", UserSchema);