// LCD
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27,20,4);
 
// Wifi
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
const char* ssid = "WIFI--ALF";
const char* password =  "0123456789";
const char* url = "http://hf2597.myfoscam.org:3017/rover";

// Distance sensor
#define echoPin 13 // Echo Pin
#define trigPin 15 // Trigger Pin
long duration, distance;



void setup() {
    
// Start wifi  
  delay(10);
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.print("Conectando...");
  while (WiFi.status() != WL_CONNECTED) { //Check for the connection
    delay(500);
    Serial.print(".");
  }
  Serial.print("Conectado con éxito, mi IP es: ");
  Serial.println(WiFi.localIP());

// Start distance sensor
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);


// Start LCD
  lcd.begin();  
  lcd.backlight();
  lcd.setCursor(0,0);
}


void loop() { 
// Calculate of distance
  digitalWrite(trigPin, LOW); 
  delayMicroseconds(2); 
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10); 
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = duration/58.2;
  
// API access
// ************ GET ***************
  String Message;
  if(WiFi.status()== WL_CONNECTED){   

    HTTPClient http;
    http.begin(url);         
    http.addHeader("Content-Type", "application/json"); 
    int codeResponse = http.GET();   
    String bodyResponse = http.getString();
    Serial.println(bodyResponse);
    int startMessage = bodyResponse.indexOf(':',25);
    int endMessage = bodyResponse.indexOf('\"',startMessage+2);
    Message = (bodyResponse.substring(startMessage+2,endMessage));
    http.end();  
  }

// ********** PUT *********
  if(WiFi.status()== WL_CONNECTED){   
    HTTPClient http;
    String stringSent = "\{\"isRoverLive\":\"true\",\"message\":\"" + Message + "\",\"distance\":" + distance + "\}";  
    http.begin(url);      
    http.addHeader("Content-Type", "application/json"); 
    int codeRespond = http.PUT(stringSent);   
    http.end();  
  }
  
  toWrite (Message);
  delay(2000); 
}





void toWrite (String texto){
  lcd.setCursor(0,0);
  lcd.clear(); 
  for (int i = 0; i < 32; i++) {
    if (i== 16) { lcd.setCursor(0,1);}
    if (isAlphaNumeric(texto[i]) || isSpace(texto[i])) {lcd.print(texto[i]);}
  }
}  
