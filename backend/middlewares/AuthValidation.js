const Joi = require("joi");

const signupValidation = (req,res,next)=>{
    const schema = Joi.object({
        name : Joi.string().min(3).max(100).required(),
        email : Joi.string().email().required(),
        password : Joi.string().min(8).max(100).required(),
        location : Joi.string().required(),
    });
    const {err} = schema.validate(req.body);
    if(err){
        return res.status(400).json({message : "Bad request",err});
    }
    next();
}

const loginValidation = (req,res,next)=>{
    const schema = Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().min(8).max(100).required(),
    });
    const {err} = schema.validate(req.body);
    if(err){
        return res.status(400).json({message : "Bad request",err});
    }
    next();
}

module.exports = {signupValidation,loginValidation};