const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DashboardModelSchema = new Schema({

    blogId: {
        type: Schema.Types.ObjectId,
        ref: "blog",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
})
const DashboardModel = mongoose.model("dashboard", DashboardModelSchema);
module.exports = DashboardModel;