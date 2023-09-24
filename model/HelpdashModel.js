const mongoose = require("mongoose");
const { Schema } = mongoose;

const HelpDashSchema = new Schema({
    title: { type: Schema.Types.String },
    description: { type: Schema.Types.String },
    image: { type: Schema.Types.String }

});

const HelpDashModel = mongoose.model("help", HelpDashSchema);
module.exports = HelpDashModel;
