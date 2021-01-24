import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';


export default function App() {
  return (
    <WebView source={{ uri: 'https://web-photoplug.herokuapp.com/' }} />
  );
}

const styles = StyleSheet.create({
  web:{
    flex: 1
  }
});
