var express = require('express');
var app=express();
var bodyParser = require('body-parser');
const nodemailer=require('nodemailer');
var favicon = require('serve-favicon');


let jConfig = {
	"host":"smtp.zoho.eu", 
	"port":"465", 
	"secure":true, 
	"auth":{ 
		  "type":"login", 
		  "user":"amsextranjeria@zohomail.eu", 
		  "pass":"Sov@s@00" 
  }
  };
  
let email ={ 
	from:"",
	to:"",  
	subject:"",  
	html:`` 
  };
  
let createTransport = nodemailer.createTransport(jConfig);

//especificamos el subdirectorio donde se encuentran las páginas estáticas
app.use(express.static(__dirname + '/public'));

//extended: false significa que parsea solo string (no archivos de imagenes por ejemplo)
app.use(bodyParser.urlencoded({ extended: false }));


app.use(favicon((__dirname + '/public', 'favicon.ico')));

app.post('/mostrar', function (req, res) {
	var nombre=req.body.nombre;
	var telefono=req.body.telefono;
	var correo=req.body.correo;
	var asunto=req.body.asunto;
	
	email ={ 
		from:"amsextranjeria@zohomail.eu",  
		to:"alfredodemiguel17@gmail.com",  
		subject:"Nuevo mensaje de un cliente a traves del formulario de la página web",
		html:"<div><p>Formulario recibido:</p></br>Nombre:" + nombre + 
		"</br>Telefono:" + telefono +
		"</br>Email:" + correo + 
		"</br>Asunto:" + asunto + "</div>" 
	  };
	  const pagina=
		`<!doctype html><html><head></head><body>
		<center>
		<img src="images/logo.png" alt="" width=100% />
		</center>
		<center>
		<h1>Próximamente contactaremos con usted</h1>
		</center>
		</br></br>
		<center>
		<a href="index.html">Retornar</a>
		<center>
		</body></html>`;
	envioEmail();
	res.send(pagina);	
})





function envioEmail() {
	createTransport.sendMail(email, function (error, info) { 
	  if(error){ 
		   console.log("Error al enviar email"); 
		   console.log (info);
	  } else{ 
		   console.log("Correo enviado correctamente"); 
	  } 
	  createTransport.close(); 
	});
  }



var server=app.listen(3019,function(){
	console.log('Servidor web iniciado');
});