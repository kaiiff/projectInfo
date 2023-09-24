
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const demoSchema = new Schema({

    demo: [{
        heading: { type: Schema.Types.String },
        contents: { type: Schema.Types.String },
        enum: ["Latest", "Mobile", "Saas",],
    }],
})

const demoModel = mongoose.model("demo-dashboard", demoSchema)
module.exports = demoModel



