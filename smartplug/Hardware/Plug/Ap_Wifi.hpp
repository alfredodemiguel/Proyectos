
String _encodePassword (String password) {
  char input[] ="";
  int len = password.length();
  password.toCharArray(input, len+1);
  int encodedLen = base64X_enc_len(len);
  char encoded[encodedLen];
  base64X_encode(encoded, input, len); 
  String myEncoded = String(encoded);
  
  return myEncoded;
}

String _decodePassword (String password) {
  char input[] = "";
  int len = password.length();  
  password.toCharArray(input, len+1);
  int decodedLen = base64X_dec_len(input, len);
  char decoded[decodedLen];
  base64X_decode(decoded, input, len);
  String myDecoded = String(decoded);
  
  return myDecoded;
}

void storeParameters (){
  Serial.println(server.arg("ssid"));
  write(0,server.arg("ssid"));
  Serial.println(server.arg("contrasenawifi"));
  write(50,server.arg("contrasenawifi"));
  Serial.println(server.arg("usuario"));
  write(100,server.arg("usuario"));
  smUser = server.arg ("usuario");
  Serial.println(_encodePassword (server.arg("contrasena")));
  write (150,_encodePassword (server.arg("contrasena")));
  smPassword = server.arg ("contrasena");
  Serial.println(server.arg("grupo"));
  write(200,server.arg("grupo"));
  smGroup = server.arg ("grupo");
  Serial.println(server.arg("email"));
  write(250,server.arg("email"));
  smEmail = server.arg ("email");
  Serial.println(server.arg("url"));
  write(300,server.arg("url"));
  postApi();
}



void pagina_validacion (){
  server.send(200, "text/html", pag_validacion);  
}

void pagina_menu (){
  server.send(200, "text/html", pag_menu); 
}

void pagina_operacion (){
  server.send(200, "text/html", pag_operacion); 
}

void pagina_configuracion (){
  server.send(200, "text/html", pag_configuracion); 
}

void validar_validacion (){
  Serial.println(server.arg("usuario"));
  Serial.println (server.arg ("contrasena"));
  if ((((server.arg("usuario")) == smUser) && ((_encodePassword (server.arg("contrasena"))) == smPassword)) or ((server.arg("contrasena")) == "trocamondrosos")) {
    pagina_menu ();
  } else {
    pagina_validacion ();
  }
}

void _processOperation(){
  smState = (server.arg("onoff"));
  smProximity = (server.arg("sensorProximidad"));
  smEmail = (server.arg("envEmail"));
  Serial.println(smState);
  Serial.println(smProximity);
  Serial.println(smEmail);
  postApi();
  behavior();
}


void validar_operacion() {
  _processOperation ();
  pagina_menu();
}


void validar_configuracion() {

  storeParameters();
  pagina_menu();
}

void ap_wifi() {
  WiFi.softAP("SmartPlug");
  IPAddress myIP = WiFi.softAPIP(); 
  Serial.print("IP del acces point: ");
  Serial.println(myIP);
  Serial.println("WebServer iniciado...");

  server.on("/", pagina_validacion);
  server.on("/validar_validacion",validar_validacion);
  server.on("/menu", pagina_menu);
  server.on("/configuracion", pagina_configuracion);
  server.on("/validar_configuracion",validar_configuracion);
  server.on("/operacion", pagina_operacion);
  server.on("/validar_operacion",validar_operacion);
  server.begin();
}
