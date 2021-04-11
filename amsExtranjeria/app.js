var express = require('express');
var app=express();
var bodyParser = require('body-parser');
const nodemailer=require('nodemailer');


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
	from:"amsextranjeria@zohomail.eu",  //remitente
	to:"alfredodemiguel17@gmail.com",  //destinatario
	subject:"Nuevo mensaje de un cliente a traves del formulario de la página web",  //asunto del correo
	html:` 
		<div> 
		<p>Hola</p> 
		<p>¿Cómo enviar correos eletrónicos con Nodemailer en NodeJS </p> 
		</div> 
	` 
  };
  
let createTransport = nodemailer.createTransport(jConfig);

//especificamos el subdirectorio donde se encuentran las páginas estáticas
app.use(express.static(__dirname + '/public'));

//extended: false significa que parsea solo string (no archivos de imagenes por ejemplo)
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/mostrarnumeros', function (req, res) {
	var num1=req.body.numero1;
	var num2=req.body.numero2;
	num1=parseInt(num1);
	num2=parseInt(num2);
	var pagina='<!doctype html><html><head></head><body>';
	for(var x=num1;x<=num2;x++)
	    pagina += '<a href="/mostrartabla?valor='+x+'">'+x+'</a>'+' - ';
	pagina += '</body></html>';
	email ={ 
		from:"amsextranjeria@zohomail.eu",  //remitente
		to:"alfredodemiguel17@gmail.com",  //destinatario
		subject:"Nuevo Formulario enviado",  //asunto del correo
		html:"<div><p>Formulario recibido:</p>" + num1 + "</div>" 
	  };
	envioEmail();
	res.send(pagina);	
})

app.get('/mostrartabla', function (req, res) {
	var num=req.query.valor;
	num=parseInt(num);
	var pagina='<!doctype html><html><head></head><body>';
	for(var x=1;x<=10;x++) {
		var tabla=num * x;
	    pagina += num + ' * ' + x + ' = ' + tabla + '<br>';
	}	
	pagina += '<a href="index.html">Retornar</a>';
	pagina += '</body></html>';
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



var server=app.listen(8888,function(){
	console.log('Servidor web iniciado');
});