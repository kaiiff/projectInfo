const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EcommerceModelSchema = new Schema({

    title: {
        type: Schema.Types.String,
    },
    image: {
        type: Schema.Types.String,
    },
    content: {
        type: Schema.Types.String,
    },
    paragraph: {
        type: Schema.Types.String,
    },
    cards: [{
        title: { type: Schema.Types.String },
        content: { type: Schema.Types.String }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
})
const EcommerceModel = mongoose.model("e-commerce", EcommerceModelSchema);
module.exports = EcommerceModel;