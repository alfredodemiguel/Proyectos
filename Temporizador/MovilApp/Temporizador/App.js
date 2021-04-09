import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Button,
  Alert,
} from 'react-native';
import Countdown from './src/components/Countdown.js';
import ShowImage from './src/components/ShowImage.js';


export default function App() {
tiempo = 25;
const estado = "start";
const [isTime, setTime] = useState();

function start() {
  console.log ('Estoy dentro de start');
  setInterval(function(){ 
    tiempo = tiempo -1;
    setTime(tiempo);
    console.log ('Estoy en start, dentro setinterval');
    console.log (tiempo) }, 3000);
  
}

  return (
    <View style={styles.myScreen}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.titleApp}>TEMPORIZADOR</Text>
      </SafeAreaView>
      <View style={styles.Counter}>
      <Text style={styles.text}>{isTime}</Text>
      </View>
      <View style={styles.Image}>
        <ShowImage image="Victoria"/>
      </View>
      <View style={styles.Buttons}>
        <Button
          title="INICIAR"
          onPress={() => start()}
        />
        <Button
          title="PARAR"
          onPress={() => Alert.alert('STOP button pressed')}
        />
        <Button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored"
          title="REINICIO"
          onPress={() => {Alert.alert('RESTART button pressed');
                          console.log ('Prueba del log');
                          }
          }
        /> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  myScreen:{
    flex:1,
    backgroundColor: 'powderblue',
  },
  safeArea: {
    height: '10%',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: 'red',
    flex:1,
  },
  titleApp: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 15,
  },
  Buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex :1,
  },
  Counter:{
    flex : 2,
    backgroundColor: 'orange',
  },
  Image:{
    flex:3,
    backgroundColor: 'green',
  },
});
