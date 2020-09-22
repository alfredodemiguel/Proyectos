String _encodePhoto (String photo) {
//  char input[] ="";
//  int len = password.length();
//  password.toCharArray(input, len+1);
//  int encodedLen = base64X_enc_len(len);
//  char encoded[encodedLen];
//  base64X_encode(encoded, input, len); 
//  String myEncoded = String(encoded);

  
  Serial.println ("La foto del encode");
  Serial.println (photo);
  if (rbase64.encode(photo) == RBASE64_STATUS_OK) {
    Serial.println("\nConverted the String to Base64 : ");
    myEncoded = (rbase64.result());
  } else {
    
    Serial.println ("Algo no chuta");
    Serial.println ("size");
    Serial.println (RABSE64_STATUS_SIZE);
    Serial.println ("format");
    Serial.println (RBASE64_STATUS_FORMAT);
  }

  myEncoded = "data:image/jpeg;base64," + myEncoded;
  return (myEncoded);
}






// Check if photo capture was successful
bool checkPhoto( fs::FS &fs ) {
  File f_pic = fs.open( FILE_PHOTO );
  unsigned int pic_sz = f_pic.size();
  return ( pic_sz > 100 );
}



// Capture Photo and Save it to SPIFFS
void capturePhotoSaveSpiffs( void ) {
  camera_fb_t * fb = NULL; // pointer
  bool ok = 0; // Boolean indicating if the picture has been taken correctly
  String fotoString = "";

  do {
    // Take a photo with the camera
    Serial.println("Taking a photo...");

    fb = esp_camera_fb_get();
    Serial.print ("La longitud del buffer es:");
    Serial.println  (sizeof(fb));
    if (!fb) {
      Serial.println("Camera capture failed");
      return;
    }

    // Photo file name
    Serial.printf("Picture file name: %s\n", FILE_PHOTO);
    File file = SPIFFS.open(FILE_PHOTO, FILE_WRITE);

    // Insert the data in the photo file
    if (!file) {
      Serial.println("Failed to open file in writing mode");
    }
    else {
      file.write(fb->buf, fb->len); // payload (image), payload length
      Serial.println("-----The picture has been saved in ");
      Serial.print(FILE_PHOTO);
      Serial.print(" - Size: ");
      Serial.print(file.size());
      Serial.println(" bytes");
    }
    // Close the file
    file.close();
    esp_camera_fb_return(fb);

    // check if file has been correctly saved in SPIFFS
    ok = checkPhoto(SPIFFS);
  } while ( !ok );

  File file2 = SPIFFS.open(FILE_PHOTO);
  if(!file2){
    Serial.println("Failed to open file for reading");
  } else {
    while(file2.available()){
      //Serial.write(file2.read());
      fotoString += char(file2.read());
    }
    Serial.println ("FOTO RAW");
    Serial.println (fotoString);
    Serial.println ("Foto CODIFICADA");
    Serial.println (_encodePhoto (fotoString));
    
  } 
}
