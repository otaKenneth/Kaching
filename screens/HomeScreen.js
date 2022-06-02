import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

import appStyles from "../assets/styles/appStyles";
import Colors from "../constants/Colors";
import { useColorScheme } from "react-native";

export default function HomeScreen({ navigation }) {
  const colorScheme = useColorScheme();
  
  return (
    <View style={[appStyles.container, homeStyle.container, {justifyContent: "space-between"}]}>
      <View style={{  }}>
        <Text style={[appStyles.h1Style, { marginBottom: 0}]}>Kaching:</Text>
        <Text style={[appStyles.h2Style, { marginBottom: 0 }]}>Budget Manager</Text>
      </View>
      <View style={{ marginBottom: 80 }}>
        <TouchableNativeFeedback
          style={{ alignContent: "center", justifyContent: "center" }}
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
    </View>
  );
}

const homeStyle = StyleSheet.create({
  container: {
    paddingTop: 50,
    justifyContent: "flex-start",
  },
  bigButton: {
    padding: 40,
  }
})