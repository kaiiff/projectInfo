const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IndustrieSectionSchema = new Schema(
    {
        industrieId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "industrie",
        },
        title: {
            type: Schema.Types.String,
        },
        image: {
            type: Schema.Types.String,
        },
        content: {
            type: Schema.Types.String,

        },
    },
    { timestamps: true, strict: false }
);
const IndustrieSectionModel = mongoose.model("industrie-section", IndustrieSectionSchema)
module.exports = IndustrieSectionModel