const express = require("express");

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Secure REST API is running"
    });
});

app.use("/api/auth", authRoutes);

app.use("/api/todos", todoRoutes);

module.exports = app;