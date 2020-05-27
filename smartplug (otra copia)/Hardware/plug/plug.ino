#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <EEPROM.h>
#include <ESP8266HTTPClient.h>
#include <base64.h>


// Inicialización del cliente wifi
WiFiClient espClient;
//WiFiClientSecure client;
ESP8266WebServer server(80);


#include "config.h" 
#include "index.h" 
#include "wifi.hpp"
#include "EEprom_IO.hpp"
#include "ap_wifi.hpp"
//#include "email.hpp"

 

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
  leer(0).toCharArray(ssid, 50);
  leer(50).toCharArray(pass, 50);
  leer(100).toCharArray(usuario, 50);
  leer(150).toCharArray(contrasena, 50);
  leer(200).toCharArray(grupo, 50);
  leer(250).toCharArray(email, 50);
  leer(300).toCharArray(url, 50);
  Serial.println(WiFi.macAddress());
  mac = WiFi.macAddress();
  setup_wifi();
  ap_wifi();
}

//--------------------------LOOP--------------------------------
void loop() {
	
    Serial.println(mac);
    
	  server.handleClient();
  	if(WiFi.status()== WL_CONNECTED){   
      actualizarDatos();
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
