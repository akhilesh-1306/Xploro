const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type : String,
        required :  true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    location : {
        type : String,
        required : true,
    },
    joinedEvents: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: "event",
        default: [],
    },
    hostedEvents: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: "event", 
        default: [],
    }  
})

const UserModel = mongoose.model("user",UserSchema);
module.exports = UserModel;