import { DatepickerInput, Input, KeyboardAvoidingView, ScrollView, View } from "../../components/Themed";
import { PrimaryButton, SecondaryButton } from '../../components/Buttons';
import { CalculatorInput } from "../../components/Calculator";
import { StyleSheet, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import { initialSaving, newBudget, initialBudgetForm, processBudgetCategories } from "../../constants/defaults";
import React from "react";
import Loading, { SuccessToast } from "../../components/Loading";
import validate from "../../constants/validate";
import { addUserBudget as create } from "../../hooks/firebase";
import { useAuthentication } from "../../hooks/useAuthentication";

export default function CreateBudget({ navigation, route }) {
  const { budgets, defaultCategories } = route.params;
  const user = useAuthentication();
  const [form, setForm] = React.useState(initialBudgetForm());
  const [id, setId] = React.useState(budgets.length == 0 ? 1:budgets[budgets.length-1].id + 1);
  const [from, setFrom] = React.useState(form.from.value)
  const [to, setTo] = React.useState(form.to.value)
  const [balance, setBalance] = React.useState(form.initialBalance.value)
  const [save, saving] = React.useState(initialSaving)
  const colorScheme = useColorScheme();
  const containerBG = {
    backgroundColor: Colors[colorScheme].background
  };

  React.useEffect(() => {
    if (form.initialBalance.value !== balance) {
      form.initialBalance.value = balance;
    }

    if (form.from.value !== from) {
      form.from.value = from;
    }

    if (form.to.value !== to) {
      form.to.value = to;
    }

  }, [from, to, balance])

  function processNewBudgetRecord () {
    const state = newBudget;
    Object.keys(form).map(key => {
      switch (key) {
        case "initialBalance":
          state[key] = form[key].value;
          state.currentBalance = form[key].value;
          state.remaningBalance = form[key].value;
          state.totalBudgeted = form[key].value;
          break;
        case "from":
          state[key] = form[key].value.toLocaleDateString('en-US');
          break;
        case "to":
          state[key] = form[key].value.toLocaleDateString('en-US');
          break;
        default:
          state[key] = form[key].value;
          break;
      }
    })
    state.id = id;
    loading(true, "Processing budget categories.")
    state.categories = processBudgetCategories(state.initialBalance, defaultCategories);
    return state;
  }

  function loading (val, msg = "") {
    saving({
      ...save,
      loadingMsg: msg,
      isLoading: val
    })
  }

  function showToast(toast, msg = "") {
    saving({
      ...save,
      returnToast: toast,
      msg: msg
    })
  }

  function updateInputs (val, prop) {
    prop.value = val;
    const state = {
      ...form
    };
    setForm(state);
  }

  function handleSubmmit() {
    loading(true, "Saving new budget record.")
    const state = validate(form);
    if (Object.values(state).find(data => data.result == false)) {
      setForm(state)
      loading(false)
    } else {
      const state = processNewBudgetRecord();
      budgets.push(state)
      create(user, state, defaultCategories).then(() => {
        loading(false)
        showToast("success", "New Budget has been created.")
        setId(id + 1);
        newBudget.id = id;
        reset();
        setTimeout(() => showToast(false), 1000)
      }).catch((error) => {
        loading(false)
        showToast("failed", error.message)
        setTimeout(() => showToast(false), 1000)
      })
    }
  }

  return (
    <ScrollView style={[{ width: "100%", padding: 0 }, containerBG]}>
      {save.isLoading &&
        <Loading text={save.loadingMsg} />
      }
      {save.returnToast &&
        <SuccessToast type={save.returnToast} msg={save.msg}/>
      }
      <View style={styles.container}>
        <View style={[styles.container, { width: "100%", height: "auto", padding: 0 }]}>
          <DatepickerInput 
            label="Start Date"
            value={from}
            setValue={setFrom}
            validation={form.from.result ? false:form.from.error}
          />
          <DatepickerInput 
            label="End Date" 
            value={to}
            setValue={setTo}
            validation={form.to.result ? false:form.to.error}
          />
          <CalculatorInput 
            label="Initial Balance" 
            value={balance}
            setValue={setBalance}
            validation={form.initialBalance.result ? false:form.initialBalance.error}
          />
          <Input 
            label="Budget Name" 
            value={form.name.value}
            onChangeText={(value) => updateInputs(value, form.name)}
            validation={form.name.result ? false:form.name.error}
          />
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={[styles.container, { width: "100%", padding: 0 }]}>
          <PrimaryButton text="Save" onPress={() => handleSubmmit()} />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )

  function reset() {
    const state = initialBudgetForm();
    setForm(state);
    setBalance(state.initialBalance.value);
    setFrom(state.from.value);
    setTo(state.to.value);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});