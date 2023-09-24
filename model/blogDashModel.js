const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "blog",
    
      },

}, { timestamps: true, strict: false })

const blogDashModel = mongoose.model("blog-dash",blogSchema)
module.exports=blogDashModel;