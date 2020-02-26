const express = require('express');
const app = express();
const _ = require('underscore');
// EXPORTS
const verifyToken = require('../middleware/auth.middle');
const User = require('../models/db/user.model');
const Message = require('../classes/message.class');
const Constants = require('../utils/constants.utils');

//prueba
app.get('/test', (req, res) => {
    let msj ;
    User.find()
        .exec(
            (err, usuarios) => {
                if (err) {
                    msj = new Message(Constants.MSJ_INTERNAL_ERROR,err);
                    return res.status(Constants.CODE_ERROR_INTERNAL).json(msj);
                }
                res.json(usuarios);
            });
});

// TODO: falta retornar página
app.get('/', verifyToken, (req, res) => {
    let offset = req.query.offset || 0;
    offset = Number(offset);

    let limit = req.query.limit || 5;
    limit = Number(limit);
    let msj = null;
    User.find()
        .skip(offset)
        .limit(limit)
        .exec(
            (err, usuarios) => {
                if (err) {
                    msj = new Message(Constants.MSJ_INTERNAL_ERROR,err);
                    return res.status(Constants.CODE_ERROR_INTERNAL).json(msj);
                }
                res.json(usuarios);
            });
});

app.post("/", verifyToken, (req, res) => {
    if (!req.body) {
        let msj = new Message('Faltan parametros para crear usuario.',null);
        res.json(msj);
    }
    let body = req.body;
    
    console.log(body);
    
    const user = new User(
        {
            name:body.name,
            email:body.email,
            password:body.password,
            enable: true,
        });

    user.save((err,userDB) => {
        if(err){
            res.status(400).json({
                status: false,
                mensaje: err
            });
        }
        
        res.json({
            status : true,
            usuario : userDB
        });
    })
});

app.put('/edit/:id', verifyToken, (req,res) => {
    
    let id = req.params.id
    
    let body = _.pick( req.body,[
        'name',
        'email',
        'enable'
    ]);

    let options = {runValidators:true, context: 'query'}

    User.findByIdAndUpdate(id, body, options ,(err, userDB)=>{
        if(err){
            return res.status(400).json({
                status: false,
                mensaje: err
            });
        }

        res.json({
            status: true,
            mensaje: userDB
         });
        
    });
})


module.exports = app;
