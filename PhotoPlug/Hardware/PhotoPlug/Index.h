const char pag_validacion_html[] PROGMEM = R"rawliteral(
<!DOCTYPE HTML><html>
<html lang='es'>
    <head>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <title>'Configuración PhotoPlug'</title>
        <meta charset='UTF-8'>
        <style>
            .titulo {
              float: top;
              font-size:5vw;
              text-align: center;
              color: chartreuse;
            }
            .cuerpo {
                background-color:blue;
                border:1px solid chartreuse;
            }
            .formulario{
                color: chartreuse;
            }
            .button {
              background-color: chartreuse;
              border: none;
              color: black;
              padding: 10px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 3vw;
              margin: 2px 1px;
              cursor: pointer;
              border-radius: 12px;
              width: 55%;
              display:block;
              margin-left: auto;
              margin-right: auto;
            }
            .input1{
                font-size: 2vw;
                background-color:blue;
                color: chartreuse;
            }
            table, td {
              font-size: 2vw;
              border-collapse: collapse;
            }
            .footer { 
             background-color:blue;
             color: black; 
             text-align: center; 
             ·font-size: 1vw; 
         } 
         .link {
          color: black; 
         }
        </style>
    </head>
    <body class='cuerpo'>
        <h1 class='titulo' >PHOTO PLUG</h1>
        <br><br><br><br>
        <form action='/get' method='get' class="formulario">
          <table style='width:100%'>
            <tr>
             <td>Usuario:</td>
             <td><input class='input1' name='usuario' type='text'><br></td>
            </tr>
            <tr>
              <td>Contraseña:</td>
              <td><input class='input1' name='contrasena' type='password'><br><br></td>
            </tr>
          </table>
          <br><br><br>
            <input class='button' type='submit' value='validar'/><br><br>
        </form>
        <footer class='footer'>
           <p>Web para administración remota <a class='link' href='https://web-photoplug.herokuapp.com/'> https://web-photoplug.herokuapp.com/</a></p>
           <br>
           <p>Código fuente del proyecto <a class='link' href='http://github.com/alfredodemiguel/Proyectos/tree/master/photoplug'> http://github.com/alfredodemiguel/Proyectos/tree/master/photoplug</a></p>
        </footer>
    </body>
    <script>
      function validar_validacion() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "/capture", true);
        xhr.send();
      }
    </script>
</html>)rawliteral";







const char pag_menu_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html>
    <head>
      <meta name='viewport' content='width=device-width, initial-scale=1'>
      <title>'MENU PhotoPlug'</title>
      <meta charset='UTF-8'>
      <style>
        .button {
          background-color: chartreuse;
          border: none;
          color: black;
          padding: 10px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 3vw;
          margin: 2px 1px;
          cursor: pointer;
          border-radius: 12px;
          width: 55%;
        }
        .cuerpo {
          background-color:blue;
          border:1px solid chartreuse;
        }
        .titulo {
          float: top;
          font-size:5vw;
          text-align: center;
          color: chartreuse;
        }
        table, th {
            border-collapse: collapse;
          }
          .footer { 
             background-color:blue; 
             color: black; 
             text-align: center; 
             ·font-size: 1vw; 
         } 
         .link {
          color: black; 
         }
      </style>    
    </head>
    <body class='cuerpo'>
      <h1 class='titulo' >"PHOTO PLUG"</h1>
       <br><br><br><br>
       <table style='width:100%'>
          <tr>
           <th><a href='operacion'><button class='button'>OPERACION</button></a></th>
           <th><a href='configuracion'><button class='button'>CONFIGURACION</button></a></th>
          </tr>
          <tr>
      </table>
      <footer class='footer'>
           <p>Web para administración remota <a class='link' href='https://web-photoplug.herokuapp.com/'> https://web-photoplug.herokuapp.com/</a></p>
           <br>
           <p>Código fuente del proyecto <a class='link' href='http://github.com/alfredodemiguel/Proyectos/tree/master/photoplug'> http://github.com/alfredodemiguel/Proyectos/tree/master/photoplug</a></p>
      </footer>
    </body>
</html>)rawliteral";




