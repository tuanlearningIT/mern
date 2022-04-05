import { request } from "express";
import mongoose from "mongoose";
require('dotenv').config()
const URI = process.env.URI
const connectDB = async () => {
    try {
        await mongoose.connect(URI, {
            useUnifiedTopology: true
        })
        console.log('Connected with database success!')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = {
    connectDB
}