const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectionSchema = new Schema({

    section: [{
        title: { type: Schema.Types.String },
        content: { type: Schema.Types.String },
    }],

})

const sectionModel =  mongoose.model("section-dashboard",sectionSchema)
module.exports = sectionModel



