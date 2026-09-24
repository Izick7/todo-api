const todos = require("../data/todos");

const getTodo = (req, res) => {
    return res.status(200).json({
       todo
    });
};

const createTodo = (req, res) => {
    const { name, description, price } = req.body;

    if (!name || !description || price === undefined) {
        return res.status(400).json({
            message: "Name, description and price are required"
        });
    }

    if (typeof price !== "number" || price < 0) {
        return res.status(400).json({
            message: "Price must be a valid positive number"
        });
    }

    const newTodo = {
        id: products.length + 1,
        name: name.trim(),
        description: description.trim(),
        price
    };

    products.push(newTodo);

    return res.status(201).json({
        message: "Todo created successfully",
        todo: newTodo
    });
};

const updateTodo = (req, res) => {
    const todoId = Number(req.params.id);

    const todo = todo.find(
        todo => todo.id === todoId
    );

    if (!todo) {
        return res.status(404).json({
            message: "todo not found"
        });
    }

    const { name, description, price } = req.body;

    if (name !== undefined) {
        todo.name = name.trim();
    }

    if (description !== undefined) {
        product.description = description.trim();
    }

    if (price !== undefined) {
        if (typeof price !== "number" || price < 0) {
            return res.status(400).json({
                message: "Price must be a valid positive number"
            });
        }

        todo.price = price;
    }

    return res.status(200).json({
        message: "Todo updated successfully",
        todo
    });
};

const deleteTodo = (req, res) => {
    const todoId = Number(req.params.id);

    const TodoIndex = todo.findIndex(
        todo => todo.id === todoId
    );

    if (todoIndex === -1) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    todos.splice(todoIndex, 1);

    return res.status(200).json({
        message: "Todo deleted successfully"
    });
};

module.exports = {
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
};