const mongoose=require('mongoose');
const path =require('path');
const dotenv=require("dotenv");

dotenv.config({path:path.join(__dirname,"config","config.env")})

const databaseConnection=()=>{
    mongoose.connect("mongodb://localhost:27017/doctor-Appointment-Database").then((res)=>{
        console.log(`MongooDB Connected SuccessFully with ${res.connection.host}`);
        
    })
}

module.exports=databaseConnection;
