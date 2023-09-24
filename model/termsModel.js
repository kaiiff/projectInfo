const mongoose = require("mongoose");

const termSchema = new mongoose.Schema({
  
    title: String,
    description: String,
  

},{timestamps:true, strict: false });

const conditionModel = mongoose.model("termOfUse", termSchema);
module.exports = conditionModel;
