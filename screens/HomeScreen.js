import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import * as Progress from "react-native-progress";
import appStyles from "../assets/styles/appStyles";

export default function HomeScreen({ navigation }) {
  return (
    <View style={[appStyles.container, homeStyle.container, {justifyContent: "space-between"}]}>
      <View style={{  }}>
        <Text style={[appStyles.h1Style, { marginBottom: 0}]}>Kaching:</Text>
        <Text style={[appStyles.h2Style, { marginBottom: 0 }]}>Budget Manager</Text>
      </View>
      <View style={{ marginBottom: 80 }}>
        <Progress.Circle size={150} indeterminate={true} />
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