const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");

const getProfileDetails = async (req,res) =>{
    try{
        const token = req.headers.authorization?.split(" ")[1];
        // console.log(token);
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token,secret);
        const userId = decoded._id;
        const user = await UserModel.findById(userId);
        // console.log(user);
        if (!user) {
            return res.status(404)
            .json({
                message : "User not found",
                success : false,
                
            });
        }
        return res.status(200)
        .json({
            message : "User found",
            success : true,
            user,
        });
    }
    catch(err){
        console.log(err);
        return res.status(500)
            .json({
                message : "Internal server error",
                success : false,
            })
    }
}

module.exports = {
    getProfileDetails,
}