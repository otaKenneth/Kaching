import { Text, View } from "../../components/Themed";
import { StyleSheet } from "react-native";

export default function PayerList ({ navigation, route }) {
  const { payees } = route.params;
  const DATA = payees;
  
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  }
});