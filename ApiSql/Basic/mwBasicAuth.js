const auth = require ('basic-auth');
const sendEmail = require ('./sendEmail');
require ('dotenv').config({path:'./.env'});

const mwBasicAuth = async function (req,res,next) {
    const username = process.env.BA_USERNAME;
    const password = process.env.BA_PASSWORD;
    try {
        const user = await auth (req);
        if ((user.name === username) && (user.pass === password)){   
            next ();
        }
    }catch (error) { 
        sendEmail ("Error en autenticacion",error);
        console.log ('Basic Auth: failure');
        res.statusCode = 401;
        res.send ('Access denied');
        next ();
    }
}

module.exports = mwBasicAuth;
