const sendEmail = require ('./sendEmail');

const mwErrorHandler = function (error,req,res,next) {
    console.log (error);
    sendEmail ("Error indeterminado",error);
    res.status(500).send ('Información del error enviado por email al administrador ${error}');
}

module.exports = mwErrorHandler;
