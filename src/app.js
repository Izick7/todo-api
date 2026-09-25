const express = require("express");

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const limiter = require("./middleware/rateLimiter");
const logger = require("./middleware/logger");

const app = express();

app.use(express.json());
app.use(limiter);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Secure REST API is running"
    });
});
app.use(logger);

app.use("/api/auth", authRoutes);

app.use("/api/todos", todoRoutes);

module.exports = app;