const mongoose = require("mongoose");
const { Schema } = mongoose;

const caseImageSchema = new Schema(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "casestudies",
      required: true,
    },
    image: {
      type: Schema.Types.String,
    },
    imageType: {
      type: Schema.Types.String,
      status: ["main","additional"],      
      default: "addtional",
      required: true,
    },
  },
  { timestamps: true, strict: false }
);

const caseImageModel = mongoose.model("case-image", caseImageSchema);
module.exports = caseImageModel;