const char pag_configuration_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html>
    <head>
      <meta name='viewport' content='width=device-width, initial-scale=1'>
      <title>"Configuración PhotoPlug"</title>
      <meta charset='UTF-8'>
      <style>
        .titulo {
          float: top;
          font-size:5vw;
          text-align: center;
          color: chartreuse;
        }
        .cuerpo {
            background-color:blue;
            border:1px solid chartreuse;
        }
        .formulario{
            color: chartreuse;
        }
        .input1{
            font-size: 2vw;
            background-color:blue;
            color: chartreuse;
        }
        table, td {
          border-collapse: collapse;
          font-size: 2vw;
        }
        .button {
          background-color: chartreuse;
          border: none;
          color: black;
          padding: 10px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 3vw;
          margin: 2px 1px;
          cursor: pointer;
          border-radius: 12px;
          width: 55%;
          display:block;
          margin-left: auto;
          margin-right: auto;
        }
        .footer { 
             background-color:blue; 
             color: black; 
             text-align: center; 
             ·font-size: 1vw; 
         } 
         .link {
          color: black; 
         }
      </style>
    </head>
    <body class='cuerpo'>
      <h1 class='titulo' >"PHOTO PLUG"</h1>
      <br><br><br><br>
      <form action='validar_configuracion' method='get' class="formulario">
        <table style='width:100%'>
          <tr>
           <td>SSID:</td>
           <td><input class='input1' name='ssid' type='text' required maxlength='48'><br></td>
          </tr>
          <tr>
            <td>CONTRASEÑA:</td>
            <td><input class='input1' name='contrasenawifi' type='password' required maxlength='48'><br><br></td>
          </tr>
          <tr>
           <td>USUARIO:</td>
           <td><input class='input1' name='usuario' type='text' required maxlength='48'><br></td>
          </tr>
          <tr>
           <td>CONTRASEÑA:</td>
           <td><input class='input1' name='contrasena' type='text' required maxlength='48'><br></td>
          </tr>
          <tr>
           <td>URL SERVIDOR:</td>
           <td><input class='input1' name='url' type='text' required maxlength='48' value = 'http://api-smartplug.herokuapp.com/smartplug/' placeholder='http://api-smartplug.herokuapp.com/smartplug/'><br></td>
          </tr>
        </table>
        <br><br><br>
        <input class='button' type='submit' value='validar'/><br><br>
      </form>
      <footer class='footer'>
          <p>Web para administración remota <a class='link' href='https://web-photoplug.herokuapp.com/'> https://web-photoplug.herokuapp.com/</a></p>
          <br>
         <p>Código fuente del proyecto <a class='link' href='http://github.com/alfredodemiguel/Proyectos/tree/master/photoplug'> http://github.com/alfredodemiguel/Proyectos/tree/master/photoplug</a></p>
      </footer>
    </body>
</html>)rawliteral";


const char pag_operation_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html>
  <head>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <title>"Configuración PhotoPlug"</title>
    <meta charset='UTF-8'>
    <style>
      .titulo {
        float: top;
        font-size:5vw;
        text-align: center;
        color: chartreuse;
      }
      .cuerpo {
        background-color:blue;
        border:1px solid chartreuse;
      }
      .formulario{
        color: chartreuse;
      }
      .input1{
        background-color:blue;
        color: chartreuse;
        font-size: 2vw;
      }
      table, td {
        border-collapse: collapse;
        font-size: 2vw;
      } 
      .button {
        background-color: chartreuse;
        border: none;
        color: black;
        padding: 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 3vw;
        margin: 2px 1px;
        cursor: pointer;
        border-radius: 12px;
        width: 55%;
        display:block;
        margin-left: auto;
        margin-right: auto;
      }
      .footer { 
        background-color:blue;
        color: black; 
        text-align: center; 
        font-size: 1vw; 
      } 
      .link {
        color: black; 
      }
    </style>
  </head>
  <body class='cuerpo'>
    <h1 class='titulo' >'PHOTO PLUG'</h1>
    <br><br><br>
    <form action='validar_operacion' method='get' class="formulario">
      <table style='width:100%'>
        <tr> 
          <td></td> 
          <td>On</td> 
          <td>Off</td> 
        </tr> 
        <tr> 
          <td>ON/OFF:</td> 
          <td><input class='input1' type='radio' id='onoff' name='onoff' value='On' required></td> 
          <td><input class='input1' type='radio' id='onoff' name='onoff' value='Off'></td> 
        </tr> 
         <tr> 
          <td>Photo:</td> 
          <td><input class='input1' type='radio' id='photo' name='photo' value='On' required></td> 
          <td><input class='input1' type='radio' id='photo' name='photo' value='Off'></td> 
        </tr> 
      </table>
      <br><br><br>
      <input class='button' type='submit' value='validar'/><br><br>
    </form>
    <footer class='footer'>
        <p>Web para administración remota <a class='link' href='https://web-photoplug.herokuapp.com/'> https://web-photoplug.herokuapp.com/</a></p>
        <br>
        <p>Código fuente del proyecto <a class='link' href='http://github.com/alfredodemiguel/Proyectos/tree/master/photoplug'> http://github.com/alfredodemiguel/Proyectos/tree/master/photoplug</a></p>
    </footer>
  </body>
</html>)rawliteral";
