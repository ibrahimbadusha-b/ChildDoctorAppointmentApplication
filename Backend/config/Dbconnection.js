const mongoose=require('mongoose');

const databaseConnection=()=>{
    mongoose.connect("mongodb://localhost:27017/doctor-Appointment-Database").then((res)=>{
        console.log(`MongooDB Connected SuccessFully with ${res.connection.host}`);
        
    })
}

module.exports=databaseConnection;