const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = new User({ name, email });
        await user.save();
        res.status(201).json(user); // 201 Created → Specifically used for POST when a new resource is created.
    } catch (err) {
        res.status(400).json({ error: err.message }); // 400 Bad Request
                                                      // Means: "The client sent something invalid"
                                                      // Example: missing fields, bad JSON, duplicate email
                                                      // Because when creating a user, errors often come from bad input (e.g., missing email), which is the client’s fault.
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users); // 200 OK → Standard success response for GET, PUT, DELETE, etc.
                         // default status is 200. Equivalent to res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message }); // 500 Internal Server Error
                                                      // Means: "Something went wrong on the server"
                                                      // Example: DB is down, bug in code 
                                                      // Because if a GET request to retrieve users fails, it's usually not the client’s fault — something unexpected failed on the server.
    }
};