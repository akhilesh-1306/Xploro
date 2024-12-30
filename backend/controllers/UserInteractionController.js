
const jwt = require("jsonwebtoken");
const axios = require('axios');
const UserInteractionModel = require("../models/UserInteraction");
const EventModel = require("../models/Event");

const addUserInteraction = async (req, res) => {
    const { eventId } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    const userId = decoded._id;
    try {
        let interaction = await UserInteractionModel.findOne({ userId });
        // console.log(interaction);
        // If user interaction already exists, update it
        if (interaction != null) {
            interaction.interactions.push(eventId);
            await interaction.save();
        } else {
            // If no interaction exists, create a new one
            interaction = new UserInteractionModel({
                userId : userId,
                interactions: [eventId]
            });
            await interaction.save();
        }

        res.status(200).json({ success: true, message: 'Interaction saved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error saving interaction', error });
    }
}

const triggerRecommendation = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    const userId = decoded._id;

    try {
        const interaction = await UserInteractionModel.findOne({ userId }).populate('interactions');
        // console.log(interaction);
        if (!interaction || interaction.interactions.length < 5) {
            return res.status(400).json({
                success: false,
                message: 'Not enough interactions to generate recommendations'
            });
        }

        // Prepare data for recommendation system (e.g., event IDs and tags)
        const eventIds = interaction.interactions.map(event => event._id);
        const eventTags = interaction.interactions.map(event => event.tags).flat();
        // console.log(eventTags);

        const allEvents = await EventModel.find();

        const extractEventIdsAndTags = (events) => {
            // Create two arrays: one for event IDs and one for tags
            const allEventIds = events.map(event => event._id);
            const allEventTags = events.map(event => event.tags.split(',').map(tag => tag.trim()));
        
            return {
                allEventIds,
                allEventTags
            };
        };
        
        // Example usage
        
        const { allEventIds, allEventTags } = extractEventIdsAndTags(allEvents);
        // console.log(allEventTags);
        // Make a request to the recommendation system running on a different server
        const recommendationResponse = await axios.post('https://xploro-recommendation.vercel.app', 
            {
                interactions: allEventIds,  // Interaction-related data
                tags: allEventTags,         // Tags-related data
                interactionsUser: eventIds, // Additional user interaction data
                tagsUser: eventTags         // Additional user tags data
            }
    );
        // console.log(recommendationResponse);
        // Send the recommended event IDs back to the user
        res.status(200).json({
            success: true,
            recommendedEvents: recommendationResponse.data
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error generating recommendations', error });
    }
}

module.exports = {
    addUserInteraction,
    triggerRecommendation,

}