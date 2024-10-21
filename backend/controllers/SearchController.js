const EventModel = require("../models/Event")

const searchEvents = async (req, res) => {
    const { query } = req.query; // Get the search query from request

    try {
        // Assuming eventTitle and tags are fields in your Event model
        const events = await EventModel.find({
            $or: [
                { activityTitle: { $regex: query, $options: 'i' } }, // Case insensitive search
                { tags: { $regex: query, $options: 'i' } }
            ]
        });

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
};

module.exports = {
    searchEvents,
}