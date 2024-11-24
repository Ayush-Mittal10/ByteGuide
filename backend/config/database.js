import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connect = () => {
    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Successfully connected to the database');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
        process.exit();
    });
};

export default connect;