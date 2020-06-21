/*
 https://create.arduino.cc/projecthub/xreef/send-email-with-esp8266-and-arduino-dfa5de
*/


   

// EMailSender emailSend("remotosovasa@gmail.com", "Arduino00");


void mail(String _subject, String _message)
{
   

    EMailSender::EMailMessage message;
    message.subject = _subject;
    message.message = _message;

    EMailSender::Response resp = emailSend.send("alfredodemiguel17@gmail.com", message);

    Serial.println("Sending status: ");

    Serial.println(resp.status);
    Serial.println(resp.code);
    Serial.println(resp.desc);
}
