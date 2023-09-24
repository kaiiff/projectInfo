const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UseCaseModelSchema = new Schema({

    title: {
        type: Schema.Types.String
    },
    image: {
        type: Schema.Types.String
    },
    paragraph: {
        type: Schema.Types.String
    },
    imageIconName: [{
        type: Schema.Types.String
    }],
    services: [{
        title: { type: Schema.Types.String },
        message: { type: Schema.Types.String }
    }],
    content: [{
        title: { type: Schema.Types.String },
        message: { type: Schema.Types.String }
    }],
    createdAt: {
        type: Schema.Types.Date,
        default: Date.now
    },
    updatedAt: {
        type: Schema.Types.Date,
        default: Date.now
    },
})
const UseCaseModel = mongoose.model("Use-case", UseCaseModelSchema);
module.exports = UseCaseModel; 