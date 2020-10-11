// REPLACE WITH YOUR NETWORK CREDENTIALS
const char* ssid = "Coloso";
const char* password = "31082004";
//const char* ssid = "hackerspace_socios";
//const char* password = "Siemprelanzacohetes$";
String mac = WiFi.macAddress();
String URLGET = "http://192.168.17.2:3017/smartplug/" + mac;
String URLPOST = "http://192.168.17.2:3017/smartplug/";

int apiConnectionCounter = 0;
String bodyResponse;
//String myEncoded = "";
const int ledPIN = 12;

  String id = mac;
  String smLive = "false";
  String smState = "Off";
  String smGroup = "0000";
  int smTimeStamp = 1595756802190;
  String smProximity = "true";
  String smEmail = "usuario01@yahoo.es";
  String smStateEmail = "true";
  String smUser = "usuario01";
  String smPassword = "MTIzNA==";
  String smInitialConf = "advertisement";
  String smPG1 = "nul";
  String smPG2 = "nul";
  String smPG3 = "nul";




// PINs CAMERA
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22




// Photo File Name to save in SPIFFS
#define FILE_PHOTO "/photo.jpg"
