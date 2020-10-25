String _extractDataOfFileSpiffs (String searchedString, String dataTxt){
  String extractedData;
  int startPositionData;
  int endPositionData;
 
  startPositionData = (dataTxt.indexOf(":", (dataTxt.indexOf(searchedString)))) + 1;
  endPositionData = dataTxt.indexOf(",",startPositionData);
  extractedData = dataTxt.substring(startPositionData,endPositionData);
 


  return (extractedData);
}








String _readDataInSpiffs(){
    String chunckData = "";
     
    File file = SPIFFS.open("/data.txt");
    if(!file){
        Serial.println("Failed to open file for reading");
    }
 
    while(file.available()){
        chunckData = chunckData + char(file.read());
    }
    file.close();
    return (chunckData);
}



void setGlobalVariables (){
    (_extractDataOfFileSpiffs("ssid",_readDataInSpiffs())).toCharArray (ssid,30);
    (_extractDataOfFileSpiffs("ssidPassword",_readDataInSpiffs())).toCharArray (ssidPassword,30);
    user = (_extractDataOfFileSpiffs("user",_readDataInSpiffs()));
    userPassword = (_extractDataOfFileSpiffs("userPassword",_readDataInSpiffs()));
    url = (_extractDataOfFileSpiffs("url",_readDataInSpiffs()));
    Serial.println ("SetGlobalVariables");
    Serial.println (ssid); 
    Serial.println (ssidPassword); 
    Serial.println (user);
    Serial.println (userPassword);
    Serial.println (url);

}
