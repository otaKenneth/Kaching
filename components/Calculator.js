import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TextInput, useColorScheme } from "react-native";
import appStyles from "../assets/styles/appStyles";
import { Text, Modal, Pressable, View, useThemeColor } from "./Themed";
import calculator, { initialState } from "../hooks/calculator"
import Colors from "../constants/Colors";

export function CalculatorInput(props) {
  const colorScheme = useColorScheme();
  const containerBG = {
    backgroundColor: Colors[colorScheme].background
  };
  const { style, lightColor, darkColor, label, value, setValue, validation, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  const [showModal, setShowModal] = useState(false);

  const [calcVal, setCalcVal] = useState({
    ...initialState,
    currentValue: value
  });

  const handleTap = (type, value) => {
    setCalcVal(calcVal => calculator(type, value, calcVal));
  };

  return (
    <View style={{ width: "98%", marginBottom: 10, }}>
      <Modal
        visible={showModal}
        transparent={true}
        swipeDirection="down"
        style={{ justifyContent: "flex-end" }}
      >
        <View style={[appStyles.modalContainer, { justifyContent: "center" }]}>
          <View style={[appStyles.modalView, containerBG,{ width: "90%", height: "auto", padding: 10 }]}>
            {/* <Calculator onPress={() => setShowModal(!showModal)} myVal={setMyVal} currentValue={myVal} /> */}
            <View style={{ width: "100%", height: 350 }}>
              <View style={{ height: "15%" }}>
                <Text style={styles.value}>
                  {calcVal.currentValue.toLocaleString()}
                </Text>
              </View>
              <View style={{ height: "80%", flexDirection: "column" }}>
                <View style={{ height: "22%", flexDirection: "row" }}>
                  <Pressable
                    style={[styles.number, { backgroundColor: "red" }]}
                    onPress={() => setShowModal(!showModal)}
                  >
                    <Ionicons name="close-outline" size={20} color={color} />
                  </Pressable>

                  <Pressable
                    style={styles.number}
                    onPress={() => handleTap("clear")}
                  >
                    <Text>C</Text>
                  </Pressable>
                  <Pressable
                    style={styles.number}
                    onPress={() => handleTap("back")}
                  >
                    <Ionicons name="chevron-back-outline" size={20} color={color} />
                  </Pressable>
                  <Pressable
                    style={styles.number}
                    onPress={() => handleTap("operator", "/")}
                  >
                    <Text>/</Text>
                  </Pressable>
                </View>

                <View style={{ height: "22%", flexDirection: "row" }}>
                  <Pressable
                    style={styles.number}
                    onPress={() => handleTap("number", 7)}
                  >
                    <Text>7</Text>
                  </Pressable>
                  <Pressable
                    style={styles.number}
                    onPress={() => handleTap("number", 8)}
                  >
                    <Text>8</Text>
                  </Pressable>
                  <Pressable
                    style={styles.number}
                    onPress={() => handleTap("number", 9)}
                  >
                    <Text>9</Text>
                  </Pressable>
                  <Pressable
                    style={styles.number}
                    onPress={() => handleTap("operator", "*")}
                  >
                    <Text>*</Text>
                  </Pressable>
                </View>

                <View style={{ height: "22%", flexDirection: "row" }}>
                  <Pressable
                    style={styles.number}
                    onPress={() => handleTap("number", 4)}
                  >
                    <Text>4</Text>
                  </Pressable>
                  <Pressable
                    style={styles.number}
                    onPress={() => handleTap("number", 5)}
                  >
                    <Text>5</Text>
                  </Pressable>
                  <Pressable
                    style={styles.number}
                    onPress={() => handleTap("number", 6)}
                  >
                    <Text>6</Text>
                  </Pressable>
                  <Pressable
                    style={styles.number}
                    onPress={() => handleTap("operator", "-")}
                  >
                    <Text>-</Text>
                  </Pressable>
                </View>

                <View style={{ height: "22%", flexDirection: "row" }}>
                  <Pressable
                    style={styles.number}
                    onPress={() => handleTap("number", 1)}
                  >
                    <Text>1</Text>
                  </Pressable>
                  <Pressable
                    style={styles.number}
                    onPress={() => handleTap("number", 2)}
                  >
                    <Text>2</Text>
                  </Pressable>
                  <Pressable
                    style={styles.number}
                    onPress={() => handleTap("number", 3)}
                  >
                    <Text>3</Text>
                  </Pressable>
                  <Pressable
                    style={styles.number}
                    onPress={() => handleTap('operator', "+")}
                  >
                    <Text>+</Text>
                  </Pressable>
                </View>

                <View style={{ height: "22%", flexDirection: "row" }}>
                  <Pressable
                    style={styles.number}
                    onPress={() => handleTap("dot")}
                  >
                    <Text>.</Text>
                  </Pressable>
                  <Pressable
                    style={styles.number}
                    onPress={() => handleTap('number', 0)}
                  >
                    <Text>0</Text>
                  </Pressable>
                  <Pressable
                    style={styles.number}
                    onPress={() => handleTap('equal')}
                  >
                    <Text>=</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.number, { backgroundColor: "lightgreen" }]}
                    onPress={() => { setValue(calcVal.currentValue.toLocaleString()); setShowModal(!showModal) }}
                  >
                    <Ionicons name="checkmark-outline" size={20} />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Text style={{ fontSize: 18, marginBottom: 10, }}>{label}:</Text>
      <View
        style={[
          { backgroundColor },
          {
            borderStyle: 'solid',
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            flexDirection: "row",
            alignItems: "center"
          },
          style
        ]}
      >
        <TextInput 
          style={{ width: "92%" }} color={color} keyboardType="number-pad" 
          value={value} onChangeText={(value) => setValue(value)}
        />
        {/* <Input style={{ width: "92%", boder: 0 }} noLabel={true} keyboardType="number-pad" onChangeText={setMyVal} value={myVal} {...otherProps} /> */}
        <Pressable
          onPress={() => {
            setCalcVal({
              ...initialState,
              currentValue: value
            }); setShowModal(true)
          }}
        >
          <Ionicons name="calculator-outline" size={25} color={color} />
        </Pressable>
      </View>
      {validation &&
        <Text style={{ color: "red", fontSize: 12 }}>{validation}</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  number: {
    width: "22%", height: "80%",
    marginHorizontal: 5,
    backgroundColor: "#2f95dc",
    alignItems: "center", justifyContent: "center",
  },
  value: {
    textAlign: 'right', fontSize: 20,
    width: "100%", height: "90%",
    borderStyle: 'solid', borderWidth: 1, borderRadius: 10,
    paddingHorizontal: 5, paddingVertical: 10
  }
})