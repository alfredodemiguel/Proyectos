#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <EEPROM.h>
#include <ESP8266HTTPClient.h>

//-------------------VARIABLES GLOBALES--------------------------
const char* url = "http://192.168.17.44:3017/smartplug/";
int contconexion = 0;
unsigned long previousMillis = 0;

char ssid[50];      
char pass[50];

const char *ssidConf = "";
const char *passConf = "";

String mensaje = "";
String mac;



//-----------CODIGO HTML PAGINA DE CONFIGURACION---------------
String pagina = "<!DOCTYPE html>"
"<html>"
"<head>"
"<title>Configuración SmartPlug</title>"
"<meta charset='UTF-8'>"
"</head>"
"<body>"
"</form>"
"<form action='guardar_conf' method='get'>"
"SSID:<br><br>"
"<input class='input1' name='ssid' type='text'><br>"
"PASSWORD:<br><br>"
"<input class='input1' name='pass' type='password'><br><br>"
"<input class='boton' type='submit' value='GUARDAR'/><br><br>"
"</form>"
"<a href='escanear'><button class='boton'>ESCANEAR</button></a><br><br>";

String paginafin = "</body>"
"</html>";

//------------------------SETUP WIFI-----------------------------
void setup_wifi() {
// Conexión WIFI
  WiFi.mode(WIFI_STA); //para que no inicie el SoftAP en el modo normal
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED and contconexion <150) { //Cuenta hasta 150 si no se puede conectar lo cancela
    ++contconexion;
    delay(250);
    Serial.print(".");
   }
  if (contconexion <50) {   
      Serial.println("");
      Serial.println("WiFi conectado");
      Serial.println(WiFi.localIP());  
  }
  else { 
      Serial.println("");
      Serial.println("Error de conexion");
  }
}

//--------------------------------------------------------------
WiFiClient espClient;
ESP8266WebServer server(80);
//--------------------------------------------------------------

//-------------------PAGINA DE CONFIGURACION--------------------
void paginaconf() {
  server.send(200, "text/html", pagina + mensaje + paginafin); 
}

//--------------------MODO_CONFIGURACION------------------------
void modoconf() {
   
  

  WiFi.softAP(ssidConf, passConf);
  IPAddress myIP = WiFi.softAPIP(); 
  Serial.print("IP del acces point: ");
  Serial.println(myIP);
  Serial.println("WebServer iniciado...");

  server.on("/", paginaconf); //esta es la pagina de configuracion

  server.on("/guardar_conf", guardar_conf); //Graba en la eeprom la configuracion

  server.on("/escanear", escanear); //Escanean las redes wifi disponibles
  
  server.begin();

      
  
}

//---------------------GUARDAR CONFIGURACION-------------------------
void guardar_conf() {
  
  Serial.println(server.arg("ssid"));//Recibimos los valores que envia por GET el formulario web
  grabar(0,server.arg("ssid"));
  Serial.println(server.arg("pass"));
  grabar(50,server.arg("pass"));

  mensaje = "Configuracion Guardada...";
  paginaconf();
}

//----------------Función para grabar en la EEPROM-------------------
void grabar(int addr, String a) {
  int tamano = a.length(); 
  char inchar[50]; 
  a.toCharArray(inchar, tamano+1);
  for (int i = 0; i < tamano; i++) {
    EEPROM.write(addr+i, inchar[i]);
  }
  for (int i = tamano; i < 50; i++) {
    EEPROM.write(addr+i, 255);
  }
  EEPROM.commit();
}

//-----------------Función para leer la EEPROM------------------------
String leer(int addr) {
   byte lectura;
   String strlectura;
   for (int i = addr; i < addr+50; i++) {
      lectura = EEPROM.read(i);
      if (lectura != 255) {
        strlectura += (char)lectura;
      }
   }
   return strlectura;
}

//---------------------------ESCANEAR----------------------------
void escanear() {  
  int n = WiFi.scanNetworks(); //devuelve el número de redes encontradas
  Serial.println("escaneo terminado");
  if (n == 0) { //si no encuentra ninguna red
    Serial.println("no se encontraron redes");
    mensaje = "no se encontraron redes";
  }  
  else
  {
    Serial.print(n);
    Serial.println(" redes encontradas");
    mensaje = "";
    for (int i = 0; i < n; ++i)
    {
      // agrega al STRING "mensaje" la información de las redes encontradas 
      mensaje = (mensaje) + "<p>" + String(i + 1) + ": " + WiFi.SSID(i) + " (" + WiFi.RSSI(i) + ") Ch: " + WiFi.channel(i) + " Enc: " + WiFi.encryptionType(i) + " </p>\r\n";
      //WiFi.encryptionType 5:WEP 2:WPA/PSK 4:WPA2/PSK 7:open network 8:WPA/WPA2/PSK
      delay(10);
    }
    Serial.println(mensaje);
    paginaconf();
  }
}

void actualizarDatos () {
      String datos = obtenerDatos();
      String smState = (obtenerState (datos));
      String smGroup = (obtenerGroup (datos));
      if (smState == "On"){
        digitalWrite(4,HIGH);
      } else {
        digitalWrite(4,LOW);
      }
    
     
     
    HTTPClient http;
    //String stringSent = "\{\"isRoverLive\":\"true\",\"message\":\"" + Message + "\",\"distance\":" + distance + "\}";  
    String stringSend = "\{\"id\": \"" + mac + "\",\"smLive\": \"true\",\"smState\": \"" + smState + "\",\"smGroup\":  \"" + smGroup + "\", \"smTimeStamp\": \"1\"\}";
    http.begin(url);     
    http.addHeader("Content-Type", "application/json"); 
    int codeRespond = http.POST(stringSend);   
    http.end();  
}


String obtenerState (String bodyResponse){
  int startState = bodyResponse.indexOf(':',43);
  int endState = bodyResponse.indexOf('\"',startState+2);
  String smState = bodyResponse.substring(startState+2,endState);
  if (smState == "]" or smState == "") {
    smState = "Off";
  }
  return (smState);
}

String obtenerGroup (String bodyResponse){
  int startGroup = bodyResponse.indexOf(':',54);
  int endGroup = bodyResponse.indexOf('\"',startGroup+2);
  String smGroup = bodyResponse.substring(startGroup+2,endGroup);
  if (smGroup == "]" or smGroup == "") {
    smGroup = "0000";
  }
  return (smGroup);
}


String obtenerDatos (){
      HTTPClient http;
      String urlGet = url + mac;
      http.begin(urlGet);         
      http.addHeader("Content-Type", "application/json"); 
      int codeResponse = http.GET();   
      String bodyResponse = http.getString();
      http.end();  
      Serial.println ("Obtener datos");
      Serial.println(urlGet);
      Serial.println (bodyResponse);
      return (bodyResponse);
}



//------------------------SETUP-----------------------------
void setup() {

 
  
  // Inicia Serial
  Serial.begin(115200);
  Serial.println("");

  EEPROM.begin(512);

  pinMode(4, OUTPUT);  


  leer(0).toCharArray(ssid, 50);
  leer(50).toCharArray(pass, 50);
  Serial.println(WiFi.macAddress());
  mac = WiFi.macAddress();
  setup_wifi();
  modoconf();
}

//--------------------------LOOP--------------------------------
void loop() {
	
    Serial.println(mac);
    
	  server.handleClient();
  	if(WiFi.status()== WL_CONNECTED){   
      actualizarDatos();
  	} else {
      digitalWrite(4,LOW); 
  	}
   delay (10000);
  
}
