// Learn more about Light and Dark modes:
// https://docs.expo.dev/guides/color-schemes/
import React, { useState, useEffect } from 'react';
import {
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
  KeyboardAvoidingView as DefaultAvoid,
  SafeAreaView as DefaultSafeAreaView,
  ScrollView as DefaultScrollView,
  TouchableOpacity as DefaultTouchableOpacity,
  TouchableHighlight as DefaultTouchableHighlight,
  TouchableWithoutFeedback as DefaultTouchable,
  Pressable as DefaultPressable,
  FlatList as DefaultFlatList,
  VirtualizedList as DefaultVirtualizeList,
  RefreshControl as DefaultRefreshControl,
  Modal as DefaultModal,
  TextInput as DefaultTextInput,
  SectionList,
} from "react-native";
import { Ionicons, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import appStyles from "../assets/styles/appStyles";
import DateTimePicker from '@react-native-community/datetimepicker';
import { render } from 'react-dom';

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

export function Touchable(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  return <DefaultTouchable style={[{ backgroundColor: "transparent" }, style]} {...otherProps} />;
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

  return <DefaultSafeAreaView style={[{ backgroundColor: "transparent" }, style]} {...otherProps} />;
}

export function ScrollView(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  return <DefaultScrollView style={[{ backgroundColor: "transparent" }, style]} {...otherProps} />;
}

export function FlatList(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  return <DefaultFlatList style={[{ backgroundColor: "transparent" }, style]} {...otherProps} />;
}

export function List(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  return <DefaultVirtualizeList style={[{ backgroundColor: "transparent" }, style]} {...otherProps} />;
}

export function RefreshCtrl(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  return <DefaultRefreshControl style={[{ backgroundColor: "transparent" }, style]} {...otherProps} />;
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
        alignItems: "center", borderRadius: 10,
      }
    ]}
    {...otherProps}>
    <Text style={{ fontWeight: "500", }}>Submit</Text>
  </DefaultTouchableOpacity>;
}

export function PrimaryButton(props) {
  const { style, lightColor, darkColor, text, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primaryBtn"
  );

  return <DefaultTouchableOpacity
    style={[
      style,
      {
        width: "98%", paddingVertical: 15,
        alignItems: "center", borderRadius: 10,
        borderColor: backgroundColor, borderStyle: "solid", borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "transparent"
      }
    ]}
    {...otherProps}>
    <Text style={{ fontWeight: "500", color: backgroundColor }}>{text}</Text>
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
  const { style, lightColor, darkColor, label, noLabel, containerStyle, validation, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <View style={[{ width: "98%", marginBottom: 10, backgroundColor: "transparent" }, containerStyle]}>
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
      {validation &&
        <Text style={{ color: "red", fontSize: 12 }}>{validation}</Text>
      }
    </View>
  );
}

export function ChangableInput(props) {
  const { 
    style, lightColor, darkColor, 
    label, noLabel, containerStyle, 
    changableIconButtons, 
    type, values, 
    ...otherProps 
  } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  const [icon, setIcon] = useState(0);
  const [value, setValue] = useState(values[icon]);

  return (
    <View style={[{ width: "98%", marginBottom: 10, backgroundColor: "transparent" }, containerStyle]}>
      {noLabel === false || noLabel == undefined &&
        <Text style={{ fontSize: 18, marginBottom: 10, }}>{label}:</Text>
      }
      <View
        style={[
          { backgroundColor },
          {
            borderStyle: 'solid',
            borderWidth: 1,
            borderRadius: 10,
            width: "100%",
            // paddingHorizontal: 10,
            // paddingVertical: 5,
            overflow: "hidden",
            flexDirection: "row",
          }
        ]}
      >
        <DefaultTextInput
          style={[
            { 
              backgroundColor: "transparent", flex: 0.8, 
              paddingHorizontal: 10,
              paddingVertical: 5,
              color: color
            },
            style
          ]}
          onChangeText={(value) => setValue(value)}
          value={value.toString()}
          {...otherProps}
        />
        <Pressable
          style={{ backgroundColor: "#6890ef", height: "100%", flex: 0.2, paddingVertical: 10 }}
          onPress={() => {
            var state = icon == 0 ? 1 : 0;
            type(state);
            setValue(values[state])
            setIcon(state);
          }}
        >
          <MaterialCommunityIcons style={{ textAlign: "center", }} color="#fff" name={changableIconButtons[icon]} size={18} />
        </Pressable>
      </View>

    </View>
  );

}

export function Autocomplete(props) {
  const { style, lightColor, darkColor, label, noLabel, containerStyle, options, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  const [menuVisibility, setMenuVisibility] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [menuOptions, setOptions] = useState(options);

  return (
    <View style={[{ width: "98%", marginBottom: 10, }, containerStyle]}>
      {noLabel === false || noLabel == undefined &&
        <Text style={{ fontSize: 18, marginBottom: 10, }}>{label}:</Text>
      }
      <DefaultTextInput
        style={[
          { backgroundColor, color },
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
        value={inputVal}
        {...otherProps}
        onFocus={() => setMenuVisibility(false)}
        onChangeText={(value) => {
          setInputVal(value);
          if (value.length > 0) {
            setOptions(options.filter(val => val.toLowerCase().match(value.toLowerCase())));
            setMenuVisibility(true);
          } else {
            setMenuVisibility(false);
          }
        }}
      />
      {menuVisibility && menuOptions.length > 0 &&
        <View style={{ width: "100%", height: "auto", elevation: 2, backgroundColor: "#fff" }}>
          {menuOptions.map((item, index) => (
            <Pressable
              key={index}
              style={{ padding: 10, width: "100%", backgroundColor: "transparent" }}
              onPress={() => { setInputVal(item); setMenuVisibility(false); }}
            >
              <Text style={{ color: "#000" }}>{item}</Text>
            </Pressable>
          ))}
        </View>
      }
    </View>
  );
}

export function Select(props) {
  const { style, lightColor, darkColor, label, options, value, setValue, validation, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  const [showModal, setShowModal] = useState(false);

  const SelectItem = ({ item }) => (
    <Pressable
      style={{ height: 40, fontSize: 18, width: "100%" }}
      onPress={() => {
        setShowModal(!showModal);
        setValue(item);
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
        style={{ flex: 1, justifyContent: "flex-end" }}
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
                  <Text style={{ height: 50, fontSize: 18, paddingVertical: 10, }} >{title}</Text>
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
        <Text style={{ fontSize: 15 }}>{value}</Text>
        <Pressable
          onPress={() => setShowModal(true)}
        >
          <Ionicons name="chevron-forward-outline" size={25} color={color} />
        </Pressable>
      </View>
      {validation &&
        <Text style={{ color: "red", fontSize: 12 }}>{validation}</Text>
      }
    </View>
  );
}

export function DatepickerInput(props) {
  const { style, lightColor, darkColor, label, containerStyle, value, setValue, validation, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

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
        <Text>{value.getMonth() + 1}/{value.getDate()}/{value.getFullYear()}</Text>
        <Pressable
          onPress={() => setShow(true)}
        >
          <Ionicons name='calendar' color={color} size={18} />
        </Pressable>
        {show &&
          <DateTimePicker
            mode='date'
            value={value}
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            maximumDate={new Date()}
            onChange={(evt, date) => { setValue(date); setShow(false); }}
          />
        }
      </View>
      {validation &&
        <Text style={{ color: "red", fontSize: 12 }}>{validation}</Text>
      }
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
          <Text style={{ color: "#fff" }}>{subtitle}</Text>
          <Text style={[appStyles.title, { color: "#fff" }]}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}