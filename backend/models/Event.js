const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name : {
        type : String,
        required :  true,
    },
    location : {
        type : String,
        required : true,
    }   
})

const EventModel = mongoose.model("user",EventSchema);
module.exports = EventModel;