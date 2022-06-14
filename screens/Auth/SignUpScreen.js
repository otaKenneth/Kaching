import React, { useState } from 'react'
import { Container, Input, KeyboardAvoidingView, Pressable, SubmitButton, Text, View } from "../../components/Themed";
import Loading, { SuccessToast } from '../../components/Loading';
import { StyleSheet } from "react-native";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import validate from '../../constants/validate';
import { initialSignup } from '../../constants/defaults';
import { setUser } from '../../hooks/firebase';

export default function Signup({ navigation }) {
  const auth = getAuth();
  const [msg, setMsg] = useState("");
  const [signup, setSignup] = useState(initialSignup);

  const updateInputs = (val, prop) => {
    prop.value = val;
    const state = {
      ...signup
    };
    setSignup(state);
  }

  function loading (val) {
    setSignup({
      ...signup,
      isLoading: val
    })
  }

  function showToast(toast, msg = "") {
    setSignup({
      ...signup,
      returnToast: toast,
      msg: msg,
    })
  }

  const registerUser = (signup) => {
    loading(true);
    const state = validate(signup);
    if (Object.values(state).find((data) => data.result == false)) {
      loading(false);
      setSignup(state);
    } else {
      createUserWithEmailAndPassword(auth, signup.email.value, signup.password.value)
      .then((res) => {
        loading(false);
        showToast("success", "User registered successfully!")
        setUser(res.user.uid);
        setTimeout(() => {
          showToast(false)
          auth.signOut()
          navigation.navigate('Login')
        }, 500)
      }).catch(error => {
        loading(false)
        showToast("failed", error.message)
        setTimeout( () => showToast(false), 1000)
      })
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
      {signup.isLoading &&
        <Loading />
      }
      {signup.returnToast &&
        <SuccessToast type={signup.returnToast} text={msg} />
      }
      <Container style={{ height: "20%", width: "100%" }} />
      <Container style={{ padding: 20 }}>
        <Text style={{ fontSize: 40, fontWeight: "500", marginBottom: 20 }}>Sign-up</Text>
        <Input 
          label="E-mail" 
          textContentType="emailAddress" keyboardType="email-address" 
          value={signup.email.value} onChangeText={(value) => updateInputs(value, signup.email)}
          validation={ signup.email.result ? false:signup.email.error }
        />
        <Input 
          label="Password" 
          secureTextEntry={true} 
          value={signup.password.value} 
          onChangeText={(value) => updateInputs(value, signup.password)} 
          maxLength={15}
          validation={ signup.password.result ? false:signup.password.error }
        />
        <Input 
          label="Confirm Password" 
          secureTextEntry={true} 
          value={signup.confirmPass.value} 
          onChangeText={(value) => updateInputs(value, signup.confirmPass)}
          validation={ signup.confirmPass.result ? false:signup.confirmPass.error }
        />
        <Container style={{ marginTop: 20, flexDirection: "row", alignContent: "center", justifyContent: "center" }}>
          <Text>Go back to </Text>
          <Pressable
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={{ color: "blue" }}>Login</Text>
          </Pressable>
        </Container>
        <SubmitButton style={{ marginTop: 20 }} onPress={() => registerUser(signup) } />
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