const http=require('http');
const url=require('url');
const fs=require('fs');
const querystring = require('querystring');
const nodemailer=require('nodemailer');

const mime = {
   'html' : 'text/html',
   'css'  : 'text/css',
   'jpg'  : 'image/jpg',
   'ico'  : 'image/x-icon',
   'mp3'  : 'audio/mpeg3',
   'mp4'  : 'video/mp4'
};

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
  subject:"Nuevo mensaje de usuario",  //asunto del correo
  html:` 
      <div> 
      <p>Hola</p> 
      <p>¿Cómo enviar correos eletrónicos con Nodemailer en NodeJS </p> 
      </div> 
  ` 
};

let createTransport = nodemailer.createTransport(jConfig);

const servidor=http.createServer((pedido ,respuesta) => {
  const objetourl = url.parse(pedido.url);
  let camino='public'+objetourl.pathname;
  if (camino=='public/') camino='public/index.html';
  encaminar(pedido,respuesta,camino);
});

servidor.listen(8888);


function encaminar (pedido,respuesta,camino) {
  switch (camino) {
    case 'public/recuperardatos': {
    let info = '';
    pedido.on('data', datosparciales => {
     info += datosparciales;
     console.log ("info:",info);
     arregloDeSubCadenas = info.split('&');
    console.log ('arreglo:',arregloDeSubCadenas[0],'---',arregloDeSubCadenas[1]);
    });
    pedido.on('end', () => {
     const formulario = querystring.parse(info);
     console.log ('formulariomio:',formulario);
     console.log (formulario.nombre);
     console.log (formulario.clave);
     console.log ('Fin formulario mio');
     email ={ 
      from:"amsextranjeria@zohomail.eu",  //remitente
      to:"alfredodemiguel17@gmail.com",  //destinatario
      subject:"Nuevo Formulario enviado",  //asunto del correo
      html:"<div><p>Formulario recibido:</p>" + formulario.nombre + "</div>" 
    };
     envioEmail();
    });	
    camino='public/index.html';
    fs.stat(camino, error => {
      fs.readFile(camino,(error, contenido) => {			
          const vec = camino.split('.');
          const extension=vec[vec.length-1];
          const mimearchivo=mime[extension];
          respuesta.writeHead(200, {'Content-Type': mimearchivo});
          // Insertar aquí los datos.
          contenido = contenido.toString();
          arregloDeSubCadenas [0] = arregloDeSubCadenas[0].replace('nombre=', '');
          contenido = contenido.replace("xxxxx", arregloDeSubCadenas[0]);
          arregloDeSubCadenas [1] = arregloDeSubCadenas[1].replace('clave=', '');
          contenido = contenido.replace("yyyyy", arregloDeSubCadenas[1]);
          respuesta.write(contenido);
          respuesta.end();
      });
    });	
    break;
  }	
    default : {  
      fs.stat(camino, error => {
        if (!error) {
        fs.readFile(camino,(error, contenido) => {
          if (error) {
            respuesta.writeHead(500, {'Content-Type': 'text/plain'});
            respuesta.write('Error interno');
            respuesta.end();					
          } else {
            const vec = camino.split('.');
            const extension=vec[vec.length-1];
            const mimearchivo=mime[extension];
            respuesta.writeHead(200, {'Content-Type': mimearchivo});
            respuesta.write(contenido);
            respuesta.end();
          }
        });
      } else {
        respuesta.writeHead(404, {'Content-Type': 'text/html'});
        respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');		
        respuesta.end();
        }
      });	
    }
  }	
}


function recuperar(pedido,respuesta) {
  let info = '';
  pedido.on('data', datosparciales => {
    info += datosparciales;
    console.log ("info:",info);
  });
  pedido.on('end', () => {
    const formulario = querystring.parse(info);
    console.log ('formulario:',formulario);
    // respuesta.writeHead(200, {'Content-Type': 'text/html'});
    // const pagina=
    //   `<!doctype html><html><head></head><body>
    //    Nombre de usuario:${formulario['nombre']}<br>
    //   Clave:${formulario['clave']}<br>
    //   <a href="index.html">Retornar</a>
    //   </body></html>`;
    // respuesta.end(pagina);

  });	
}

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


console.log('Servidor web iniciado en el puerto 8888');
