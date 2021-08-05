const nodemailer=require('nodemailer');
require ('dotenv').config({path:'./.env'});

let jConfig = {
    "host":process.env.EMAIL_HOST, 
	"port":process.env.EMAIL_PORT, 
	"secure":true, 
	"auth":{ 
		  "type":"login", 
		  "user":process.env.EMAIL_USER, 
		  "pass":process.env.EMAIL_PASS 
  }
};

let createTransport = nodemailer.createTransport(jConfig);

const sendEmail = function (errorDescription, errorReceived) {

    let email ={ 
        from: process.env.EMAIL_FROM,  
        to: process.env.EMAIL_TO,  
        subject: errorDescription,
        html:"<div>" +
                "<p>Descripcion Error</p>" +
                "</br>     Error:" + errorReceived +
            "</div>"
      };


	createTransport.sendMail(email, function (error, info) { 
	  if(error){ 
		   console.log("Error al enviar email"); 
		   console.log (info);
		   console.log (error);
	  } else{ 
		   console.log("Correo enviado correctamente"); 
	  } 
	  createTransport.close(); 
	});
}

module.exports = sendEmail;