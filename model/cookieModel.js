const mongoose = require("mongoose");

const cookieSchema = new mongoose.Schema({
  
    title: String,
    description: String,
  

},{timestamps:true, strict: false });

const conditionModel = mongoose.model("cookies", cookieSchema);
module.exports = conditionModel;
