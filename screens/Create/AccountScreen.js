import React, { useState } from 'react'
import Colors from "../../constants/Colors";
import { View, KeyboardAvoidingView, Input, Select, SubmitButton, ScrollView, DatepickerInput, Container, PrimaryButton } from "../../components/Themed";
import { CalculatorInput } from "../../components/Calculator";
import { StyleSheet, useColorScheme } from "react-native";
import { newAccount, initialAccountForm, initialSaving } from '../../constants/defaults';
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

  const user = useAuthentication();
  const [form, setForm] = useState(initialAccountForm());
  const [save, saving] = useState(initialSaving);
  const [id, setId] = useState(accounts.length == 0 ? 1:accounts[accounts.length - 1].id+1);
  const [accType, setAccType] = useState(form.type.value);
  const [accIbal, setAccIbal] = useState(form.initialBalance.value);
  const [accIdate, setAccIdate]  = useState(form.initialDate.value);
  const colorScheme = useColorScheme();
  const containerBG = {
    backgroundColor: Colors[colorScheme].background
  };

  const [behavior, setBehavior] = useState("height");
  
  React.useEffect(() => {
    if (form.type.value !== accType) {
      form.type.value = accType;
    } 
    
    if (form.initialBalance.value !== accIbal) {
      form.initialBalance.value = accIbal;
    } 
    
    if (form.initialDate.value !== accIdate) {
      form.initialDate.value = accIdate;
    }
  }, [accType, accIbal, accIdate])

  function updateInputs(val, state, prop) {
    state[prop].value = val;
    setForm({
      ...state
    });
  }

  function loading (val) {
    saving({
      ...save,
      isLoading: val
    })
  }

  function showToast (toast, msg = "") {
    saving({
      ...save,
      returnToast: toast,
      msg: msg,
    })
  }

  function processNewAccountRecord () {
    const state = newAccount;
    Object.keys(form).map((key) => {
      switch (key) {
        case "initialBalance":
          state[key] = form[key].value;
          state.currentBalance = accIbal;
          break;
        case "initialDate":
          state[key] = form[key].value.toLocaleDateString('en-US');
          break;  
        default:
          state[key] = form[key].value;
          break;
      }
    })
    state.id = id;
    return state;
  }

  function submitNewAccount() {
    loading(true);
    const state = validate(form);
    if (Object.values(state).find(data => data.result == false)) {
      setInitialAcc(state);
      loading(false);
    } else {
      const state = processNewAccountRecord();
      accounts.push(state);
      updateUserAccount(user, state).then(() => {
        loading(false);
        showToast("success", "New Account Saved.")
        setId(state.id + 1);
        newAccount.id = id;
        reset();
        setTimeout(() => showToast(false), 1000)
      }).catch((error) => {
        loading(false);
        showToast("failed", error.message)
        setTimeout(() => showToast(false), 3000)
      })
    }
  }

	return (
    <Container style={[styles.container, containerBG]}>
      {save.isLoading &&
        <Loading />
      }
      {save.returnToast &&
        <SuccessToast type={save.returnToast} text={save.msg} />
      }
      <KeyboardAvoidingView
        behavior={behavior}
      >
        <View style={{ height: "100%" }}>
          <Select 
            label="Type" 
            options={options} 
            value={accType} setValue={setAccType} 
            validation={ form.type.result ? false:form.type.error }
          />
          <Input 
            label="Name" 
            onPressIn={() => setBehavior("height")} 
            value={form.name.value} 
            onChangeText={(value) => updateInputs(value, form, "name")}
            validation={ form.name.result ? false:form.name.error }
          />
          <CalculatorInput 
            label="Initial Balance" 
            value={accIbal}
            setValue={setAccIbal}
            validation={ form.initialBalance.result ? false:form.initialBalance.error }
          />
          <DatepickerInput 
            label="Initial Date" 
            value={accIdate}
            setValue={setAccIdate}
            validation={ form.initialDate.result ? false:form.initialDate.error }
          />
          <Input 
            label="Note" 
            onPressIn={() => setBehavior("position")} 
            value={form.note.value} 
            onChangeText={(value) => updateInputs(value, form, "note")}
            validation={ form.note.result ? false:form.note.error }
          />
          <View style={{ width: "100%", marginTop: 20 }}>
            <SubmitButton onPress={() => submitNewAccount()} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Container>
	);

  function reset() {
    const state = initialAccountForm();
    setForm(state);
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