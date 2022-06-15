import { Text, View, TouchableOpacity, ScrollView, Card, RefreshCtrl } from "../components/Themed";
import Accounts from "../components/Dashboard/Accounts";
import { Ionicons } from "@expo/vector-icons";

import { StyleSheet } from "react-native";
import appStyles from "../assets/styles/appStyles";
import Cards from "../components/Dashboard/Cards";
import React from "react";
import { getUser } from "../hooks/firebase";
import { useAuthentication } from "../hooks/useAuthentication";
import { useIsFocused } from "@react-navigation/native";

export default function TabOneScreen({ route, navigation }) {
  const { accounts, budgets, payers, payees, categories, transactions } = route.params;
  const [refresh, setRefresh] = React.useState(false);
  const user = useAuthentication();
  const focused = useIsFocused();

  React.useEffect(() => {
    if (focused && user) {
      setRefresh(true);
      getUser(user).then((res) => {
        const data = res.data();
        navigation.setParams({
          accounts: data.accounts,
          budgets: data.budgets,
          payers: data.payers, 
          payees: data.payees, 
          categories: data.categories, 
          transactions: data.transactions
        })
        setRefresh(false)
      }).catch(error => {
        console.log(error.message);
      });
    }
  }, [focused, user])

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    getUser(user).then((res) => {
      const data = res.data();
      navigation.setParams({
        accounts: data.accounts,
        budgets: data.budgets,
        payers: data.payers, 
        payees: data.payees, 
        categories: data.categories, 
        transactions: data.transactions
      })
      setRefresh(false)
    }).catch(error => {
      console.log(error.message);
    });
  }, [user])

  return (
    <ScrollView
      refreshControl={
        <RefreshCtrl
          refreshing={refresh}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={[styles.container, { paddingTop: 10, paddingBottom: 35 }]}>
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
        <Accounts accounts={accounts} reFresh={refresh} />
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
