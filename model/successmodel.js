const mongoose = require("mongoose");

const URLSlug = require("mongoose-slug-generator");
mongoose.plugin(URLSlug);

const successSchema = new mongoose.Schema(
  {

    successcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "success-category",
      // required: true,
    },

    title: {
      type: String,
      
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
   
    short_description:{
      type:String,

    },

    slug: {
      type: String,
      slug: "title",
      lowercase: true,
      default:" ",

    },
  },
  { timestamps: true, strict: false }
);

const   successModel = mongoose.model("success-stories", successSchema);

module.exports = successModel;
