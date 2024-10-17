const EventModel = require("../models/Event")
const UserModel = require("../models/User")
const jwt = require("jsonwebtoken")

const addEvent = async (req,res)=>{
    try{
        const secret = process.env.JWT_SECRET;
        const  token  = req.headers.authorization?.split(" ")[1];
        console.log(token);
        const {name,email,activityTitle,tags,noOfPeople,date,time,location,description} = req.body;
        console.log(secret);
        const decoded = jwt.verify(token, secret);
        console.log(decoded);
        const userId = decoded._id;
        const eventModel = new EventModel({name,email,activityTitle,tags,noOfPeople,date,time,location,description,
            createdBy: userId });
        console.log(eventModel);
        await eventModel.save();


        await UserModel.findByIdAndUpdate(userId, {
            $push: { hostedEvents: eventModel._id },
        });
        return res.status(201)
            .json({
                message : "Signup successful",
                success : true,
            })
    }
    catch(err){
        return res.status(500)
            .json({
                message : "Internal server error",
                success : false,
            })
    }
}

const allEvents = async (req,res)=>{
    try {
        const events = await EventModel.find();
        return res.status(200).json({
            success: true,
            events,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message,
        });
    }
}

const joinEvent = async (req,res)=>{
    try{

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message,
        });
    }
}

module.exports = {
    addEvent,
    allEvents,
    joinEvent,
}