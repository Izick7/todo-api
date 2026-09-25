const todos = require("../data/todos");


// GET ALL TODOS
const getTodos = (req, res) => {

    const userTodos = todos.filter(
        todo => todo.userId === req.user.id
    );

    return res.status(200).json({
        todos: userTodos
    });
};


// CREATE TODO
const createTodo = (req, res) => {

    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            message: "Title and description are required"
        });
    }

    const newTodo = {
        id: todos.length + 1,
        title: title.trim(),
        description: description.trim(),
        completed: false,
        userId: req.user.id,
        createdAt: new Date()
    };

    todos.push(newTodo);

    return res.status(201).json({
        message: "Todo created successfully",
        todo: newTodo
    });
};


// GET ONE TODO
const getTodo = (req, res) => {

    const todoId = Number(req.params.id);

    const todo = todos.find(
        todo => todo.id === todoId
    );

    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    if (todo.userId !== req.user.id) {
        return res.status(403).json({
            message: "You are not authorized to access this todo"
        });
    }

    return res.status(200).json({
        todo
    });
};


// UPDATE TODO
const updateTodo = (req, res) => {

    const todoId = Number(req.params.id);

    const todo = todos.find(
        todo => todo.id === todoId
    );

    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    if (todo.userId !== req.user.id) {
        return res.status(403).json({
            message: "You are not authorized to update this todo"
        });
    }

    const { title, description, completed } = req.body;

    if (title !== undefined) {
        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({
                message: "Title must be a valid string"
            });
        }

        todo.title = title.trim();
    }

    if (description !== undefined) {
        if (typeof description !== "string" || !description.trim()) {
            return res.status(400).json({
                message: "Description must be a valid string"
            });
        }

        todo.description = description.trim();
    }

    if (completed !== undefined) {
        if (typeof completed !== "boolean") {
            return res.status(400).json({
                message: "Completed must be a boolean"
            });
        }

        todo.completed = completed;
    }

    return res.status(200).json({
        message: "Todo updated successfully",
        todo
    });
};


// DELETE TODO
const deleteTodo = (req, res) => {

    const todoId = Number(req.params.id);

    const todoIndex = todos.findIndex(
        todo => todo.id === todoId
    );

    if (todoIndex === -1) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    const todo = todos[todoIndex];

    if (todo.userId !== req.user.id) {
        return res.status(403).json({
            message: "You are not authorized to delete this todo"
        });
    }

    todos.splice(todoIndex, 1);

    return res.status(200).json({
        message: "Todo deleted successfully"
    });
};


module.exports = {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
};