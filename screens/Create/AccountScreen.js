import {useState} from 'react'
import Colors from "../../constants/Colors";
import { View, KeyboardAvoidingView, Input, Select, SubmitButton, ScrollView, DatepickerInput, Container } from "../../components/Themed";
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

  const [behavior, setBehavior] = useState("height");
  
	return (
    <Container style={[styles.container, containerBG]}>
      <KeyboardAvoidingView
        behavior={behavior}
      >
        <View style={{ height: "100%" }}>
          <Select label="Type" options={options}/>
          <Input label="Name" onPressIn={() => setBehavior("height")} />
          <CalculatorInput label="Initial Balance" />
          <DatepickerInput label="Initial Date" />
          <Input label="Note" onPressIn={() => setBehavior("position")} />
          <View style={{ width: "100%", marginTop: 20 }}>
            <SubmitButton />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Container>
	);
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