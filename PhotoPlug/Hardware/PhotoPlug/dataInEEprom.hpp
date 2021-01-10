void setGlobalVariables (){
   
  (read(0).toCharArray(ssid, 50));
  (read(50).toCharArray(ssidPassword, 50));
  user = (read(100));
  userPassword = (read(150));
  url = (read(200));
  
  Serial.println ("Initial Set Global Variables");
  Serial.println (ssid); 
  Serial.println (ssidPassword); 
  Serial.println (user);
  Serial.println (userPassword);
  Serial.println (url);
 
}


void initialWriteDataInEEprom(){  

  write(0,"Coloso");
  String ssidPasswordTemp = "31082004";
  write(50,"A31082004");
  user = "Admin";
  write(100,user);
  userPassword = "1234";
  write (150,userPassword);
  url = "http://192.168.17.2:3017/smartplug/";
  write(200,url);
}

void WriteDataInEEprom(){  

  String ssidTemp (ssid);
  String ssidPasswordTemp (ssidPassword);

  write(0,ssidTemp);  
  write(50,ssidPasswordTemp);
  write(100,user);
  write (150,userPassword);
  write(200,url);
  Serial.println ("Set Global Variables");
  Serial.println (ssid); 
  Serial.println (ssidPassword); 
  Serial.println (user);
  Serial.println (userPassword);
  Serial.println (url);
}
