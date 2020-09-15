//void _startVariables (){
//  id = "11:12:a2";
//  ssid = "kjhkh";
//  pass = "fuyt";
//  smUser = "userr1";
//  smPassword = "huyt");
//  smGroup = "Grupo1";
//  smEmail = "yutfu@df.es";
//  url = "ytuy";
//  smState = "Off";
//  smProximity = "Off";
//  smStateEmail = "Off";
//  smInitialConf = "Off";
//  smPG1 = "Off";
//  smPG2 = "Off";
//  smPG3 = "Off";
//  
//  Serial.println ("\{\"id\":\"" + id + "\",\"smLive\":\"true\",\"smState\":\"" + smState + "\",\"smGroup\":\"" + smGroup + "\",\"smTimeStamp\":1,\"smProximity\":\"" + smProximity + "\",\"smEmail\":\"" + smEmail + "\",\"smStateEmail\":\"" + smStateEmail + "\",\"smUser\":\"" + smUser + "\",\"smPassword\":\"" + smPassword + "\",\"smInitialConf\":\"" + smInitialConf + "\",\"smPG1\":\"" + smPG1 + "\",\"smPG2\":\"" + smPG2 + "\",\"smPG3\":\"" + smPG3 + "\"\}"); 
//}


//String _extractDataOfResponseApi (String searchedString, String bodyResponse){
//  String extractedData;
//  int startPositionData;
//  int endPositionData;
//  
//  startPositionData = (bodyResponse.indexOf(":", (bodyResponse.indexOf(searchedString)))) + 2;
//  endPositionData = bodyResponse.indexOf('\"',startPositionData);
//  extractedData = bodyResponse.substring(startPositionData,endPositionData);
//
//  if (extractedData == "]") {
//    extractedData = "";
//  }
//  
//  return (extractedData);
//}
//
//void _setVariables (){
//  if ((_extractDataOfResponseApi("smState",bodyResponse)) != ""){
//    smState = (_extractDataOfResponseApi("smState",bodyResponse));
//  }
//  if ((_extractDataOfResponseApi("smGroup",bodyResponse)) != ""){
//    smGroup = (_extractDataOfResponseApi("smGroup",bodyResponse));
//  }
//  if ((_extractDataOfResponseApi("smProximity",bodyResponse)) != ""){
//    smProximity = (_extractDataOfResponseApi("smProximity",bodyResponse));
//  }
//  if ((_extractDataOfResponseApi("smEmail",bodyResponse)) != ""){
//    smEmail = (_extractDataOfResponseApi("smEmail",bodyResponse));
//  }
//  if ((_extractDataOfResponseApi("smStateEmail",bodyResponse)) != ""){
//    smStateEmail = (_extractDataOfResponseApi("smStateEmail",bodyResponse));
//  }
//  if ((_extractDataOfResponseApi("smUser",bodyResponse)) != ""){
//    smUser = (_extractDataOfResponseApi("smUser",bodyResponse));
//  }
//  if ((_extractDataOfResponseApi("smPassword",bodyResponse)) != ""){
//    smPassword = (_extractDataOfResponseApi("smPassword",bodyResponse));
//  }
//  if ((_extractDataOfResponseApi("smInitialConf",bodyResponse)) != ""){
//    smInitialConf = (_extractDataOfResponseApi("smInitialConf",bodyResponse));
//  }
//  if ((_extractDataOfResponseApi("smPG1",bodyResponse)) != ""){
//    smPG1 = (_extractDataOfResponseApi("smPG1",bodyResponse));
//  }
//  if ((_extractDataOfResponseApi("smPG2",bodyResponse)) != ""){
//    smPG2 = (_extractDataOfResponseApi("smPG2",bodyResponse));
//  }
//  if ((_extractDataOfResponseApi("smPG3",bodyResponse)) != ""){
//    smPG3 = (_extractDataOfResponseApi("smPG3",bodyResponse));
//  }
//}


String getApi (){
  String URLGET = "http://192.168.17.2:3017/smartplug/50:02:91:48:1C:12";
  
  HTTPClient http;
  Serial.print ("URLGET:");
  Serial.println (URLGET);
  http.begin(URLGET);         
  http.addHeader("Content-Type", "application/json"); 
  int codeResponse = http.GET(); 
  Serial.print ("codeResponse:");
  Serial.println (codeResponse);  
  bodyResponse = http.getString();
  Serial.print ("BodyResponse:");
  Serial.println (bodyResponse);
  http.end();  

 

  return (bodyResponse);
}



void postApi () {
  String URLPOST = "http://192.168.17.2:3017/smartplug/";
  String id = "50:02:91:48:1C:FF";
  String smLive = "false";
  String smState = "Off";
  String smGroup = "0000";
  int smTimeStamp = 1595756802190;
  String smProximity = "true";
  String smEmail = "usuario01@yahoo.es";
  String smStateEmail = "true";
  String smUser = "usuario01";
  String smPassword = "MTIzNA==";
  String smInitialConf = "advertisement";
  String smPG1 = "nul";
  String smPG2 = "nul";
  String smPG3 = "";




  
  
  String stringSend = "\{\"id\":\"" + id + "\",\"smLive\":\"true\",\"smState\":\"" + smState + "\",\"smGroup\":\"" + smGroup + "\",\"smTimeStamp\":1,\"smProximity\":\"" + smProximity + "\",\"smEmail\":\"" + smEmail + "\",\"smStateEmail\":\"" + smStateEmail + "\",\"smUser\":\"" + smUser + "\",\"smPassword\":\"" + smPassword + "\",\"smInitialConf\":\"" + smInitialConf + "\",\"smPG1\":\"" + smPG1 + "\",\"smPG2\":\"" + smPG2 + "\",\"smPG3\":\"" + smPG3 + "\"\}"; 
  Serial.println (stringSend);
  HTTPClient http;
  http.begin(URLPOST);     
  http.addHeader("Content-Type", "application/json"); 
  int codeRespond = http.POST(stringSend); 
  http.end();  
}
