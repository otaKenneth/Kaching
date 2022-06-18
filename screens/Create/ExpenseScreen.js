import { Autocomplete, DatepickerInput, Input, KeyboardAvoidingView, ScrollView, Select, View } from "../../components/Themed";
import { PrimaryButton, SecondaryButton } from '../../components/Buttons';
import { CalculatorInput } from "../../components/Calculator";
import { StyleSheet, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";

export default function CreateExpense({ navigation, route }) {
  const { accounts, categories, payees } = route.params;
  const colorScheme = useColorScheme();
  const containerBG = {
    backgroundColor: Colors[colorScheme].background
  };

  const categoriesOpts = [{
    title: "Select Category",
    data: categories.map(categ => categ.name)
  }];

  const accountsOpts = [{
    title: "Select Account",
    data: accounts.map(acc => acc.name)
  }];

  const payeesOpts = [{
    title: "Select Payee",
    data: payees.map(payee => payee.name)
  }];

  const autoCompleteOpts = ["Food & Drinks", "Shopping", "Transportation"];

  return (
    <ScrollView style={[{ width: "100%", padding: 0 }, containerBG]}>
      <View>
        <View style={styles.container}>
          <View style={[styles.container, { width: "100%", height: "auto", padding: 0 }]}>
            <Select label="Category" options={categoriesOpts} />
            <Autocomplete label="Description" options={autoCompleteOpts} />
            <CalculatorInput label="Amount" />
            <DatepickerInput label="Transaction Date" />
            <Select label="From" options={accountsOpts} />
            <Select label="To" options={payeesOpts} />
            <Input label="Comment" />
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={[styles.container, { width: "100%", padding: 0 }]}>
            <PrimaryButton />
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