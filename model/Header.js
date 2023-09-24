const mongoose = require("mongoose");
const { Schema } = mongoose;

const headerSchema = new Schema(
    {
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

const headerModel = mongoose.model("header", headerSchema);
module.exports = headerModel;
