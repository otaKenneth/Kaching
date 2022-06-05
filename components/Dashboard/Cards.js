import { View, Card } from "../Themed";

import { StyleSheet } from "react-native";

export default function Cards({ navigation }) {
  return (
    <View style={styles.cardContainer}>
      <Card 
        title="Budgets" 
        subtitle="Mar 31 - Jun 15" 
        onPress={() => navigation.navigate('Dashboard', {screen: 'Budget'})} 
      />
      <Card 
        title="Transactions" 
        subtitle="Mar 31 - Jun 15"
        onPress={() => navigation.navigate('Dashboard', {screen: 'Transactions'})} 
      />
      <Card
        title="Payers"
        onPress={() => navigation.navigate('Dashboard', {screen: 'Payers'})} 
      />
      <Card 
        title="Payees"
        onPress={() => navigation.navigate('Dashboard', {screen: 'Payees'})} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%", marginBottom: 30, flexDirection: "row", justifyContent: "space-around", alignItems: "flex-start", flexWrap: "wrap"
  }
})