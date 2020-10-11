
String getApi (){
  
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
 
  
  String stringSend = "\{\"id\":\"" + id + "\",\"smLive\":\"true\",\"smState\":\"" + smState + "\",\"smGroup\":\"" + smGroup + "\",\"smTimeStamp\":1,\"smProximity\":\"" + smProximity + "\",\"smEmail\":\"" + smEmail + "\",\"smStateEmail\":\"" + smStateEmail + "\",\"smUser\":\"" + smUser + "\",\"smPassword\":\"" + smPassword + "\",\"smInitialConf\":\"" + smInitialConf + "\",\"smPG1\":\"" + smPG1 + "\",\"smPG2\":\"" + smPG2 + "\",\"smPG3\":\"" + smPG3 + "\"\}"; 
  Serial.println (stringSend);
  HTTPClient http;
  http.begin(URLPOST);     
  http.addHeader("Content-Type", "application/json"); 
  int codeRespond = http.POST(stringSend); 
  http.end();  
}
