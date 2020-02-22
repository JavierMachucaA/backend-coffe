const express = require('express');
const app = express();
// EXPORTS
const verifyToken = require('../middleware/auth.middle');
const Usuario = require('../models/db/user.model');
const Message = require('../classes/message.class');
const Constants = require('../utils/constants.utils');

app.get('/', verifyToken, (req, res) => {
    let msj = null;
    Usuario.find()
        //.skip(desde)
        // .limit(limite)
        .exec(
            (err, usuarios) => {
                if (err) {
                    msj = new Message(Constants.MSJ_INTERNAL_ERROR,err);
                    return res.status(Constants.CODE_ERROR_INTERNAL).json(msj);
                }
                res.json(usuarios);
            });
});

app.post("/user", (req, res) => {
    const { name, location } = req.body;

    res.send({ status: "User created", name, location });
});


module.exports = app;
