import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';


export default function ShowImage(props) {
  const {image} = props;
  let pathImage = '';
  

  pathImage = '../resources/' + image + '.png';
  console.log (pathImage);

  return (
    <Image source={require(pathImage)} />
    <Image source={require('../resources/' + image + '.png')} />
    
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
