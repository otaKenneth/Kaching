import { View, Card } from "../Themed";

import { StyleSheet } from "react-native";

export default function Cards({ navigation, cardProps }) {
  const budgetLen = getLen(cardProps.budgets);
  const payerLen = getLen(cardProps.payers);
  const payeeLen = getLen(cardProps.payees);

  function getLen (object) {
    return object.length;
  }

  return (
    <View style={styles.cardContainer}>
      {budgetLen > 0 &&
        <Card 
        title="Budgets" 
        // subtitle="Mar 31 - Jun 15" 
        onPress={() => navigation.navigate('Dashboard', {screen: 'Budget', params: {budgetList: cardProps.budgets}})} 
        />
      }
      {budgetLen > 0 &&
        <Card 
          title="Transactions" 
          subtitle="Mar 31 - Jun 15"
          onPress={() => navigation.navigate('Dashboard', {screen: 'Transactions', params: {transactions: cardProps.budgets[0].transactions}})} 
        />
      }
      {payerLen > 0 &&
        <Card
          title="Payers"
          onPress={() => navigation.navigate('Dashboard', {screen: 'Payers', params: {payers: cardProps.payers}})} 
        />
      }
      {payeeLen > 0 &&
        <Card 
          title="Payees"
          onPress={() => navigation.navigate('Dashboard', {screen: 'Payees', params: {payees: cardProps.payees}})} 
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%", marginBottom: 30, flexDirection: "row", justifyContent: "space-around", alignItems: "flex-start", flexWrap: "wrap"
  }
})