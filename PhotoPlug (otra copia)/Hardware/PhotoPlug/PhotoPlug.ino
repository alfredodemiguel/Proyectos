#include <WiFi.h>
#include <HTTPClient.h>
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
#include "apiComunication.hpp"
#include "base64.h"
#include "capturePhoto.hpp"
#include "dataInSpiffs.hpp"


AsyncWebServer server(80);


void setup() {
  //Others
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0); //disable brownout detector
  Serial.begin(115200);

  writeDataInSpiffs();
  setGlobalVariables();
  
  //Wifi and AP
 
 Serial.println ("Salto linea"); 
 WiFi.begin(ssid,ssidPassword);
 while (WiFi.status() != WL_CONNECTED) {
   delay(1000);
   Serial.println("Connecting to WiFi...");
 }

  Serial.print("IP Address: http://");
  Serial.println(WiFi.localIP());

  
  WiFi.softAP(ssidInternal,ssidInternalPassword);
  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(IP);


// Route for root / web page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send_P(200, "text/html", pag_validacion_html);
    //request->send_P(200, "text/html", "Hola Cocacola!!!!");
  });

  server.on("/get", HTTP_GET, [] (AsyncWebServerRequest *request) {
  // GET email_input value on <ESP_IP>/get?email_input=<inputMessage>
  //http://192.168.17.47/get?usuario=alfredo&contrasena=122
    if (request->hasParam("usuario")) {
        inputUsuario = request->getParam("usuario")->value();
      }
    else {
        inputUsuario = "No message sent";
    }
    Serial.println("el inputusuario:");
    Serial.println(inputUsuario);
    //validar_validacion();
  });
  server.begin();


  // Check SPIFFS
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
    //config.frame_size = FRAMESIZE_UXGA;
    config.frame_size = FRAMESIZE_QVGA; 
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


  // Init LedPin
   pinMode(ledPin , OUTPUT);


}

void loop() {
   getApi();
   photoTosmPG3 ();
   postApi(); 
   
   digitalWrite(ledPin , HIGH);   // poner el Pin en HIGH
   Serial.printf("El pin esta encendido");
   delay(15000);                   // esperar 4 segundos
   digitalWrite(ledPin , LOW);    // poner el Pin en LOW
   Serial.printf("El pin esta apagado");
   delay (15000); 
}
