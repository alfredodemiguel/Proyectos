void writeConfigurationInFile (){
  
  
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
    ssidHtml = ssid;
    ssidPasswordHtml = ssidPassword;
   
    //if(file.print("ssid:Coloso,ssidPassword:31082004,user:Admin,userPassword:1234,url:http://192.168.17.2:3017/smartplug/,ssidInternal:PhotoPlug,ssidInternalPassword:,")){
    if(file.print("ssid:" + ssidHtml + ",ssidPassword:" + ssidPasswordHtml +",user:" + user + ",userPassword:" + userPassword + ",url:" + url + ",ssidInternal:" + ssidInternalHtml + ",ssidInternalPassword:" + " ,")){      
        Serial.println("File was written");;
    } else {
        Serial.println("File write failed");
    }
 
    file.close();
}


void initialWriteDataInSpiffs(){  
  if(!SPIFFS.begin(true)){
        Serial.println("An Error has occurred while mounting SPIFFS");
        return;
   }
 
    File file = SPIFFS.open("/data.txt", FILE_WRITE);
 
    if(!file){
        Serial.println("There was an error opening the file for writing");
        return;
    }
    ssidHtml = ssid;
    ssidPasswordHtml = ssidPassword;
   
    if(file.print("ssid:Coloso,ssidPassword:31082004,user:Admin,userPassword:1234,url:http://192.168.17.2:3017/smartplug/,ssidInternal:PhotoPlug,ssidInternalPassword:,")){
    //if(file.print("ssid:" + ssidHtml + ",ssidPassword:" + ssidPasswordHtml +",user:" + user + ",userPassword:" + userPassword + ",url:" + url + ",ssidInternal:" + ssidInternalHtml + ",ssidInternalPassword:" + " ,")){      
        Serial.println("File was written");;
    } else {
        Serial.println("File write failed");
    }
 
    file.close();
}
