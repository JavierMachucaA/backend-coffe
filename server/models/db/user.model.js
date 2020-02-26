const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email es requerido']
    },
    password: {
        type: String,
        required: [true, 'Password es requerido']
    },
    enable: {
        type: Boolean,
        required: [true,'Estado es requerido']
    }
});

userSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único.' })
module.exports = mongoose.model('User', userSchema)