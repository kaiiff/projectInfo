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
        imageType: {
            type: Schema.Types.String,
            status: ["main", "additional"],
            default: "addtional",
            required: true,
        },
        paragraph: {
            type: Schema.Types.String,
        },
    },
    { timestamps: true, strict: false }
);

const contentModel = mongoose.model("content-dashboard", headerSchema);
module.exports = contentModel;
