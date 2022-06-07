import { Autocomplete, DatepickerInput, Input, KeyboardAvoidingView, ScrollView, Select, SubmitButton, View } from "../../components/Themed";
import { CalculatorInput } from "../../components/Calculator";
import { StyleSheet, useColorScheme } from "react-native";
import AccountList from "../../hooks/bankList"
import Colors from "../../constants/Colors";

export default function CreateIncome({ navigation }) {
  const colorScheme = useColorScheme();
  const containerBG = {
    backgroundColor: Colors[colorScheme].background
  };

  const categories = [{
    title: "Select Category",
    data: ["Salary", "Daily Income", "Misc"]
  }];

  const accountList = [{
    title: "Select Account",
    data: AccountList().map(data => data.name)
  }];

  const payees = [{
    title: "Select Payee",
    data: AccountList().map(data => `Account: ${data.name}`)
  }];

  const autoCompleteOpts = ["Food & Drinks", "Shopping", "Transportation"];

  return (
    <ScrollView style={[{ width: "100%", padding: 0 }, containerBG]}>
      <View>
        <View style={styles.container}>
          <View style={[styles.container, { width: "100%", height: "auto", padding: 0 }]}>
            <Select label="Category" options={categories} />
            <Autocomplete label="Description" options={autoCompleteOpts} />
            <CalculatorInput label="Amount" />
            <DatepickerInput label="Transaction Date" />
            <Select label="To" options={payees} />
            <Input label="Comment" />
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={[styles.container, { width: "100%", padding: 0 }]}>
            <SubmitButton />
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  )
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