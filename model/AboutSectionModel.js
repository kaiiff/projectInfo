const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const aboutSection = new Schema({
  
    title:{
        type:Schema.Types.String
    },

    description:{
        type:Schema.Types.String
    },
    image:{
        type:Schema.Types.String
    }

}, { timestamps: true, strict: false })

const aboutSectionModel = mongoose.model("about-section",aboutSection)
module.exports=aboutSectionModel;