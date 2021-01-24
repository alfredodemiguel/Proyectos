char ssid[50];      
char pass[50];
char url[50];

String id;
String smLive;
String smState;
String smGroup;
String smTimeStamp;
String smProximity;
String smEmail;
String smStateEmail;
String smUser;
String smPassword;
String smInitialConf;
String smPG1, smPG2, smPG3;

String bodyResponse;
int apiConnectionCounter;
boolean sendEmail = false;

EMailSender emailSend("remotosovasa@gmail.com", "password");

const int proximitySignalPin = 14;
const int redLed = 13;
const int releSignal = 4;
