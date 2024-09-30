require("dotenv").config(); 

const express = require("express")
const mongoose = require("mongoose")
const app = express();

const PORT = process.env.PORT || 8080
const MONGO_URL = process.env.MONGO_URL;

const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("Mongoose is connected");
})
.catch((err)=>{
    console.log(err);
})

app.get("/",(req,res)=>{
    console.log("working");
    res.send("Working");
})

app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`);
})