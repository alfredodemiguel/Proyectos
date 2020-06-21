#include "Arduino.h"
#include "EMailSender.h"
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <EEPROM.h>
#include <ESP8266HTTPClient.h>
#include "Base64.h"

WiFiClient espClient;
WiFiClientSecure client;
ESP8266WebServer server(80);

#include "Config.h" 
#include "Index.h" 
#include "Email.hpp"
#include "Behavior.hpp"
#include "Wifi.hpp"
#include "EEprom_IO.hpp"
#include "Ap_Wifi.hpp"

void _startVariables (){
  id = WiFi.macAddress();
  read(0).toCharArray(ssid, 50);
  read(50).toCharArray(pass, 50);
  smUser = read(100);
  smPassword = read(150);
  smGroup = read(200);
  smEmail = read(250);
  read(300).toCharArray(url, 50);
  smState = "Off";
  smProximity = "Off";
  smStateEmail = "Off";
  smInitialConf = "Off";
  smPG1 = "Off";
  smPG2 = "Off";
  smPG3 = "Off";
  Serial.println (id);
  Serial.println (ssid);
  Serial.println (pass);
  Serial.println (smUser);
  Serial.println (smPassword);
  Serial.println (smGroup);
  Serial.println ("\{\"id\":\"" + id + "\",\"smLive\":\"true\",\"smState\":\"" + smState + "\",\"smGroup\":\"" + smGroup + "\",\"smTimeStamp\":1,\"smProximity\":\"" + smProximity + "\",\"smEmail\":\"" + smEmail + "\",\"smStateEmail\":\"" + smStateEmail + "\",\"smUser\":\"" + smUser + "\",\"smPassword\":\"" + smPassword + "\",\"smInitialConf\":\"" + smInitialConf + "\",\"smPG1\":\"" + smPG1 + "\",\"smPG2\":\"" + smPG2 + "\",\"smPG3\":\"" + smPG3 + "\"\}"); 
}

void setup() {
  Serial.begin(115200);

  pinMode(releSignal, OUTPUT);  
  pinMode(redLed, OUTPUT);
  pinMode(proximitySignalPin, INPUT);
  
  EEPROM.begin(512);
  
  _startVariables ();
  setup_wifi();
  ap_wifi();
  
  apiConnectionCounter = 0;
}

void loop() {
    apiConnectionCounter ++;
	  server.handleClient();
  	if(WiFi.status()== WL_CONNECTED){   
      if (apiConnectionCounter > 900000) {
        postApi();
        getApi ();
        apiConnectionCounter = 0;
      }
  	} else {
      smState = "Off";
  	}
    behavior ();
}
