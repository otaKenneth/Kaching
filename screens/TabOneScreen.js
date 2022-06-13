import { Text, View, TouchableOpacity, ScrollView, Card } from "../components/Themed";
import Accounts from "../components/Dashboard/Accounts";
import { Ionicons } from "@expo/vector-icons";

import { StyleSheet } from "react-native";
import appStyles from "../assets/styles/appStyles";
import Cards from "../components/Dashboard/Cards";
import React from "react";

export default function TabOneScreen({ route, navigation }) {
  const { accounts, budgets, payers, payees, categories, transactions } = route.params;
  const [refresh, setRefresh] = React.useState(false);
  
  React.useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      setRefresh(true);
      setTimeout(() => {
        setRefresh(false);
      }, 500)
    })
    return unsub;
  }, [navigation])

  return (
    <ScrollView>
      <View style={[styles.container, { paddingTop: 10 }]}>
        <Accounts accounts={accounts} re_fresh={refresh} />
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
        <Cards 
          navigation={navigation}
          cardProps={{
            budgets: budgets,
            payees: payees,
            payers: payers,
            categories: categories,
            transactions: transactions
          }}
        />
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
