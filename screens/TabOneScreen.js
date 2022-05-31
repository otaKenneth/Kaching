import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, TouchableOpacity } from "../components/Themed";

import { Ionicons } from "@expo/vector-icons";
import appStyles from "../assets/styles/appStyles";
import Accounts from "../components/Accounts";

export default function TabOneScreen() {
  return (
    <View style={[styles.container, { paddingTop: 10 }]}>
      <Accounts />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
