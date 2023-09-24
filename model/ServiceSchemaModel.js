const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const URLSlug = require("mongoose-slug-generator");
mongoose.plugin(URLSlug);

const ServiceSchema = new Schema({
  name: {
    type: Schema.Types.String,
  },

  slug: {
    type: String,
    slug: "name",
    lowercase: true,
    default: " ",
  },

});
const ServiceSchemaModel = mongoose.model("service", ServiceSchema);
module.exports = ServiceSchemaModel;
