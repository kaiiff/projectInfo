const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const caseSchema = new Schema(
  {
    successId: {
      type: Schema.Types.ObjectId,
      ref: "success-stories",
    },
  },
  { timestamps: true, strict: false }
);

const caseDashModel = mongoose.model("case-dash", caseSchema);
module.exports = caseDashModel;
