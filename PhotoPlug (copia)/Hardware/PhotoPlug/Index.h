const char pag_validacion_html[] PROGMEM = R"rawliteral(
<!DOCTYPE HTML><html>
<html lang='es'>
    <head>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <title>""Configuración SmartPlug""</title>
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
        <h1 class='titulo' >"SMART PLUG"</h1>
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
           <p>Web para administración remota <a class='link' href='https://web-smartplug.herokuapp.com/'> https://web-smartplug.herokuapp.com/</a></p>
           <br>
           <p>Código fuente del proyecto <a class='link' href='http://github.com/alfredodemiguel/Proyectos/tree/master/smartplug'> http://github.com/alfredodemiguel/Proyectos/tree/master/smartplug</a></p>
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
