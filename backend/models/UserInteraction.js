const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserInteractionSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true,
    },
    interactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'event',  
        }
    ]
})

const UserInteractionModel = mongoose.model("userInteraction",UserInteractionSchema);
module.exports = UserInteractionModel;