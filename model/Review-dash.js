const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
    reviews: [{
        title: { type: Schema.Types.String },
        content: { type: Schema.Types.String }
    }],
},
    { timestamps: true, strict: false }
);

const reviewModel = mongoose.model("review", reviewSchema);
module.exports = reviewModel;
