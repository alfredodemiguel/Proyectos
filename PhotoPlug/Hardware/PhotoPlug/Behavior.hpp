void setGlobalVariablesWeb (){
  Serial.printf("Setglobalvariablesweb");
  smLive = "true";
  
  smUser = user;
  smPassword = userPassword;
  Serial.println("user:" + user);
  Serial.println("smUser:" + smUser);
  Serial.println("userPassword:" + userPassword);
  Serial.println("smPassword:" + smPassword);
}



void checkBehavior (){
  if (smState == "On" || onoffHtml == "On"){
      digitalWrite(ledPin , HIGH);   // poner el Pin en HIGH
      Serial.printf("El pin esta encendido");
  } else {
      digitalWrite(ledPin , LOW);    // poner el Pin en LOW
      Serial.printf("El pin esta apagado");
  }

  if (smPG2 == "true" || photoHtml == "On"){
    photoTosmPG3 ();
    smPG2 = "false";
    photoHtml = "Off";
    setGlobalVariablesWeb ();
  }
}
