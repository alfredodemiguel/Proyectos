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

app.post('/contacto', function (req, res) {
	var nombre=req.body.nombre;
	var telefono=req.body.telefono;
	var correo=req.body.correo;
	var asunto=req.body.asunto;
	var ckAceptacion=req.body.ckAceptacion;
	var pagina='';
	email ={ 
		from:"amsextranjeria@zohomail.eu",  
		to:"alfredodemiguel17@gmail.com",  
		subject:"Nuevo mensaje de un cliente a traves del formulario de contacto",
		html:"<div><p>Formulario de contacto recibido:</p>" +
		"</br>  Nombre:" + nombre + 
		"</br>  Telefono:" + telefono +
		"</br>  Email:" + correo + 
		"</br>  Asunto:" + asunto + 
		"</div>" 
	  };
	  if (ckAceptacion) {
		pagina=
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
	}	else {
		pagina=
		  `<!doctype html><html><head></head><body>
		  <center>
		  <img src="images/logo.png" alt="" width=100% />
		  </center>
		  <center>
		  <h1>Debe de aceptar la politica de protección de datos para poder enviar el formulario.</h1>
		  </center>
		  </br></br>
		  <center>
		  <a href="index.html">Retornar</a>
		  <center>
		  </body></html>`;
	}
	res.send(pagina);	
});


app.post('/tomaDatos', function (req, res) {
	var nombre=req.body.nombre;
	var nacionalidad=req.body.nacionalidad;
	var pasaporte=req.body.pasaporte;
	var domicilio=req.body.domicilio;
	var telefono=req.body.telefono;
	var correo=req.body.correo;
	var snPasaporte=req.body.snPasaporte;
	var snResidenciaTemporal=req.body.snResidenciaTemporal;
	var snResidenciaLargaDuracion=req.body.snResidenciaLargaDuracion;
	var snCertificadoUE=req.body.snCertificadoUE;
	var snTarjetaFamiliar=req.body.snTarjetaFamiliar;
	var snTarjetaEstudiante=req.body.snTarjetaEstudiante;
	var snTarjetaRoja=req.body.snTarjetaRoja;
	var adjunto=req.body.adjunto;
	var ckAceptacion=req.body.ckAceptacion;
	var pagina='';
	
	email ={ 
		from:"amsextranjeria@zohomail.eu",  
		to:"ams.extranjeria@gmail.com",  
		subject:"Nueva toma de datos de un cliente a traves del formulario de la página web",
		html:"<div><p>Formulario de toma de datos recibido:</p>" +
		"</br>     Nombre:" + nombre + 
		"</br>     Nacionalidad:" + nacionalidad + 
		"</br>     Pasaporte:" + pasaporte+ 
		"</br>     Domicilio:" + domicilio + 
		"</br>     Telefono:" + telefono +
		"</br>     Email:" + correo + 
		"</br>     snPasaporte:" + snPasaporte + 
		"</br>     snResidenciaTemporal:" + snResidenciaTemporal + 
		"</br>     snResidenciaLargaDuracion:" + snResidenciaLargaDuracion + 
		"</br>     snCertificadoUE:" + snCertificadoUE + 
		"</br>     snTarjetaFamiliar:" + snTarjetaFamiliar + 
		"</br>     snTarjetaEstudiante:" + snTarjetaEstudiante + 
		"</br>     snTarjetaRoja:" + snTarjetaRoja + 
		"</div>",
		attachments: 
		[
			{
				filename: adjunto
			}
		]
	  };
	  if (ckAceptacion) {
		pagina=
		  `<!doctype html><html><head></head><body>
		  <center>
		  <img src="images/logo.png" alt="" width=100% />
		  </center>
		  <center>
		  <h1>Formulario recibido correctamente</h1>
		  </center>
		  </br></br>
		  <center>
		  <a href="index.html">Retornar</a>
		  <center>
		  </body></html>`;
		envioEmail();
	}	else {
		pagina=
		  `<!doctype html><html><head></head><body>
		  <center>
		  <img src="images/logo.png" alt="" width=100% />
		  </center>
		  <center>
		  <h1>Debe de aceptar la politica de protección de datos para poder enviar el formulario.</h1>
		  </center>
		  </br></br>
		  <center>
		  <a href="fTomaDatos.html">Retornar</a>
		  <center>
		  </body></html>`;
	}
	res.send(pagina);	
});





function envioEmail() {
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



app.listen(3019,function(){
	console.log('Servidor web iniciado');
});