const express = require("express");

const {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
} = require("../controllers/todoController");

const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticate, getTodos);

router.get("/:id", authenticate, getTodo);

router.post("/", authenticate, createTodo);

router.put("/:id", authenticate, updateTodo);

router.delete("/:id", authenticate, deleteTodo);

module.exports = router;