import { DatepickerInput, Input, KeyboardAvoidingView, ScrollView, Select, SubmitButton, View } from "../../components/Themed";
import { CalculatorInput } from "../../components/Calculator";
import { StyleSheet, useColorScheme } from "react-native";
import AccountList from "../../hooks/bankList"
import Colors from "../../constants/Colors";

export default function CreateTransfer({ navigation }) {
  const colorScheme = useColorScheme();
  const containerBG = {
    backgroundColor: Colors[colorScheme].background
  };

  const accountList = [{
    title: "Select Account",
    data: AccountList().map(data => data.name)
  }];


  return (
    <ScrollView style={[containerBG, { width: "100%", padding: 0 }]}>
      <View style={styles.container}>
        <View style={[styles.container, { width: "100%", height: "auto", padding: 0 }]}>
          <Select label="From" options={accountList} />
          <Select label="To" options={accountList} />
          <CalculatorInput label="Amount" />
          <DatepickerInput label="Transaction Date" />
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