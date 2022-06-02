import { Text, View, TouchableOpacity, ScrollView, Card } from "../components/Themed";
import Accounts from "../components/Dashboard/Accounts";
import { Ionicons } from "@expo/vector-icons";

import { StyleSheet } from "react-native";
import appStyles from "../assets/styles/appStyles";
import Cards from "../components/Dashboard/Cards";

export default function TabOneScreen({ navigation }) {
  return (
    <ScrollView>
      <View style={[styles.container, { paddingTop: 10 }]}>
        <Accounts />
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <View>
          <Text>Charts</Text>
        </View>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Cards navigation={navigation} />
      </View>
    </ScrollView>
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
