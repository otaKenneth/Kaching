import Colors from "../../constants/Colors";
import { View, KeyboardAvoidingView, Input, Select, SubmitButton, ScrollView, DatepickerInput } from "../../components/Themed";
import { CalculatorInput } from "../../components/Calculator";
import { StyleSheet, useColorScheme } from "react-native";

import appStyles from "../../assets/styles/appStyles";

const options = [
  {
    title: "Select Type",
    data: ["Cash","Checking","Credit","Debit","Investment","Savings","Other"]
  }
];

export default function CreateAccount({ navigation }) {
  const colorScheme = useColorScheme();
  const containerBG = {
    backgroundColor: Colors[colorScheme].background
  };
  
	return (
    <ScrollView style={[{ width: "100%", padding: 0 }, containerBG]}>
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
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  }
});