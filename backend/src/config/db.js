const mongoose = require("mongoose");
const dns = require("dns");
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const connectDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("Database Connection Failed:", error.message);

        // Stop the server if the database connection fails
        process.exit(1);
    }
};

module.exports = connectDB;