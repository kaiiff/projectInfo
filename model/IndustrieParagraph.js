const mongoose = require("mongoose");
const { Schema } = mongoose;

const IndustrieParagraphSchema = new Schema({
    industrieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "industrie",
    },
    title: {
        type: Schema.Types.String,
    },
    content: {
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

const IndustrieParagraphModel = mongoose.model("industrie-paragraph", IndustrieParagraphSchema);
module.exports = IndustrieParagraphModel;
