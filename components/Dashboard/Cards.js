import { View, Card } from "../Themed";

import { StyleSheet } from "react-native";

export default function Cards({ }) {
  return (
    <View style={styles.cardContainer}>
      <Card title="Budget" subtitle="Mar 31 - Jun 15" />
      <Card title="Transactions" subtitle="Mar 31 - Jun 15" />
      <Card title="Payers" />
      <Card title="Payees" />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%", marginBottom: 30, flexDirection: "row", justifyContent: "space-around", alignItems: "flex-start", flexWrap: "wrap"
  }
})