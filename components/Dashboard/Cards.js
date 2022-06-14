import { View, Card } from "../Themed";

import { StyleSheet } from "react-native";

export default function Cards({ navigation, cardProps }) {
  return (
    <View style={styles.cardContainer}>
      <Card 
        title="Budgets" 
        onPress={() => 
          navigation.navigate('Dashboard', 
          {
            screen: 'Budget', 
            params: {
              screen: 'Budgets',
              params: {
                budgetList: cardProps.budgets
              }
            }
          })
        } 
      />
      <Card 
        title="Transactions" 
        onPress={() => 
          navigation.navigate('Dashboard', 
          {
            screen: 'Transactions', 
            params: {
              transactions: cardProps.budgets.length > 0 ? cardProps.budgets[0].transactions:[]
            }
          })
        } 
      />
      <Card
        title="Payers"
        onPress={() => 
          navigation.navigate('Dashboard', 
          {
            screen: 'Payers', 
            params: {
              payers: cardProps.payers
            }
          })
        } 
      />
      <Card 
        title="Payees"
        onPress={() => 
          navigation.navigate('Dashboard', 
          {
            screen: 'Payees', 
            params: {
              payees: cardProps.payees
            }
          })
        } 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%", marginBottom: 30, flexDirection: "row", justifyContent: "space-around", alignItems: "flex-start", flexWrap: "wrap"
  }
})