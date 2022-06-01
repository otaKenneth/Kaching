import { StyleSheet } from "react-native";
import { View, KeyboardAvoidingView, Text, TouchableOpacity, Input, Select, CalculatorInput } from "../components/Themed";

import appStyles from "../assets/styles/appStyles";

const options = [
  {
    title: "Select Type",
    data: ["Cash","Checking","Credit","Debit","Investment","Savings","Other"]
  }
];

export default function CreateAccount({ navigation }) {
	return (
		<KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={[styles.container, { width: "100%", padding: 0 }]}>
        <Select label="Type" options={options}/>
        <Input label="Name" />
        <CalculatorInput label="Initial Balance" />
        <Input label="Note" />
      </View>

      <View style={{ width: "100%" }}>
        <TouchableOpacity
          style={appStyles.submitButton}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
		</KeyboardAvoidingView>
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