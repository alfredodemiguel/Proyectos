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



String obtenerDatos (){
      HTTPClient http;
      String urlGet = url + mac;
      http.begin(urlGet);         
      http.addHeader("Content-Type", "application/json"); 
      int codeResponse = http.GET();   
      String bodyResponse = http.getString();
      http.end();  
      Serial.println ("Obtener datos");
      Serial.println (bodyResponse);
      return (bodyResponse);
}

void actualizarDatos () {
    String datos = obtenerDatos();
    String smState = (obtenerState (datos));
    String smGroup = (obtenerGroup (datos));
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
    Serial.println ("antes Post");
    Serial.println (url);
    Serial.println (stringSend);
    int codeRespond = http.POST(stringSend); 
    Serial.println ("codigo operacion");
    Serial.println (codeRespond);
    http.end();  
}
