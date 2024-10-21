const EventModel = require("../models/Event")
const UserModel = require("../models/User")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")

// const addEvent = async (req, res) => {
//     try {
//         const secret = process.env.JWT_SECRET;
//         const token = req.headers.authorization?.split(" ")[1];
//         console.log(token);
//         const { name, email, activityTitle, tags, noOfPeople, date, time, location, description } = req.body;
//         console.log(secret);
//         const decoded = jwt.verify(token, secret);
//         console.log(decoded);
//         const userId = decoded._id;
//         const eventModel = new EventModel({
//             name, email, activityTitle, tags, noOfPeople, date, time, location, description,
//             createdBy: userId
//         });
//         console.log(eventModel);
//         await eventModel.save();


//         await UserModel.findByIdAndUpdate(userId, {
//             $push: { hostedEvents: eventModel._id },
//         });
//         return res.status(201)
//             .json({
//                 message: "Signup successful",
//                 success: true,
//             })
//     }
//     catch (err) {
//         return res.status(500)
//             .json({
//                 message: "Internal server error",
//                 success: false,
//             })
//     }
// }

const addEvent = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, error: errors.array() });
      }
      const secret = process.env.JWT_SECRET;
      const token = req.headers.authorization?.split(" ")[1];
      const decoded = jwt.verify(token, secret);
      const userId = decoded._id;

      const { name, email, activityTitle, tags, noOfPeople, date, time, location, description } = req.body;
  
      // File path for the image
      const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : null;
    //   console.log(imagePath);
  
      // Create a new event instance
      const newEvent = new EventModel({
        name,
        email,
        activityTitle,
        tags,
        noOfPeople,
        date,
        time,
        location,
        description,
        image: imagePath,
        createdBy: userId, // Assuming you have user authentication
      });
  
      // Save the event in the database
      await newEvent.save();
      await UserModel.findByIdAndUpdate(userId, {
                    $push: { hostedEvents: newEvent._id },
                });
      return res.status(201).json({
        success: true,
        message: "Event created successfully!",
        event: newEvent,
      });
    } catch (error) {
      // Handle errors
      return res.status(500).json({
        success: false,
        message: "Error creating event",
        error: error.message,
      });
    }
  };

const allEvents = async (req, res) => {
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

const joinEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const secret = process.env.JWT_SECRET;
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, secret);
        const userId = decoded._id;
        const event = await EventModel.findById(eventId);
        const user = await UserModel.findById(userId);

        if (!event) {
            return res.status(404).json({ message: "Event not found", success: false });
        }

        // Check if the user is already in the joinedUsers array
        if (event.joinedUsers.includes(userId)) {
            return res.status(400).json({
                message: "User has already joined this event",
                success: false,
            });
        }

        // If the user is not already joined, push the userId
        event.joinedUsers.push(userId);
        user.joinedEvents.push(eventId);
        await event.save();  // Save the updated event
        await user.save();

        return res.status(200).json({
            message: "Joined event successfully",
            success: true,
            event,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error joining the event",
            success: false,
            error: error.message,
        });
    }
};





module.exports = {
    addEvent,
    allEvents,
    joinEvent,
}