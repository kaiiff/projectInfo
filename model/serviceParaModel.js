const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const URLSlug = require("mongoose-slug-generator");
mongoose.plugin(URLSlug);

const serviceParaSchema = new Schema({

  serviceId: {
    type: Schema.Types.ObjectId,
    ref: "service",

  },
 title: {
    type: Schema.Types.String,
  },
  cards: [
    {
      text: Schema.Types.String,
    },
  ],

  image: {
    type: Schema.Types.String,
  },

  // slug: {
  //   type: String,
  //   slug: "title",
  //   lowercase: true,
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

const serviceParaModel = mongoose.model("service-paragraph", serviceParaSchema);
module.exports = serviceParaModel;
