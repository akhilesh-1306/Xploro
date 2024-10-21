const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name : {
        type : String,
        required :  true,
    },
    email : {
        type : String,
        required : true,
    },
    activityTitle : {
        type : String,
        required : true,
    },
    tags : {
        type : String,
        required : true,
    },
    noOfPeople : {
        type : Number,
        required : true,
    },
    date : {
        type : String,
        required : true,
    },
    time : {
        type : String,
        required  :true,
    },
    location : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true,
    },
    joinedUsers: [{
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'user',  
        default: [],  
    }],
    image: {
        type: String,
        required: true,
        default : "https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
})

const EventModel = mongoose.model("event",EventSchema);
module.exports = EventModel;