import { StyleSheet } from "react-native";

import { Text, View, TouchableOpacity } from "../components/Themed";

export default function TabTwoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate('Auth', {screen: 'Login'})}
        style={{ width: "100%", padding: 10, elevation: 2 }}
      >
        <Text style={{ fontSize: 15 }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
