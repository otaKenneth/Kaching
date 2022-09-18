import appStyles from 'assets/styles';
import React from 'react';
import { Text, View } from 'react-native';
import Login from './Login/Login';

const Auth = () => {
  return (
    <View style={appStyles.container}>
      <Login />
    </View>
  );
};

export default Auth;