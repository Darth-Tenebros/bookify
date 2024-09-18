const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
require('dotenv').config();


const connectDB = async function(){
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNSTR, {
            dbName: "bookify"
        });
        console.log(process.env.MONGO_DB_CONNSTR);
    } catch (error) {
        console.log(error);
        console.log('error connecting to db');
    }
    
    console.log("connection to db initialised!");
    
}

module.exports = connectDB;
