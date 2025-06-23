const mongo = require("mongoose");

const userSchema = mongo.Schema({
    username: {
        type:String,
        required: true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    createdAt :{
        type: Date,
        default: Date.now
    }
});

module.exports = mongo.model("User", userSchema);