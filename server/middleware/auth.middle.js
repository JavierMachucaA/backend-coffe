const jwt = require('jsonwebtoken');
// EXPORTS
const Message = require('../classes/message.class');
const Constants = require('../utils/constants.utils');

const verifyToken = (req, res, next) => {
    const token = req.get('token');
    let msj = null;
    jwt.verify(token, process.env.SEED, (err, decode) => {
        if (err) {
            msj = new Message('Error', err)
            return res.status(Constants.CODE_ERROR_INTERNAL).json(msj);
        }
        req.user = decode.user;
        next();
    });
}

module.exports = verifyToken;