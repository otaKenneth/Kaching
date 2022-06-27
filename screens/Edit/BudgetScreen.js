import { DatepickerInput, Input, KeyboardAvoidingView, ScrollView, View } from "../../components/Themed";
import { PrimaryButton, SecondaryButton } from '../../components/Buttons';
import { CalculatorInput } from "../../components/Calculator";
import { StyleSheet, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import { initialSaving, initialBudgetForm, processBudgetCategories } from "../../constants/defaults";
import React from "react";
import Loading, { SuccessToast } from "../../components/Loading";
import validate from "../../constants/validate";
import { updateUserBudget as update, updateUserBudgetCategory } from "../../hooks/firebase";
import { useAuthentication } from "../../hooks/useAuthentication";

export default function EditBudget({ navigation, route }) {
  const { defaultBudget, defaultCategories } = route.params;
  const user = useAuthentication();
  const [form, setForm] = React.useState(initialBudgetForm(defaultBudget));
  const [from, setFrom] = React.useState(form.from.value)
  const [to, setTo] = React.useState(form.to.value)
  const [balance, setBalance] = React.useState(form.initialBalance.value)
  const [save, saving] = React.useState(initialSaving)
  const colorScheme = useColorScheme();
  const containerBG = {
    backgroundColor: Colors[colorScheme].background
  };

  navigation.setOptions({
    headerTitle: `Edit ${defaultBudget.name}`
  })

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
    const state = defaultBudget;
    Object.keys(form).map(key => {
      switch (key) {
        case "initialBalance":
          state[key] = form[key].value;
          let v = parseFloat(form[key].value);
          state.currentBalance = parseFloat(state.currentBalance) + (v - parseFloat(state.currentBalance));
          state.remaningBalance = parseFloat(state.remaningBalance) + (v - parseFloat(state.remaningBalance));
          state.totalBudgeted = parseFloat(state.totalBudgeted) + (v - parseFloat(state.totalBudgeted));
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
    const state = form;
    state[prop].value = val;
    setForm({
        ...state
    });
  }

  function handleSubmmit() {
    loading(true, "Saving new budget record.")
    const state = validate(form);
    if (Object.values(state).find(data => data.result == false)) {
      setForm(state)
      loading(false)
    } else {
      const state = processNewBudgetRecord();
      const categories = state.categories;
      delete state.categories;
      update(user, state).then(() => {
        var processed = 0;
        loading(true, "Updating categories...")
        categories.forEach((d, i, a) => {
            updateUserBudgetCategory(user, state.did, d).then(res => {
              processed++;
              if (processed == a.length) {
                loading(false); reset();
                showToast("success", `${defaultBudget.name} Budget has been modified.`)
                setTimeout(() => {
                    showToast(false)
                    navigation.navigate('Edit', {
                      screen: "EditCategory", 
                      params: { 
                        id: state.id,
                        categories: categories, 
                        headerName: state.name,
                        totalBudget: state.initialBalance,
                        from: "update"
                      }
                    })
                }, 1000)
              }
            }).catch(error => {
              loading(false)
              showToast("failed", error.message)
              setTimeout(() => showToast(false), 1000)    
            })
          })
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
            onChangeText={(value) => updateInputs(value, "name")}
            validation={form.name.result ? false:form.name.error}
          />
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <PrimaryButton 
          text="Save" 
          onPress={() => handleSubmmit()} 
          style={{ width: "97%" }}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  )

  function reset() {
    const state = initialBudgetForm(defaultBudget);
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