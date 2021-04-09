import React, { useState } from "react";
import {StyleSheet, Text, View} from 'react-native';

export default function Countdown(props) {
  var {time, state} = props;
  const [isTime, setTime] = useState();
  if (state == "iniciar"){
    setInterval(function(){ time = time -1;
                           setTime(time); }, 3000);
  }

  console.log (global.mitiempo);

  
  return (
    <View style={styles.viewCountdown}>
        <Text style={styles.text}>{global.mitiempo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewCountdown: {
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
  text: {
    fontWeight: 'bold',
    fontSize: 58,
    color: '#0ff',
    textAlign: 'center',
  },
});
 