import styles from 'assets/styles';
import React from 'react';
import { Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const Login = () => {
  return (
    <View
      style={{
        width: '90%',

      }}
    >
      <Text style={styles.h3}>Login</Text>
      <TextInput style={styles.textInput} label="Email Address" />
      <TextInput style={styles.textInput} secureTextEntry label="Password" />
      <View>
        <Button
          style={styles.button}
          mode='contained'
          onPress={() => {
            console.log("loggin in")
          }}
        >
          Login
        </Button>
        <Button
          styles={styles.button}
        >
          Register
        </Button>
      </View>
    </View>
  );
};

export default Login;