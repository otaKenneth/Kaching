import { Text, View } from "../../components/Themed";
import { StyleSheet } from "react-native";

export default function BudgetList ({ navigation }) {
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