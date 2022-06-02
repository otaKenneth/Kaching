// Learn more about Light and Dark modes:
// https://docs.expo.dev/guides/color-schemes/
import React, {useState} from 'react';
import {
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
  KeyboardAvoidingView as DefaultAvoid,
  SafeAreaView as DefaultSafeAreaView,
  ScrollView as DefaultScrollView,
  TouchableOpacity as DefaultTouchableOpacity,
  TouchableHighlight as DefaultTouchableHighlight,
  Pressable as DefaultPressable,
  VirtualizedList as DefaultVirtualizeList,
  Modal as DefaultModal,
  TextInput as DefaultTextInput,
  SectionList
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import appStyles from "../assets/styles/appStyles";
import Calculator from "../components/Calculator";

export function useThemeColor(props, colorName) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function KeyboardAvoidingView(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultAvoid style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function SafeAreaView(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultSafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ScrollView(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultScrollView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function List(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultVirtualizeList style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TouchableOpacity(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultTouchableOpacity style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function SubmitButton(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primaryBtn"
  );

  return <DefaultTouchableOpacity 
    style={[
      { backgroundColor }, 
      style, 
      { 
        width: "98%", paddingVertical: 15,
        alignItems: "center", borderRadius: 10,}
    ]} 
    {...otherProps}>
    <Text>Submit</Text>
  </DefaultTouchableOpacity>;
}

export function TouchableHighlight(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultTouchableHighlight style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Pressable(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultPressable style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Modal(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultModal style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Input(props) {
  const { style, lightColor, darkColor, label, noLabel, containerStyle, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <View style={[{ width: "98%", marginBottom: 10, }, containerStyle]}>
      {noLabel === false || noLabel == undefined && 
        <Text style={{ fontSize: 18, marginBottom: 10, }}>{label}:</Text>
      }
      <DefaultTextInput 
        style={[
          { backgroundColor }, 
          {
            borderStyle: 'solid', 
            borderWidth: 1, 
            borderRadius: 10, 
            width: "100%", 
            paddingHorizontal: 10, 
            paddingVertical: 5,
          }, 
          style
        ]} 
        {...otherProps} 
      />
    </View>
  );
}

export function Select (props) {
  const { style, lightColor, darkColor, label, options, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState("Select");

  const SelectItem = ({item}) => (
    <Pressable 
      style={{ height: 40, fontSize: 18, width: "100%" }}
      onPress={() => {
        setShowModal(!showModal);
        setSelected(item);
      }}
    >
      <Text style={{ fontSize: 18 }}>{item}</Text>
    </Pressable>
  );

  return (
    <View style={{ width: "98%", marginBottom: 10, }}>
      
      <Modal
        visible={showModal}
				transparent={true}
				swipeDirection="down"
				style={{ justifyContent: "flex-end"}}
      >
        <View style={[appStyles.modalContainer, { justifyContent: "center" }]}>
          <View style={[appStyles.modalView, { width: "70%", padding: 0, height: "50%" }]}>
            <SafeAreaView style={{ height: "auto", width: "100%", padding: 10 }}>
              <SectionList
                sections={options}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item, index }) => <SelectItem key={index} item={item} />}
                renderSectionHeader={({ section: { title } }) => (
                  <Text style={{  height: 50, fontSize: 18, paddingVertical: 10, }} >{title}</Text>
                )}
              />
            </SafeAreaView>
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
            width: "100%", 
            paddingHorizontal: 10, 
            paddingVertical: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }, 
          style
        ]}
        {...otherProps}
      >
        <Text style={{ fontSize: 15 }}>{selected}</Text>
        <Pressable
          onPress={() => setShowModal(true)}
        >
          <Ionicons name="chevron-forward-outline" size={25} color="#000" />
        </Pressable>
      </View>
    </View>
  );
}

export function CalculatorInput (props) {
  const { style, lightColor, darkColor, label, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const [showModal, setShowModal] = useState(false);
  const [myVal, setMyVal] = useState('0');

  return (
    <View style={{ width: "98%", marginBottom: 10, }}>
      <Modal
        visible={showModal}
				transparent={true}
				swipeDirection="down"
				style={{ justifyContent: "flex-end"}}
      >
        <View style={[appStyles.modalContainer, { justifyContent: "center" }]}>
          <View style={[appStyles.modalView, { width: "90%", height: "auto", padding: 10 }]}>
            <Calculator onPress={() => setShowModal(!showModal)} myVal={setMyVal} currentValue={myVal} />
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
        <DefaultTextInput style={{width: "92%", }} keyboardType="number-pad" onChangeText={setMyVal} value={myVal} {...otherProps} />
        <Pressable
          onPress={() => setShowModal(true)}
        >
          <Ionicons name="calculator-outline" size={25} />
        </Pressable>
      </View>
    </View>
  );
}