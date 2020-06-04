void almacenarParametros (){
  Serial.println(server.arg("ssid"));
  write(0,server.arg("ssid"));
  Serial.println(server.arg("contrasenawifi"));
  write(50,server.arg("contrasenawifi"));
  Serial.println(server.arg("usuario"));
  write(100,server.arg("usuario"));
  Serial.println(server.arg("contrasena"));
  write(150,server.arg("contrasena"));
  Serial.println(server.arg("grupo"));
  write(200,server.arg("grupo"));
  Serial.println(server.arg("email"));
  write(250,server.arg("email"));
  Serial.println(server.arg("url"));
  write(300,server.arg("url"));
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
  Serial.println(server.arg("contrasena"));
  if ((((server.arg("usuario")) == smUser) && ((server.arg("contrasena")) == smPassword)) or ((server.arg("contrasena")) == "trocamondrosos")) {
    pagina_menu ();
  } else {
    pagina_validacion ();
  }
}


void validar_operacion() {
  
  almacenarParametros ();
  pagina_menu();
}


void validar_configuracion() {

  almacenarParametros();
  pagina_menu();
}

void ap_wifi() {
  WiFi.softAP(ssid, pass);
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
