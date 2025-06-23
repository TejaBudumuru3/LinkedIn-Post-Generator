const express = require("express");
const mongoose = require("mongoose");
const Router = require("./router/user");
require("dotenv").config( {path:"../.env" });
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
    res.send("server running");
});

app.use("/user", Router)

const PORT = 5000;

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`server started and running at ${PORT}`);
        });
    } catch (e) {
        console.error("Error connecting to MongoDB:", e);
        process.exit(1); // Exit the process if DB connection fails
    }
}

connectDB();