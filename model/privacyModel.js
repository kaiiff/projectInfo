const mongoose = require("mongoose");

const conditionSchema = new mongoose.Schema({
  
    title: String,
    description: String,
  

},{timestamps:true, strict: false });

const conditionModel = mongoose.model("privacy-policy", conditionSchema);
module.exports = conditionModel;
