import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

import appStyles from "../assets/styles/appStyles";
import Colors from "../constants/Colors";
import { useColorScheme } from "react-native";

export default function HomeScreen({ navigation }) {
  const colorScheme = useColorScheme();
  
  return (
    <View style={[appStyles.container, homeStyle.container]}>
      <Text style={[appStyles.h1Style, homeStyle.h1Style]}>Expense Tracker</Text>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(Colors[colorScheme].tint, true)}
        onPress={() => navigation.navigate('Root')}
      >
        <View style={homeStyle.bigButton}>
          <Text
            style={{ fontSize: 20, fontWeight: "500" }}
          >START</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const homeStyle = StyleSheet.create({
  container: {
    paddingTop: 50,
    justifyContent: "flex-start",
  },
  h1Style: {
    paddingBottom: "75%",
  },
  bigButton: {
    padding: 40,
  }
})