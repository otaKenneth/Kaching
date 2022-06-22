import { Text, View, ScrollView, RefreshCtrl } from "../components/Themed";
import Accounts from "../components/Dashboard/Accounts";

import { StyleSheet } from "react-native";
import Cards from "../components/Dashboard/Cards";
import React from "react";
import { getUserAccounts, getUserBudgets } from "../hooks/firebase";
import { useIsFocused } from "@react-navigation/native";

export default function TabOneScreen({ route, navigation }) {
  const { userData, setUserData } = route.params;
  const [refresh, setRefresh] = React.useState(false);
  const focused = useIsFocused();

  React.useEffect(() => {
    if (focused) {
      setRefresh(true);
      getUserAccounts(userData.user).then(res => {
        setUserData({
          ...userData,
          accounts: res
        })
        getUserBudgets(userData.user).then(res => {
          setUserData({
            ...userData,
            budgets: res
          })
          setRefresh(false);
        })
      }).catch(err => {
        setRefresh(false);
      })
    }
  }, [focused])

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    getUserAccounts(userData.user).then(accounts => {
      setUserData({
        ...userData,
        accounts: accounts
      })
      getUserBudgets(userData.user).then(budgets => {
        setUserData({
          ...userData,
          budgets: budgets
        })
        setRefresh(false);
      })
    }).catch(err => {
      setRefresh(false);
    })
  }, [userData])

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
          cardProps={userData}
        />
        <Accounts accounts={userData.accounts} />
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
