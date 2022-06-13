import React, {useEffect, useRef, useState} from 'react'
import Colors from "../../constants/Colors";
import { View, KeyboardAvoidingView, Input, Select, SubmitButton, ScrollView, DatepickerInput, Container } from "../../components/Themed";
import { CalculatorInput } from "../../components/Calculator";
import { StyleSheet, useColorScheme } from "react-native";
import { newAccount } from '../../hooks/defaults';
import appStyles from "../../assets/styles/appStyles";
import firebase, { updateUserAccount } from '../../hooks/firebase';
import { useAuthentication } from '../../hooks/useAuthentication';
import Loading, { SuccessToast } from '../../components/Loading';

const options = [
  {
    title: "Select Type",
    data: ["Cash","Checking","Credit","Debit","Investment","Savings","Other"]
  }
];

export default function CreateAccount({ navigation, route }) {
  const { accounts } = route.params;
  const [newAcc, setNewAcc] = useState({
    ...newAccount,
    id: accounts[accounts.length-1].id + 1
  })
  const [isSaving, setSaving] = useState({
    isLoading: false,
    returnToast: false,
    msg: "",
  })
  const user = useAuthentication();
  const [accType, setAccType] = useState(newAcc.type);
  const [accIbal, setAccIbal] = useState(newAcc.initialBalance);
  const [accIdate, setAccIdate]  = useState(newAcc.initialDate);
  const colorScheme = useColorScheme();
  const containerBG = {
    backgroundColor: Colors[colorScheme].background
  };

  const [behavior, setBehavior] = useState("height");
  
  React.useEffect(() => {
    if (newAcc.type !== accType) {
      newAcc.type = accType;
    } 
    
    if (newAcc.initialBalance !== accIbal) {
      newAcc.initialBalance = accIbal;
      newAcc.currentBalance = accIbal;
    } 
    
    if (newAcc.initialDate !== accIdate) {
      newAcc.initialDate = accIdate;
    }
  }, [accType, accIbal, accIdate])

  function updateInputs(val, state, prop) {
    state[prop] = val;
    setNewAcc({
      ...newAcc
    });
  }

  function submitNewAccount() {
    newAcc.initialDate = newAcc.initialDate.toLocaleDateString('en-US')
    accounts.push(newAcc);
    setSaving({
      ...isSaving,
      isLoading: true
    })
    updateUserAccount(user, accounts).then(() => {
      setSaving({
        ...isSaving,
        isLoading: false,
        returnToast: "success",
        msg: "New Account saved.",
      })
      setNewAcc({
        ...newAccount,
        id: accounts.length + 1
      });
      setTimeout(() => {
        setSaving({
          ...isSaving,
          returnToast: false
        })
      }, 1000)
    }).catch((error) => {
      setSaving({
        ...isSaving,
        isLoading: false,
        returnToast: "error",
        msg: error.message
      })
      setTimeout(() => {
        setSaving({
          ...isSaving,
          returnToast: false
        })
      }, 1000)
    })
  }

	return (
    <Container style={[styles.container, containerBG]}>
      {isSaving.isLoading &&
        <Loading />
      }
      {isSaving.returnToast &&
        <SuccessToast type={isSaving.returnToast} text={isSaving.msg} />
      }
      <KeyboardAvoidingView
        behavior={behavior}
      >
        <View style={{ height: "100%" }}>
          <Select 
            label="Type" 
            options={options} 
            value={accType} setValue={setAccType} 
          />
          <Input 
            label="Name" 
            onPressIn={() => setBehavior("height")} 
            value={newAcc.name} 
            onChangeText={(value) => updateInputs(value, newAcc, "name")}
          />
          <CalculatorInput 
            label="Initial Balance" 
            value={accIbal}
            setValue={setAccIbal}
          />
          <DatepickerInput 
            label="Initial Date" 
            value={accIdate}
            setValue={setAccIdate}
          />
          <Input 
            label="Note" 
            onPressIn={() => setBehavior("position")} 
            value={newAcc.note} 
            onChangeText={(value) => updateInputs(value, newAcc, "note")}
          />
          <View style={{ width: "100%", marginTop: 20 }}>
            <SubmitButton onPress={() => submitNewAccount()} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Container>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "transparent",
    // alignItems: "center",
    // justifyContent: "flex-start",
    padding: 20,
  }
});