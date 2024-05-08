// Load .env variables
if(process.env.NODE_ENV != 'production'){
    require("dotenv").config();
}

const mongoose = require('mongoose');


async function connectToDB(){
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected!");
    } catch(err){
        console.log(err);
    }
}


module.exports = connectToDB;