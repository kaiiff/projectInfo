const { Types } = require("aws-sdk/clients/acm");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const hiringSchema = new Schema({
  developerType: {
    type: Schema.Types.String,
  },
  detail: { type: Schema.Types.String },

  status: {
    type: Schema.Types.String,
    enum: ["active", "deactive"],
    default: "active",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },


});

const hiringModel = mongoose.model("hiring", hiringSchema);
module.exports = hiringModel;
