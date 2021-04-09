import React from 'react';
import {StyleSheet, Image} from 'react-native';


export default function ShowImage(props) {
  const {image} = props;
  console.log (image);

  switch (image)
  {
     case "Salida":
      var icon = require('../resources/Salida.png');
      break;
     case "Correr":
      var icon = require('../resources/Correr.png');
      break;
     case "Victoria":
      var icon = require('../resources/Victoria.png');
      break;
     default: 
      var icon = require('../resources/Descanso.png');
  }
 
  return (
    <Image source={icon} />
  );
}

const styles = StyleSheet.create({
  viewImagen: {
    position: 'absolute',
    top: 50,
    width: '100%',
    height: 100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius:30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff0',
  },
});
