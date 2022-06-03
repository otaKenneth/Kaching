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
  SectionList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import appStyles from "../assets/styles/appStyles";
import DateTimePicker from '@react-native-community/datetimepicker';

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

export function Container(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  return <DefaultView style={[{ backgroundColor: "transparent" }, style]} {...otherProps} />;
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
    <Text style={{ fontWeight: "500", }}>Submit</Text>
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
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
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
				style={{ flex: 1, justifyContent: "flex-end"}}
        onRequestClose={() => {
          setShowModal(!showModal)
        }}
      >
        <View style={[appStyles.modalContainer, { justifyContent: "center" }]}>
          <View style={[appStyles.modalView, { width: "70%", padding: 0, height: "auto", maxHeight: 500, }]}>
            <SafeAreaView style={{ width: "100%", padding: 10 }}>
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
          <Ionicons name="chevron-forward-outline" size={25} color={color} />
        </Pressable>
      </View>
    </View>
  );
}

export function DatepickerInput(props) {
  const { style, lightColor, darkColor, label, containerStyle, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );
  
	const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  return (
    <View style={[{ width: "98%", marginBottom: 10, }, containerStyle]}>
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
            paddingVertical: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }, 
          style
        ]}
        {...otherProps}
      >
        <Text>{date.getMonth()+1}/{date.getDate()}/{date.getFullYear()}</Text>
        <Pressable
          onPress={() => setShow(true)}
        >
          <Ionicons name='calendar' color={color} size={18} />
        </Pressable>
        {show && 
          <DateTimePicker
            mode='date'
            value={date}
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            maximumDate={new Date()}
            onChange={(evt, date) => {setDate(date); setShow(false); }}
          />
        }
      </View>
    </View>
  );
}

export function Card(props) {
  const { style, lightColor, darkColor, title, subtitle, onPress, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const cardBG = useThemeColor(
    { light: darkColor, dark: lightColor },
    "tint"
  );
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  return (
    <View
      style={[
        { 
          width: "46%", height: 200, 
          // borderStyle: 'solid', borderWidth: 2, 
          borderRadius: 15,
          overflow: "hidden", marginBottom: 10,
          elevation: 10,
          // padding: 10 
        },
        { backgroundColor }, 
        style
      ]} 
      {...otherProps}
    >
    <Pressable style={{ width: "auto", height: "auto" }} onPress={onPress}>
      <View style={{ height: "70%", width: "100%" }}></View>
      <View style={{ width: "100%", height: "30%", backgroundColor: cardBG, paddingLeft: 15, paddingVertical: 5, }}>
        <Text style={{ color: color }}>{subtitle}</Text>
        <Text style={[appStyles.title, { color: color }]}>{title}</Text>
      </View>
    </Pressable>
    </View>
  );
}