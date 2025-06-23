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
        expires : 300
    }
});

const OtpModel = mongo.model("Otp", OtpSchema);
module.exports = { OtpModel };