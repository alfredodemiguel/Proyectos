void setup_wifi() {
  int contconexion = 0;
  
  WiFi.mode(WIFI_STA); 
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


String _extractDataOfResponseApi (String searchedString, String bodyResponse){
  String extractedData;
  int startPositionData;
  int endPositionData;
  
  startPositionData = (bodyResponse.indexOf(":", (bodyResponse.indexOf(searchedString)))) + 2;
  endPositionData = bodyResponse.indexOf('\"',startPositionData);
  extractedData = bodyResponse.substring(startPositionData,endPositionData);

  if (extractedData == "]") {
    extractedData = "";
  }
  
  return (extractedData);
}

void _setVariables (){
  if ((_extractDataOfResponseApi("smState",bodyResponse)) != ""){
    smState = (_extractDataOfResponseApi("smState",bodyResponse));
  }
  if ((_extractDataOfResponseApi("smGroup",bodyResponse)) != ""){
    smGroup = (_extractDataOfResponseApi("smGroup",bodyResponse));
  }
  if ((_extractDataOfResponseApi("smProximity",bodyResponse)) != ""){
    smProximity = (_extractDataOfResponseApi("smProximity",bodyResponse));
  }
  if ((_extractDataOfResponseApi("smEmail",bodyResponse)) != ""){
    smEmail = (_extractDataOfResponseApi("smEmail",bodyResponse));
  }
  if ((_extractDataOfResponseApi("smStateEmail",bodyResponse)) != ""){
    smStateEmail = (_extractDataOfResponseApi("smStateEmail",bodyResponse));
  }
  if ((_extractDataOfResponseApi("smUser",bodyResponse)) != ""){
    smUser = (_extractDataOfResponseApi("smUser",bodyResponse));
  }
  if ((_extractDataOfResponseApi("smPassword",bodyResponse)) != ""){
    smPassword = (_extractDataOfResponseApi("smPassword",bodyResponse));
  }
  if ((_extractDataOfResponseApi("smInitialConf",bodyResponse)) != ""){
    smInitialConf = (_extractDataOfResponseApi("smInitialConf",bodyResponse));
  }
  if ((_extractDataOfResponseApi("smPG1",bodyResponse)) != ""){
    smPG1 = (_extractDataOfResponseApi("smPG1",bodyResponse));
  }
  if ((_extractDataOfResponseApi("smPG2",bodyResponse)) != ""){
    smPG2 = (_extractDataOfResponseApi("smPG2",bodyResponse));
  }
  if ((_extractDataOfResponseApi("smPG3",bodyResponse)) != ""){
    smPG3 = (_extractDataOfResponseApi("smPG3",bodyResponse));
  }
}


String getApi (){
  String URLGET = url + id;
  
  HTTPClient http;
  http.begin(URLGET);         
  http.addHeader("Content-Type", "application/json"); 
  int codeResponse = http.GET();   
  bodyResponse = http.getString();
  http.end();  

  _setVariables ();
  behavior();

  return (bodyResponse);
}



void postApi () {
  String stringSend = "\{\"id\":\"" + id + "\",\"smLive\":\"true\",\"smState\":\"" + smState + "\",\"smGroup\":\"" + smGroup + "\",\"smTimeStamp\":1,\"smProximity\":\"" + smProximity + "\",\"smEmail\":\"" + smEmail + "\",\"smStateEmail\":\"" + smStateEmail + "\",\"smUser\":\"" + smUser + "\",\"smPassword\":\"" + smPassword + "\",\"smInitialConf\":\"" + smInitialConf + "\",\"smPG1\":\"" + smPG1 + "\",\"smPG2\":\"" + smPG2 + "\",\"smPG3\":\"" + smPG3 + "\"\}"; 
  Serial.println (stringSend);
  HTTPClient http;
  http.begin(url);     
  http.addHeader("Content-Type", "application/json"); 
  int codeRespond = http.POST(stringSend); 
  http.end();  
}
