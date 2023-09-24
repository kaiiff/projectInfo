const mongoose = require("mongoose");
const URLSlug = require("mongoose-slug-generator")
mongoose.plugin(URLSlug)

const NewsModelSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "deactive"],
    },
    slug: {
        type: String,
        slug: "title",
        default: " "
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
const NewsModel = mongoose.model("news", NewsModelSchema);
module.exports = NewsModel;