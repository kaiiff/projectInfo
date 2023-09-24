const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const aboutCard = new Schema({
  
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

const aboutCardModel = mongoose.model("about-card",aboutCard)
module.exports=aboutCardModel