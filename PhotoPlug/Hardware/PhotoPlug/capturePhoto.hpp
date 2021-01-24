String _encodePhoto () {

  File file = SPIFFS.open(FILE_PHOTO);
  String photoString = "";
  String photoEncoded = "";
  if(!file){
    Serial.println("Failed to open file for reading");
  } else {
    int n= 0;
    while(file.available()){
       
      photoString += char(file.read());
      n=n+1;
    }
  }

  Serial.println ("La foto del encode");
  Serial.println (photoString);
  photoEncoded = "data:image/jpeg;base64," + (base64::encode(photoString));
  
  return (photoEncoded);
}



// Check if photo capture was successful
bool _checkPhoto( fs::FS &fs ) {
  File f_pic = fs.open( FILE_PHOTO );
  unsigned int pic_sz = f_pic.size();
  return ( pic_sz > 100 );
}




// Capture Photo and Save it to SPIFFS
void _capturePhotoSaveSpiffs( void ) {
  camera_fb_t * fb = NULL; // pointer
  bool ok = 0; // Boolean indicating if the picture has been taken correctly
  //String fotoString = "";

  do {
    // Take a photo with the camera
    Serial.println("Taking a photo...");

    fb = esp_camera_fb_get();
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
    }
    // Close the file
    file.close();
    esp_camera_fb_return(fb);

    // check if file has been correctly saved in SPIFFS
    ok = _checkPhoto(SPIFFS);
  } while ( !ok );  
} 

void photoTosmPG3 (void){
  _capturePhotoSaveSpiffs ();
  smPG3 = _encodePhoto ();
}
