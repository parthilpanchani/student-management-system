const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const errorHandler = require("./src/middleware/errorMiddleware");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
connectDB();
app.use("/api/auth", authRoutes);


app.use(errorHandler);

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});