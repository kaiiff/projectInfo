const mongoose = require("mongoose");
const { Schema } = mongoose;

const CardSchema = new Schema({
        title: {
                type: Schema.Types.String,
        },
        text: {
                type: Schema.Types.String,
        },
        image: {
                type: Schema.Types.String,
        }

});

const CardModel = mongoose.model("card", CardSchema);
module.exports = CardModel;
