const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const URLSlug = require("mongoose-slug-generator");
mongoose.plugin(URLSlug);

const serviceSchema = new Schema({
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: "service",

  },

  title: {
    type: Schema.Types.String,

  },
  image: {
    type: Schema.Types.String,
  },
  description: {
    type: Schema.Types.String,
  },

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

const serviceHeaderModel = mongoose.model("service-header", serviceSchema);
module.exports = serviceHeaderModel;
