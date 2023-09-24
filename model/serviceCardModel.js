const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const URLSlug = require("mongoose-slug-generator");
mongoose.plugin(URLSlug);

const servicecardSchema = new Schema({

  serviceId: {
    type: Schema.Types.ObjectId,
    ref: "service",

  },

  title: {
    type: Schema.Types.String,

  },

  content:{
    type:Schema.Types.String,
  },

  cards:[{
    title:Schema.Types.String,
    content:Schema.Types.String
   
}],
  
  // slug: {
  //   type: String,
  //   slug: "title",
  //   lowercase:true,
  //   default: " ",
  // },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});



const serviceCardModel = mongoose.model("service-card", servicecardSchema);
module.exports = serviceCardModel;
