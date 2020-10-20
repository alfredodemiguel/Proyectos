String _extractDataOfFileSpiffs (String searchedString, String dataTxt){
  String extractedData;
  int startPositionData;
  int endPositionData;
 
  startPositionData = (dataTxt.indexOf(":", (dataTxt.indexOf(searchedString)))) + 1;
  endPositionData = dataTxt.indexOf(",",startPositionData);
  extractedData = dataTxt.substring(startPositionData,endPositionData);
 


  return (extractedData);
}





void writeDataInSpiffs(){  
  if(!SPIFFS.begin(true)){
        Serial.println("An Error has occurred while mounting SPIFFS");
        return;
   }
 
    File file = SPIFFS.open("/data.txt", FILE_WRITE);
 
    if(!file){
        Serial.println("There was an error opening the file for writing");
        return;
    }
 
    if(file.print("ssid:Coloso,ssidPassword:31082004,user:Admin,userPassword:1234,url:http://192.168.17.2:3017/smartplug/,ssidInternal:PhotoPlug,ssidInternalPassword:,")){
        Serial.println("File was written");;
    } else {
        Serial.println("File write failed");
    }
 
    file.close();
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
    (_extractDataOfFileSpiffs("ssidInternal",_readDataInSpiffs())).toCharArray (ssidInternal,30);
    (_extractDataOfFileSpiffs("ssidInternalPassword",_readDataInSpiffs())).toCharArray (ssidInternalPassword,30);
    Serial.println ("SetGlobalVariables");
    Serial.println (ssid); 
    Serial.println (ssidPassword); 
    Serial.println (user);
    Serial.println (userPassword);
    Serial.println (url);
    Serial.println (ssidInternal);
    Serial.println (ssidInternalPassword);
}
