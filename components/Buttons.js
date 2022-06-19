import {
  useColorScheme,
  Text,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";

function useThemeColor(props, colorName) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function SubmitButton(props) {
  const { style, lightColor, darkColor, text, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primaryBtn"
  );

  return <TouchableOpacity
    style={[
      { backgroundColor },
      style,
      {
        paddingVertical: 15,
        alignItems: "center", 
        borderRadius: 35,
      }
    ]}
    {...otherProps}>
    <Text style={{ fontWeight: "500", color: "#fff" }}>{text}</Text>
  </TouchableOpacity>;
}

export function PrimaryButton(props) {
  const { style, lightColor, darkColor, text, onPress, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    props.disabled ? "disabledBtn":"primaryBtn"
  );

  return <TouchableOpacity
    style={[
      style,
      { backgroundColor },
      {
        paddingVertical: 15,
        alignItems: "center", borderRadius: 10,
      },
    ]}
    onPress={onPress}
    {...otherProps}>
    <Text style={{ fontWeight: "500", color: "#fff" }}>{text}</Text>
  </TouchableOpacity>;
}

export function SecondaryButton(props) {
  const { style, lightColor, darkColor, text, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primaryBtn"
  );

  return <TouchableOpacity
    style={[
      style,
      {
        paddingVertical: 15,
        alignItems: "center", borderRadius: 10,
        borderColor: backgroundColor, borderStyle: "solid", borderWidth: 1,
        backgroundColor: "transparent"
      }
    ]}
    {...otherProps}>
    <Text style={{ fontWeight: "500", color: backgroundColor }}>{text}</Text>
  </TouchableOpacity>;
}