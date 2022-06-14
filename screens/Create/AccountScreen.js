import React, {useEffect, useRef, useState} from 'react'
import Colors from "../../constants/Colors";
import { View, KeyboardAvoidingView, Input, Select, SubmitButton, ScrollView, DatepickerInput, Container, PrimaryButton } from "../../components/Themed";
import { CalculatorInput } from "../../components/Calculator";
import { StyleSheet, useColorScheme } from "react-native";
import { newAccount, initialAccount, initialSaving, resetInitialAccount } from '../../constants/defaults';
import appStyles from "../../assets/styles/appStyles";
import firebase, { updateUserAccount } from '../../hooks/firebase';
import { useAuthentication } from '../../hooks/useAuthentication';
import Loading, { SuccessToast } from '../../components/Loading';
import validate from '../../constants/validate';

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
  const [initialAcc, setInitialAcc] = useState(initialAccount)
  const [isSaving, setSaving] = useState(initialSaving)
  const user = useAuthentication();
  const [accType, setAccType] = useState(initialAcc.type.value);
  const [accIbal, setAccIbal] = useState(initialAcc.initialBalance.value);
  const [accIdate, setAccIdate]  = useState(initialAcc.initialDate.value);
  const colorScheme = useColorScheme();
  const containerBG = {
    backgroundColor: Colors[colorScheme].background
  };

  const [behavior, setBehavior] = useState("height");
  
  React.useEffect(() => {
    if (initialAcc.type.value !== accType) {
      initialAcc.type.value = accType;
    } 
    
    if (initialAcc.initialBalance.value !== accIbal) {
      initialAcc.initialBalance.value = accIbal;
      newAcc.currentBalance = accIbal;
    } 
    
    if (initialAcc.initialDate.value !== accIdate) {
      initialAcc.initialDate.value = accIdate;
    }
  }, [accType, accIbal, accIdate])

  function updateInputs(val, state, prop) {
    state[prop].value = val;
    setInitialAcc({
      ...initialAcc
    });
  }

  function loading (val) {
    setSaving({
      ...isSaving,
      isLoading: val
    })
  }

  function showToast (toast, msg = "") {
    setSaving({
      ...isSaving,
      returnToast: toast,
      msg: msg,
    })
  }

  function processNewAccountRecord () {
    Object.keys(initialAcc).map((key) => {
      newAcc[key] = initialAcc[key].value;
    })
  }

  function submitNewAccount() {
    loading(true);
    const state = validate(initialAcc);
    if (Object.values(state).find(data => data.result == false)) {
      setInitialAcc(state);
      loading(false);
    } else {
      processNewAccountRecord();
      newAcc.initialDate = newAcc.initialDate.toLocaleDateString('en-US')
      accounts.push(newAcc);
      updateUserAccount(user, accounts).then(() => {
        loading(false);
        showToast("success", "New Account Saved.")
        reset();
        setNewAcc({
          ...newAccount,
          id: newAcc.id + 1
        });
        setTimeout(() => showToast(false), 1000)
      }).catch((error) => {
        loading(false);
        showToast("failed", error.message)
        setTimeout(() => showToast(false), 1000)
      })
    }
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
            validation={ initialAcc.type.result ? false:initialAcc.type.error }
          />
          <Input 
            label="Name" 
            onPressIn={() => setBehavior("height")} 
            value={initialAcc.name.value} 
            onChangeText={(value) => updateInputs(value, initialAcc, "name")}
            validation={ initialAcc.name.result ? false:initialAcc.name.error }
          />
          <CalculatorInput 
            label="Initial Balance" 
            value={accIbal}
            setValue={setAccIbal}
            validation={ initialAcc.initialBalance.result ? false:initialAcc.initialBalance.error }
          />
          <DatepickerInput 
            label="Initial Date" 
            value={accIdate}
            setValue={setAccIdate}
            validation={ initialAcc.initialDate.result ? false:initialAcc.initialDate.error }
          />
          <Input 
            label="Note" 
            onPressIn={() => setBehavior("position")} 
            value={initialAcc.note.value} 
            onChangeText={(value) => updateInputs(value, initialAcc, "note")}
            validation={ initialAcc.note.result ? false:initialAcc.note.error }
          />
          <View style={{ width: "100%", marginTop: 20 }}>
            <SubmitButton onPress={() => submitNewAccount()} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Container>
	);

  function reset() {
    const state = resetInitialAccount();
    setInitialAcc(state);
    setAccType(state.type.value)
    setAccIbal(state.initialBalance.value)
    setAccIdate(state.initialDate.value)
  }

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