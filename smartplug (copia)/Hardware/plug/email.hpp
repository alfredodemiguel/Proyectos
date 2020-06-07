/*
 * En este videos se explica lo que hay que hacer, pero basicamente es poner la version 2.4.2 esp8266 en el gestor de tarjetas 
 * https://youtu.be/s913_7JXq4w
*/


// Check response from SMTP server
int response()
{
  // Wait for a response for up to X seconds
  int loopCount = 0;
  while (!client.available()) {
    delay(1);
    loopCount++;
    // if nothing received for 10 seconds, timeout
    if (loopCount > 10000) {
      client.stop();
      Serial.println(F("\r\nTimeout"));
      return 0;
    }
  }

  // Take a snapshot of the response code
  byte respCode = client.peek();
  while (client.available())
  {
    Serial.write(client.read());
  }

  if (respCode >= '4')
  {
    Serial.print("Failed in eRcv with response: ");
    Serial.print(respCode);
    return 0;
  }
  return 1;
}




// Function send a secure email via Gmail
int sendEmail()
{
 
  Serial.println("Attempting to connect to GMAIL server");
  if (client.connect(_GMailServer, 465) == 1) {
    Serial.println(F("Connected"));
  } else {
    Serial.print(F("Connection failed:"));
    return 0;
  }
  if (!response())
    return 0;

  Serial.println(F("Sending Extended Hello"));
  client.println("EHLO gmail.com");
  if (!response())
    return 0;

  Serial.println(F("Sending auth login"));
  client.println("auth login");
  if (!response())
    return 0;

  Serial.println(F("Sending User"));
  // Change to your base64, ASCII encoded user
  client.println(base64::encode(_mailUser));
  if (!response())
    return 0;

  Serial.println(F("Sending Password"));
  // change to your base64, ASCII encoded password
  client.println(base64::encode(_mailPassword));
  if (!response())
    return 0;

  Serial.println(F("Sending From"));
  // your email address (sender) - MUST include angle brackets
  client.println(F("MAIL FROM: <remotosovasa@gmail.com>"));
  if (!response())
    return 0;

  // change to recipient address - MUST include angle brackets
  Serial.println(F("Sending To"));
  client.println(F("RCPT To: <alfredodemiguel@yahoo.es>"));
  // Repeat above line for EACH recipient
  if (!response())
    return 0;

  Serial.println(F("Sending DATA"));
  client.println(F("DATA"));
  if (!response())
    return 0;

  Serial.println(F("Sending email"));
  // recipient address (include option display name if you want)
  client.println(F("To: Alfredo<alfredodemiguel@yahoo.es>"));

  // change to your address
  client.println(F("From: remotosovasa@gmail.com"));
  client.println(F("Subject: Mi tarjeta arduino\r\n"));
  client.println(F("Este email, fue envidado de forma segura.\n"));
  client.println(F("No se deben de enviar mas de un email desde esta cuenta en una hora o dejará de funcionar."));
  client.println(F("Este email se envio desde una cuenta no monitorizada."));
  client.println(F("Saludos."));

  // IMPORTANT you must send a complete line containing just a "." to end the conversation
  // So the PREVIOUS line to this one must be a prinln not just a print
  client.println(F("."));
  if (!response())
    return 0;

  Serial.println(F("Sending QUIT"));
  client.println(F("QUIT"));
  if (!response())
    return 0;

  client.stop();
  Serial.println(F("Disconnected"));
  return 1;
}
