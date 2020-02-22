const express = require('express');

const app = express();

// HOME
app.get('/', (req, res) => {
    res.send('Welcome to API of app');
});

// ROUTES
app.use(require('./auth.routes'));
app.use('/users',require('./users.routes'));

module.exports = app;