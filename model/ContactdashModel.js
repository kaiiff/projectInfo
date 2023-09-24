const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContactDashModelSchema = new Schema({

    contactId: { type: mongoose.Schema.Types.ObjectId, ref: "contact-us" },

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
})
const ContactDashModel = mongoose.model("contact-dash", ContactDashModelSchema);
module.exports = ContactDashModel;