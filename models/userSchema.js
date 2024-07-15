const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "pls add the name"]
    },
    email: {
        type: String,
        required: [true, "pls add the name"],
        unique: [true, "email already exsits"]
    },
    password: {
        type: String,
        required: [true, "pls add the password"]
    },
    
},
{
timestamps: true
}
)
module.exports = mongoose.model("userSchema",schema)