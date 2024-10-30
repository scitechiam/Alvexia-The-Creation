
const mongoose = require('mongoose'); 
const { MONGO_URI } = require('../../config');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, { });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Salir del proceso con fallo
    }
};

module.exports = connectDB;
