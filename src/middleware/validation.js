const validateTodo = (req, res, next) => {

    const { title, description } = req.body;

    if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
            message: "Title must be a valid string"
        });
    }

    if (typeof description !== "string" || !description.trim()) {
        return res.status(400).json({
            message: "Description must be a valid string"
        });
    }

    next();
};

module.exports = {
    validateTodo
};