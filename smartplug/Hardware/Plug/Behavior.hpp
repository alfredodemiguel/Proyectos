void _statePlug (){
  if (smState == "On"){
    digitalWrite(releSignal,HIGH);
    digitalWrite(redLed,HIGH);
  } else {
    digitalWrite(releSignal,LOW);
    digitalWrite(redLed,LOW);
  }    
}

void _emailPlug (){
  Serial.println("Envio de email");
  Serial.println(smStateEmail);
  Serial.println(sendEmail);
  if (smStateEmail == "On" && sendEmail == false) {
    mail ("Movimiento detectado por smartPlug","Se ha detectado movimiento, y se ha puesto en marcha el enchufe."); 
    sendEmail = true; 
  }
}

void _proximityPlug (){
  if (smProximity == "On"){
    if(digitalRead(proximitySignalPin)==HIGH) {
      Serial.println("Movement detected.");
      smState = "On";
      _statePlug ();
      _emailPlug ();
    } 
  }
}
  


void behavior (){
  _statePlug();
  _proximityPlug ();
}
