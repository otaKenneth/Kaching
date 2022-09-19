import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PProvider } from 'react-native-paper';
import {name as appName} from './app.json';
import MainApp from './src/App';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import firebase from './src/api/firebase';
import theme from './src/themes';

export default function App() {

  return (
    <PProvider theme={theme()}>
      <MainApp />
    </PProvider>
  );
}