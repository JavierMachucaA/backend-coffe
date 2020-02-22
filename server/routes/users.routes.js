const express = require('express');
const app = express();

app.get('/users', (req, res) => {
    res.json([
        { name: 'William', location: 'Abu Dhabi' },
        { name: 'Chris', location: 'Vegas' }
    ]);
});

app.post("/user", (req, res) => {
    const { name, location } = req.body;

    res.send({ status: "User created", name, location });
});


module.exports = app;
