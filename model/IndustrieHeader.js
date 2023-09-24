const mongoose = require("mongoose");
const { Schema } = mongoose;

const IndustriesHeaderSchema = new Schema(
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
        decription: {
            type: Schema.Types.String,

        },
    },
    { timestamps: true, strict: false }
);

const IndustriesheaderModel = mongoose.model("Industrie-header", IndustriesHeaderSchema);
module.exports = IndustriesheaderModel;
