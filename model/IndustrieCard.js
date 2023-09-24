const mongoose = require("mongoose");
const { Schema } = mongoose;

const IndustrieCardSchema = new Schema(
    {
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
        cards: [{
            title: {
                type: Schema.Types.String,
            },
            content: {
                type: Schema.Types.String,
            },
        }],
    },
    { timestamps: true, strict: false }
);

const IndustrieCardModel = mongoose.model("industrie-card", IndustrieCardSchema);
module.exports = IndustrieCardModel;
