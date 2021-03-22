import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Button,
  Alert,
  Image
} from 'react-native';
import Countdown from './src/components/Countdown.js';
import ShowImage from './src/components/ShowImage.js';
import tomate from './src/resources/tomate.png';


export default function App() {
const tiempo = 25;

  return (
    <View style={styles.myScreen}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.titleApp}>TEMPORIZADOR</Text>
      </SafeAreaView>
      <View style={styles.Counter}>
        <Countdown time = {tiempo} /> 
      </View>
      <View style={styles.Image}>
        <ShowImage image="Salida"/>
      </View>
      <View style={styles.Buttons}>
        <Button
          title="Press me"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
    
        <Button
          title="Left button"
          onPress={() => Alert.alert('Left button pressed')}
        />
        <Button
          title="Right button"
          onPress={() => Alert.alert('Right button pressed')}
        />
        <Button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored"
          title="boton material"
          onPress={() => {Alert.alert('Material button pressed');
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
