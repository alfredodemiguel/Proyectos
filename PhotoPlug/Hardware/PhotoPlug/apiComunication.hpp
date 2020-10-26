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
}


String getApi (){
  String urlGet = url + mac;
  HTTPClient http;
  Serial.print ("URLGET:");
  Serial.println (urlGet);
  http.begin(urlGet);         
  http.addHeader("Content-Type", "application/json"); 
  int codeResponse = http.GET(); 
  Serial.print ("codeResponse:");
  Serial.println (codeResponse);  
  bodyResponse = http.getString();
  Serial.print ("BodyResponse:");
  Serial.println (bodyResponse);
  http.end();  
 
  _setVariables ();
  return (bodyResponse);
}



void postApi () {
 
  String UrlPost = url + mac;
  Serial.println("Url:" + url);
  smUser = user;
  smPassword = (base64::encode(userPassword));
  Serial.println("postapi");
  Serial.println("user:" + user);
  Serial.println("smUser:" + smUser);
  Serial.println("userPassword:" + userPassword);
  Serial.println("smPassword:" + smPassword);


  Serial.println ("Cadena post:");
  String stringSend = "\{\"id\":\"" + id + "\",\"smLive\":\"true\",\"smState\":\"" + smState + "\",\"smGroup\":\"" + smGroup + "\",\"smTimeStamp\":1,\"smProximity\":\"" + smProximity + "\",\"smEmail\":\"" + smEmail + "\",\"smStateEmail\":\"" + smStateEmail + "\",\"smUser\":\"" + smUser + "\",\"smPassword\":\"" + smPassword + "\",\"smInitialConf\":\"" + smInitialConf + "\",\"smPG1\":\"" + smPG1 + "\",\"smPG2\":\"" + smPG2 + "\",\"smPG3\":\"" + smPG3 + "\"\}"; 
  Serial.println (stringSend);
  
  HTTPClient http;
  http.begin(url);     
  http.addHeader("Content-Type", "application/json"); 
  int codeRespond = http.POST(stringSend); 
  http.end();  
  delay (5000);  
}
