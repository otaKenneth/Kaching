import { StyleSheet } from "react-native";
import { View, KeyboardAvoidingView, Input, Select, SubmitButton, ScrollView, DatepickerInput } from "../../components/Themed";
import { CalculatorInput } from "../../components/Calculator";

import appStyles from "../../assets/styles/appStyles";

const options = [
  {
    title: "Select Type",
    data: ["Cash","Checking","Credit","Debit","Investment","Savings","Other"]
  }
];

export default function CreateAccount({ navigation }) {
	return (
    <ScrollView style={[{ width: "100%", padding: 0 }]}>
      <View style={styles.container}>
        <View style={[styles.container, { width: "100%", height: "auto", padding: 0 }]}>
          <Select label="Type" options={options}/>
          <Input label="Name" />
          <CalculatorInput label="Initial Balance" />
          <DatepickerInput label="Initial Date" />
          <Input label="Note" />
        </View>

      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={[ styles.container, {width: "100%", padding: 0}]}>
          <SubmitButton />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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