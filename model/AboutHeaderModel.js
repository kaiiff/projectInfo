const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const aboutHeader = new Schema({
  
    title:{
        type:Schema.Types.String
    },

    content:{
        type:Schema.Types.String
    },
    image:{
        type:Schema.Types.String
    }

}, { timestamps: true, strict: false })

const aboutHeaderModel = mongoose.model("about-header",aboutHeader)
module.exports=aboutHeaderModel