import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Countdown(props) {
  const {time} = props;

  return (
    <View style={styles.viewCountdown}>
        <Text style={styles.text}>{time}</Text>
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
 