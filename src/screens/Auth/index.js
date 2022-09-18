import appStyles from 'assets/styles';
import React from 'react';
import { Image, ImageBackground, View } from 'react-native';
import Login from './Login/Login';
import BG from 'assets/images/bg2.png';
import Icon from 'assets/images/icon-colored.png'

const Auth = () => {
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <ImageBackground
        source={BG}
        style={appStyles.container}
      >
        <Image
          source={Icon}
          style={{
            height: 80,
            marginBottom: 30
          }}
          resizeMode="contain"
        />
        <Login />
      </ImageBackground>
    </View>
  );
};

export default Auth;