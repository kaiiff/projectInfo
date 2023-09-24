const mongoose = require("mongoose");
const { Schema } = mongoose;

const URLSlug = require("mongoose-slug-generator");
mongoose.plugin(URLSlug);

const IndustriesSchema = new Schema(
    {
        name: {
            type: Schema.Types.String,
        },
        slug: {
            type: Schema.Types.String,
            slug: "name",
            lowercase: true
        },
    },
);

const IndustriesModel = mongoose.model("industrie", IndustriesSchema);
module.exports = IndustriesModel;
