const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");

const signup = async (req,res)=>{
    try{
        const {name,email,password,location} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
                .json({
                    message : "User already exist, you can login",
                    success : false
                });
        }
        const userModel = new UserModel({name,email,password,location});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
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