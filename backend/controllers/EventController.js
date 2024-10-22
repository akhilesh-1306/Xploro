const EventModel = require("../models/Event")
const UserModel = require("../models/User")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")
const axios = require('axios')

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

    // Convert location to latitude and longitude
    const locationData = await axios.get(`https://nominatim.openstreetmap.org/search?q=${location}&format=json`);
    const lat = locationData.data[0]?.lat;
    const lon = locationData.data[0]?.lon;

    if (!lat || !lon) {
      return res.status(400).json({ success: false, message: "Unable to get the latitude and longitude for the given location." });
    }

    // File path for the image
    const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : null;

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
      latitude: lat,
      longitude: lon,
      description,
      image: imagePath,
      createdBy: userId,
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

const deleteEvent = async (req, res) => {
  try {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have JWT_SECRET in your environment variables
    const userId = decoded.id; // Get the user ID from the decoded token

    const eventId = req.params.eventId;

    // Find the event by ID
    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the logged-in user is the host of the event
    // if (event.createdBy.toString() !== userId) {
    //   return res.status(403).json({ message: 'You are not authorized to delete this event' });
    // }

    // Delete the event
    await EventModel.findByIdAndDelete(eventId);

    // Remove the event from the user's hostedEvents array
    await UserModel.findByIdAndUpdate(userId, {
      $pull: { hostedEvents: eventId }
    });

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    } else if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(500).json({ message: 'Server error' });
  }
}



module.exports = {
  addEvent,
  allEvents,
  joinEvent,
  deleteEvent,
}