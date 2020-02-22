class Constants {
    // CODES
    static CODE_ERROR_INTERNAL = 500;
    static CODE_OK = 200;
    static CODE_OK_NO_RESPONSE = 201;
    static CODE_NO_AUTHORIZED = 401;
    static CODE_REQUEST_NOT_FOUND = 404;
    static CODE_NOT_FOUND = 400;

    // MESSAGES
    static MSJ_USER_NOT_FOUND = 'usuario no encontrado';
    static MSJ_USER_PASS_NOT_MATCH = 'usuario y contraseña incorrectos';

}

module.exports = Constants;