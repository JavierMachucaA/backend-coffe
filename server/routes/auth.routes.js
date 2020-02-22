const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
// EXPORTS
const Message = require('../classes/message.class');
const Usuario = require('../models/db/user.model');
const Constants = require('../utils/constants.utils');

app.set('key', process.env.SEED);

// LOGIN ROUTE
app.post('/login', (req, res) => {
    const body = req.body;
    let msj = null;
     const query = { email: body.email };
    Usuario.findOne(query, (err, user) => {
        if (err) {
            msj = new Message('Error', err);
            return res.status(Constants.CODE_ERROR_INTERNAL).json(msj);
        }
        
        if (!user) {
            msj = new Message(Constants.MSJ_USER_PASSWORD_NOT_FOUND, {'email':body.email});
            return res.status(Constants.CODE_NOT_FOUND).json(msj);
        }

        if (body.password !== user.password) {
            msj = new Message(Constants.MSJ_USER_PASS_NOT_MATCH, null)
            return res.status(Constants.CODE_NO_AUTHORIZED).json(msj);
        }

        const token = jwt.sign(user.toJSON(),
            process.env.SEED,
            { expiresIn: process.env.EXPIRATION_SESSION }
        );
        delete user.password;
        msj = new Message(`User ${user.name} has login`,user );
        msj.token = token;
        res.status(Constants.CODE_OK).json(msj);
    });
});

module.exports = app;