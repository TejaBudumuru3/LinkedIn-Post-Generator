const mongo = require("mongoose")

const OtpSchema = mongo.Schema({
    email:{
        type: String,
        required: true
    },
    otp:{
        type: String,
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expire: 300
    }
});

module.exports = mongo.model("Otp", OtpSchema);