void setup_wifi() {
  int contconexion = 0;
  
  WiFi.mode(WIFI_STA); //para que no inicie el SoftAP en el modo normal
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED and contconexion <150) {
    ++contconexion;
    delay(250);
    Serial.print(".");
   }
  if (contconexion <148) {   
      Serial.println("");
      Serial.println("WiFi conectado");
      Serial.println(WiFi.localIP());  
  }
  else { 
      Serial.println("");
      Serial.println("Error de conexion");
  }
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


String obtenerProximity (String bodyResponse){
  int startProximity = bodyResponse.indexOf(':',110);
  int endProximity = bodyResponse.indexOf('\"',startProximity+2);
  String smProximity = bodyResponse.substring(startProximity+2,endProximity);
  if (smProximity == "]" or smProximity == "") {
    smProximity = "0000";
  }
  return (smProximity);
}




String obtenerDatos (){
      Serial.println ("INICIO --- Obtener datos");
      HTTPClient http;
      String urlGet = url + mac;
      Serial.println ("Urlget:" + urlGet);
      http.begin(urlGet);         
      http.addHeader("Content-Type", "application/json"); 
      int codeResponse = http.GET();   
      Serial.println (codeResponse);
      String bodyResponse = http.getString();
      Serial.println ("bodyResponse:" + bodyResponse);
      delay (10000);
      http.end();  
      Serial.println ("FIN --- Obtener datos");
      return (bodyResponse);
}

void actualizarDatos () {
    String datos = obtenerDatos();
    String smState = (obtenerState (datos));
    String smGroup = (obtenerGroup (datos));
    String smProximity = (obtenerProximity (datos));
    Serial.println ("INICIO --- Extracción datos");
    Serial.println ("Datos: " + datos);
    Serial.println (smState);
    Serial.println ("smGroup:" + smGroup);
    Serial.println ("smProximity:" + smProximity);
    Serial.println ("FIN --- Extracción datos");


    
    if (smState == "On"){
      digitalWrite(4,HIGH);
      digitalWrite(13,HIGH);
    } else {
      digitalWrite(4,LOW);
      digitalWrite(13,LOW);
    }    
     
    HTTPClient http;
    //id,smLive,smState,smGroup,smTimeStamp,smProximity,smEmail,smStateEmail,smUser,smPassword,smInitialConf,smPG1,smPG2,smPG3
    String stringSend = "\{\"id\":\"" + mac + "\",\"smLive\":\"true\",\"smState\":\"" + smState + "\",\"smGroup\":\"" + smGroup + "\",\"smTimeStamp\":1,\"smProximity\":\"On\",\"smEmail\":\"alfredodemiguel\@yahoo.es\",\"smStateEmail\":\"On\",\"smUser\":\"user01\",\"smPassword\":\"password\",\"smInitialConf\":\"On\",\"smPG1\":\"pg1\",\"smPG2\":\"pg2\",\"smPG3\":\"pg3\"\}";
    http.begin(url);     
    http.addHeader("Content-Type", "application/json"); 
    Serial.println ("INICIO ---- Post");
    Serial.println (url);
    Serial.println (stringSend);
    int codeRespond = http.POST(stringSend); 
    Serial.println ("codigo operacion");
    Serial.println (codeRespond);
    Serial.println ("FIN ---- Post");
    http.end();  
}
