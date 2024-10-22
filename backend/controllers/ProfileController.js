const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const axios = require('axios');

const getProfileDetails = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        const userId = decoded._id;

        // Find the user by ID and populate joined and hosted events
        const user = await UserModel.findById(userId)
            .populate('joinedEvents')   // Populate joined events with full event details
            .populate('hostedEvents');  // Populate hosted events with full event details
        // console.log(user);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "User found",
            success: true,
            user,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

// const updateProfileDetails = async (req, res) => {
//     try {
//         const token = req.headers.authorization?.split(" ")[1];
//         const secret = process.env.JWT_SECRET;
//         const decoded = jwt.verify(token, secret);
//         const userId = decoded._id;

//         const { name, email, location } = req.body;

//         const updatedUser = await UserModel.findByIdAndUpdate(
//             userId,
//             { name, email, location },
//             { new: true }
//         );

//         if (!updatedUser) {
//             return res.status(404).json({
//                 message: "User not found",
//                 success: false,
//             });
//         }

//         return res.status(200).json({
//             message: "Profile updated successfully",
//             success: true,
//             user: updatedUser,
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             message: "Internal server error",
//             success: false,
//         });
//     }
// };

const updateProfileDetails = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        const userId = decoded._id;

        const { name, email, location } = req.body;

        // If location is being updated, fetch the new latitude and longitude
        let lat, lon;
        if (location) {
            const locationData = await axios.get(`https://nominatim.openstreetmap.org/search?q=${location}&format=json`);
            lat = locationData.data[0]?.lat;
            lon = locationData.data[0]?.lon;

            // If the location is invalid, return an error
            if (!lat || !lon) {
                return res.status(400).json({
                    message: "Unable to get latitude and longitude for the given location.",
                    success: false,
                });
            }
        }

        // Update the user details along with latitude and longitude (if location is updated)
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                name,
                email,
                ...(location && { location, latitude: lat, longitude: lon }), // Conditionally update location and coordinates
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user: updatedUser,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};


const changePassword = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded._id);

        const { currentPassword, newPassword } = req.body;
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};



module.exports = {
    getProfileDetails,
    updateProfileDetails,
    changePassword,
}