/*
 https://create.arduino.cc/projecthub/xreef/send-email-with-esp8266-and-arduino-dfa5de
*/




void mail(String _subject, String _message)
{
    int smEmailLen = smEmail.length() + 1;
    char smEmailChar[smEmailLen];
    smEmail.toCharArray(smEmailChar, smEmailLen);

    EMailSender::EMailMessage message;
    message.subject = _subject;
    message.message = _message;
    EMailSender::Response resp = emailSend.send(smEmailChar, message);
    Serial.println("Sending status: ");
    Serial.println(resp.status);
    Serial.println(resp.code);
    Serial.println(resp.desc);
}
