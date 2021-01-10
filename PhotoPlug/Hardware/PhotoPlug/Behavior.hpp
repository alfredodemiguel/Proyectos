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
  // Se han realizado cambios en el PP.
  if (datoCambiadoPP == true){
      smState = onoffHtml;
      if (photoHtml = "On"){
        smPG2 = "True";
      } else{
        smPG2 = "False";
      }
      activarPost = true;
      datoCambiadoPP = false;
  }

  // Se han realizado cambios en PP o Web
  if (smState == "On"){
      digitalWrite(PlugPin , HIGH);   // poner el Pin en HIGH
      Serial.printf("El pin esta encendido");
  } else {
      digitalWrite(PlugPin , LOW);    // poner el Pin en LOW
      Serial.printf("El pin esta apagado");
  }

  if (smPG2 == "True"){
    digitalWrite(LedPin , HIGH);
    delay (1000);
    photoTosmPG3 ();
    smPG2 = "False";
    photoHtml = "Off";
    delay (1000);
    digitalWrite(LedPin , LOW);
    activarPost = true;
  }
    // setGlobalVariablesWeb ();
  }
