#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <EEPROM.h>
#include <ESP8266HTTPClient.h>
//#include <base64.h>
#include <stdio.h>
#include <string.h>

#include "Base64.h"


//extern "C" {
//#include "crypto/base64.h"
//}




// Inicialización del cliente wifi
WiFiClient espClient;
WiFiClientSecure client;
ESP8266WebServer server(80);


#include "config.h" 
#include "index.h" 
#include "wifi.hpp"
#include "EEprom_IO.hpp"
#include "ap_wifi.hpp"
#include "email.hpp"

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
}

//------------------------SETUP-----------------------------
void setup() {

 
  
   // Inicia Serial
  Serial.begin(115200);
  Serial.println("");

  // Pin Rele
  pinMode(4, OUTPUT);  
  // Pin Led Rele
  pinMode (13, OUTPUT);
  
  //Inicia acceso flash y carga valores del mismo.
  EEPROM.begin(512);
  
  _startVariables ();
  setup_wifi();
  ap_wifi();
  Serial.println ("inicio Codificacion");
  _encodePassword ("Hola");
  _decodePassword ("SG9sYQ==");

  Serial.println ("Fin Codificacion");
  //sendEmail();
}

//--------------------------LOOP--------------------------------
void loop() {
	
    Serial.println(id);
    
	  server.handleClient();
  	if(WiFi.status()== WL_CONNECTED){   
      getApi ();
      postApi();
  	} else {
      digitalWrite(4,LOW); 
  	}
   movimiento = digitalRead(14);
   if (movimiento == LOW)
    {
      Serial.println("No motion");
    }
    else
    {
      Serial.println("Motion detected  ALARM");
    }
  delay (10000);
  
}
