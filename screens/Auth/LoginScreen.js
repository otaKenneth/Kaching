import React, { useState } from 'react';
import { Container, Input, KeyboardAvoidingView, Pressable, SubmitButton, PrimaryButton, Text, View } from "../../components/Themed";
import { StyleSheet } from "react-native";
import { initialLogin, newUserData } from "../../hooks/defaults";
import Loading, { SuccessToast } from '../../components/Loading';
import validate from '../../constants/validate';

import firebase, { setUser } from '../../hooks/firebase';
import { getAuth, signInAnonymously, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthentication } from '../../hooks/useAuthentication';

export default function Login({ navigation }) {
  const auth = getAuth();
  const [login, setLogin] = useState(initialLogin);
  const [msg, setMsg] = useState(false);
  
  const updateInputs = (val, prop) => {
    prop.value = val;
    const state = {
      ...login
    };
    setLogin(state);
  }

  const loginUser = (type = "user") => {
    setLogin({
      ...login,
      isLoading: true
    })
    const state = validate(login);
    if (type == "user") {
      if (Object.values(state).find(data => data.result == false)) {
        setLogin(state)
        setLogin({
          ...state,
          isLoading: false
        })
      } else {
        signInWithEmailAndPassword(auth, login.email.value, login.passworrd.value)
        .then((res) => {
          setLogin({
            ...login,
            returnToast: "success",
            isLoading: false,
          })
        }).catch((error) => {
          setMsg(error.message);
          setLogin({
            ...login,
            isLoading: false,
            returnToast: "failed"
          })
        })
      }
    } else {
      signInAnonymously(auth).then((res) => {
        setLogin({
          ...login,
          returnToast: "success",
          isLoading: false
        })
        setUser(res.user.uid)
      }).catch((error => {
        setLogin({
          ...login,
          returnToast: "failed",
          isLoading: false
        })
        setMsg(error.message)
        setTimeout(() => {
          setLogin({
            ...login,
            returnToast: false,
          })
        }, 500)
      }))
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
      {login.isLoading &&
        <Loading />
      }
      {login.returnToast &&
        <SuccessToast type={login.returnToast} text={msg} />
      }
      <Container style={{ height: "15%", width: "100%" }} />
      <Container style={{ padding: 20 }}>
        <Text style={{ fontSize: 40, fontWeight: "500", marginBottom: 20 }}>Login</Text>
        <Input label="E-mail" textContentType="emailAddress" keyboardType="email-address" 
          value={login.email.value}
          onChangeText={(value) => updateInputs(value, login.email)}
        />
        <Input label="Password" secureTextEntry={true}
          value={login.passworrd.value}
          onChangeText={(value) => updateInputs(value, login.passworrd)}
        />
        <Container style={{ flexDirection: "row", alignContent: "center", justifyContent: "center" }}>
          <Text>Don't have an account? </Text>
          <Pressable
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={{ color: "blue" }}>Sign-up Here</Text>
          </Pressable>
        </Container>
        <SubmitButton style={{ marginTop: 20 }} onPress={() => loginUser()} />
        <PrimaryButton 
          text="Use as Guest" 
          style={{ marginTop: 20 }} 
          onPress={() => loginUser('anonymous')}
        />
      </Container>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "flex-start"
  }
})