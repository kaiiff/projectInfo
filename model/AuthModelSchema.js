const mongoose = require("mongoose");

const AuthModelSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true   
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    confirmPassword: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
})
const AuthModel = mongoose.model("Auth", AuthModelSchema);
module.exports = AuthModel;