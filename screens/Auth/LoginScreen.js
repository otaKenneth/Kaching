import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import { Container, Input, KeyboardAvoidingView, Pressable, Text } from "../../components/Themed";
import { SubmitButton, SecondaryButton } from '../../components/Buttons';
import { initialLogin } from "../../constants/defaults";
import Loading, { SuccessToast } from '../../components/Loading';
import validate from '../../constants/validate';

import firebase, { setUser } from '../../hooks/firebase';
import { getAuth, signInAnonymously, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({ navigation }) {
  const auth = getAuth();
  const [login, setLogin] = useState(initialLogin);
  
  const updateInputs = (val, prop) => {
    prop.value = val;
    const state = {
      ...login
    };
    setLogin(state);
  }

  function loading (val) {
    setLogin({
      ...login,
      isLoading: val
    })
  }

  function showToast(toast, msg = "") {
    setLogin({
      ...login,
      returnToast: toast,
      msg: msg,
    })
  }

  const loginUser = (type = "user") => {
    loading(true)
    const state = validate(login);
    if (type == "user") {
      if (Object.values(state).find(data => data.result == false)) {
        setLogin(state)
        loading(false)
      } else {
        signInWithEmailAndPassword(auth, login.email.value, login.passworrd.value)
        .then((res) => {
          loading(false);
          showToast("success");
          setTimeout(() => showToast(false), 1000)
        }).catch((error) => {
          loading(false);
          showToast("failed", error.message)
          setTimeout(() => { showToast(false)}, 1000)
        })
      }
    } else {
      signInAnonymously(auth).then((res) => {
        loading(false);
        showToast(true);
        setUser(res.user.uid)
      }).catch((error => {
        loading(false);
        showToast("failed", error.message)
        setTimeout(() => { showToast(false) }, 1000)
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
        <SuccessToast type={login.returnToast} text={login.msg} />
      }
      <Container style={{ height: "15%", width: "100%" }} />
      <Container style={{ padding: 20 }}>
        <Text style={{ fontSize: 40, fontWeight: "500", marginBottom: 20, textAlign: "center" }}>Login</Text>
        <Input label="E-mail" textContentType="emailAddress" keyboardType="email-address" 
          value={login.email.value}
          onChangeText={(value) => updateInputs(value, login.email)}
        />
        <Input label="Password" secureTextEntry={true}
          value={login.passworrd.value}
          onChangeText={(value) => updateInputs(value, login.passworrd)}
        />
        <Container style={{ flexDirection: "row", alignContent: "center", justifyContent: "center", marginBottom: 15 }}>
          <Text>Don't have an account? </Text>
          <Pressable
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={{ color: "blue" }}>Sign-up here</Text>
          </Pressable>
        </Container>
        <Container
          style={
            { 
              marginTop: 10, height: 120, width: "70%",
              alignSelf: "center", justifyContent: "space-between",
            }
          }
        >
          <SubmitButton
            text="Login" 
            onPress={() => loginUser()} 
          />
          <SecondaryButton
            text="Use as Guest" 
            onPress={() => loginUser()} 
          />
        </Container>
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