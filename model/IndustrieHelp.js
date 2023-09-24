const mongoose = require("mongoose");
const { Schema } = mongoose;

const IndustrieHelpSchema = new Schema({
    industrieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "industrie",
    },
    title: {
        type: Schema.Types.String,
    },
    paragraph: {
        type: Schema.Types.String,
    },
    image: {
        type: Schema.Types.String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const IndustrieHelpModel = mongoose.model("industrie-help", IndustrieHelpSchema);
module.exports = IndustrieHelpModel;
