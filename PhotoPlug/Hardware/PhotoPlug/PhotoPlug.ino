#include <WiFi.h>
#include <HTTPClient.h>
#include <EEPROM.h>
#include "base64.h"
#include "Index.h"
#include "Arduino.h"
#include "Config.h" 
#include <SPIFFS.h>
#include "soc/soc.h"           // Disable brownout problems
#include "soc/rtc_cntl_reg.h"  // Disable brownout problems
#include "driver/rtc_io.h"
#include <ESPAsyncWebServer.h>
#include "esp_camera.h"
#include "SPI.h"
#include <FS.h>
#include "EEprom_IO.hpp"
#include "apiComunication.hpp"
#include "capturePhoto.hpp"
#include "dataInEEprom.hpp"
#include "Behavior.hpp"



AsyncWebServer server(80);


void setup() {
  
  //Others
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0); //disable brownout detector
  Serial.begin(115200);
  EEPROM.begin(250);
  //initialWriteDataInEEprom();
  setGlobalVariables();
  WriteDataInEEprom ();
  
  //Wifi and AP
 
 Serial.println ("Salto linea"); 
 
 WiFi.softAP("PhotoPlug","");
 IPAddress IP = WiFi.softAPIP();
 Serial.print("AP IP address: ");
 Serial.println(IP);

 int IntentosConexionWifi = 0; 
 WiFi.begin(ssid,ssidPassword);
 while ((WiFi.status() != WL_CONNECTED) && (IntentosConexionWifi < 30)) {
   delay(1000);
   IntentosConexionWifi ++;
   Serial.println("Connecting to WiFi..." + IntentosConexionWifi);
 }

  Serial.print("IP Address: http://");
  Serial.println(WiFi.localIP());

  


// Route for root / web page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send_P(200, "text/html", pag_validacion_html);
    //request->send_P(200, "text/html", "Hola Cocacola!!!!");
  });

  server.on("/operacion", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send_P(200, "text/html", pag_operation_html);
  });
  
  server.on("/configuracion", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send_P(200, "text/html", pag_configuration_html);
  });
  
  //http://192.168.17.47/get?usuario=alfredo&contrasena=122  
  server.on("/get", HTTP_GET, [] (AsyncWebServerRequest *request) {
    if (request->hasParam("usuario")) {
        userHtml = request->getParam("usuario")->value();
    }
    if (request->hasParam("contrasena")) {
        userPasswordHtml = request->getParam("contrasena")->value();
    }
    Serial.println("el userHtml:");
    Serial.println(userHtml);
    Serial.println("el userPasswordHtml:");
    Serial.println(userPasswordHtml);
    if (userHtml == user && userPasswordHtml == userPassword){
       request->send_P(200, "text/html", pag_menu_html);
    } else {
      request->send_P(200, "text/html", pag_validacion_html);
    }
  });

  //http://192.168.17.47/validar_operacion?onoff=On&sensorProximidad=On&envEmail=Off
  server.on("/validar_operacion", HTTP_GET, [] (AsyncWebServerRequest *request) {
    if (request->hasParam("onoff")) {
        onoffHtml = request->getParam("onoff")->value();
    }
    if (request->hasParam("photo")) {
        photoHtml = request->getParam("photo")->value();
    }
 
    Serial.println("onoff:");
    Serial.println(onoffHtml);
    Serial.println("photo:");
    Serial.println(photoHtml);
    datoCambiadoPP = true;
    request->send_P(200, "text/html", pag_menu_html);  
  });
  
  //http://192.168.1.33/validar_configuracion?ssid=kjjhg&contrasenawifi=lkjkj&usuario=alfredo&contrasena=1234&grupo=grupo1
  server.on("/validar_configuracion", HTTP_GET, [] (AsyncWebServerRequest *request) {
    if (request->hasParam("ssid")) {
        ssidHtml = request->getParam("ssid")->value();
    }
    if (request->hasParam("contrasenawifi")) {
        ssidPasswordHtml = request->getParam("contrasenawifi")->value();
    }
    if (request->hasParam("usuario")) {
        userHtml = request->getParam("usuario")->value();
    }
    if (request->hasParam("contrasena")) {
        userPasswordHtml = request->getParam("contrasena")->value();
    }
    if (request->hasParam("url")) {
        urlHtml = request->getParam("url")->value();
    }
       
    ssidHtml.toCharArray(ssid, 50);
    ssidPasswordHtml.toCharArray(ssidPassword, 50);
    user = userHtml;
    userPassword = userPasswordHtml;
    url = urlHtml;
    WriteDataInEEprom ();

    datoCambiadoPP = true;
    setGlobalVariablesWeb ();
    
    request->send_P(200, "text/html", pag_menu_html);  
  });

  server.begin();


  // Check SPIFFS
  SPIFFS.begin(true);
  if (!SPIFFS.begin(true)) {
    Serial.println("An Error has occurred while mounting SPIFFS");
    ESP.restart();
  }
  else {
    delay(500);
    Serial.println("SPIFFS mounted successfully");
  }

  // Init Camera 
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  
  if(psramFound()){
    config.frame_size = FRAMESIZE_CIF;
    //config.frame_size = FRAMESIZE_QVGA; 
    config.jpeg_quality = 10;
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }

  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }


  // Init PlugPin
   pinMode(PlugPin , OUTPUT);
   pinMode(LedPin , OUTPUT);

   postApi(); 

}

void loop() {
   if (activarPost == true) {
    postApi(); 
    activarPost = false;
   }
   getApi();
   postApi();
   
   checkBehavior ();
   delay (15000);  
}
