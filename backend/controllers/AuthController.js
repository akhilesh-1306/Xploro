const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const axios = require('axios');

const signup = async (req, res) => {
    try {
        const { name, email, password, location } = req.body;
        
        // Check if the user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({
                    message: "User already exists, you can login",
                    success: false
                });
        }

        // Fetch latitude and longitude for the location using Nominatim API
        const locationData = await axios.get(`https://nominatim.openstreetmap.org/search?q=${location}&format=json`);
        const lat = locationData.data[0]?.lat;
        const lon = locationData.data[0]?.lon;

        // If the location is not valid, return an error
        if (!lat || !lon) {
            return res.status(400)
                .json({
                    message: "Unable to get the latitude and longitude for the given location.",
                    success: false,
                });
        }

        // Create a new user with the latitude and longitude
        const userModel = new UserModel({
            name,
            email,
            password,
            location,
            latitude: lat,
            longitude: lon
        });

        // Hash the password
        userModel.password = await bcrypt.hash(password, 10);

        // Save the new user to the database
        await userModel.save();

        return res.status(201)
            .json({
                message: "Signup successful",
                success: true,
            });

    } catch (err) {
        return res.status(500)
            .json({
                message: "Internal server error",
                success: false,
            });
    }
};

const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(403)
                .json({
                    message : "Auth failed, email or password is wrong",
                    success : false,
                });
        }
        const isValidPass = await bcrypt.compare(password,user.password);
        if(!isValidPass){
            return res.status(403)
                .json({
                    message : "Auth failed, email or password is wrong",
                    success : false
                });
        }
        const jwtToken = jwt.sign(
            {_id : user._id},
            process.env.JWT_SECRET,
            {expiresIn : "24h"},
        )
        return res.status(200)
            .json({
                message : "Login successful",
                success : true,
                jwtToken,
                email,
                name : user.name,
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


module.exports = {
    signup,
    login
}