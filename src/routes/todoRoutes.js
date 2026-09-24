const express = require("express");

const {
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
} = require("../controllers/todoController");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();


router.get("/", authenticate, getTodo);


router.post(
    "/",
    authenticate,
    authorize("admin"),
    createTodo
);

router.put(
    "/:id",
    authenticate,
    authorize("admin"),
    updateTodo
);

router.delete(
    "/:id",
    authenticate,
    authorize("admin"),
    deleteTodo
);

module.exports = router;