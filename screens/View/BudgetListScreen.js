import React from "react";
import { 
  Text, 
  View, 
  Container, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  RefreshCtrl, 
  FlatList 
} from "../../components/Themed";
import * as Progress from "react-native-progress";
import { StyleSheet, useColorScheme } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useIsFocused } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import { deleteUserBudget, getUserBudgetCategories, getUserBudgets } from "../../hooks/firebase";
import { sortCategoriesById } from "../../hooks/categories";

const BudgetCard = ({ i, id, budget, user, colorScheme, refreshing, navigation }) => {
  const [categories, setCategories] = React.useState([]);
  if (budget.categories.length == 0) {
    getUserBudgetCategories(user, budget.did).then(res => {
      budget.categories = sortCategoriesById(res);
      setCategories(budget.categories)
    }).catch(error => {
      console.log(error.message);
    })
  }
  const percentage = (parseFloat(budget.consumed) / parseFloat(budget.totalBudgeted));
  const percentageColor = (p) => {
    if (p >= 0.0 && p < 0.40) {
      return { light: "#00eb0a", dark: "#219e0b" }[colorScheme];
    } else if (p >= 0.40 && p < 0.70) {
      return { light: "#f8c509", dark: "#bab104" }[colorScheme];
    } else if (p >= 0.70 && p <= 1) {
      return { light: "#f19a00", dark: "#e09814" }[colorScheme];
    } else if (p > 1) {
      return { light: "#ff6363", dark: "#960808" }[colorScheme];
    }
  }
  const [budgetW, setBudgetW] = React.useState(400);

  const navTo = {
    head: i > 0 ? 'Budget' : 'Edit',
    screen: i > 0 ? 'Categories' : 'EditCategory'
  };

  return (
    <SafeAreaView
      style={styles.budgetContainer}
      onLayout={(ev) => {
        var {x,y,width,height} = ev.nativeEvent.layout;
        setBudgetW(width);
      }}
    >
      <ScrollView
        horizontal={true}
        style={{ flexDirection: "row" }}
      >
        <View
          style={{ width: budgetW, justifyContent: "flex-start" }}
        >
          <Progress.Bar 
            progress={percentage} 
            height={28} 
            width={null} 
            color={percentageColor(percentage)} 
            style={{ borderRadius: 15 }} 
          />
          <TouchableOpacity
            activeOpacity={0.6}
            style={{ 
              width: "100%", height: "100%", 
              position: "absolute", top: 0, padding: 10,
              backgroundColor: "transparent"
            }}
            disabled={categories.length == 0}
            onPress={() => navigation.navigate(navTo.head, 
              { screen: navTo.screen, 
                params: { 
                  id: budget.id, 
                  isCategsDefault: budget.isDefaultCategs,
                  categories: categories, 
                  headerName: budget.name, 
                  totalBudget: budget.currentBalance,
                } 
              })
            }
          >
            <Container style={{ width: "100%" }}>
              <Container style={{ width: "100%", height: 10, marginBottom: 30, justifyContent: "center" }}>
                <Text style={{ textAlign: "center", position: "absolute", width: "100%", fontWeight: "900" }}>{(percentage * 100).toFixed(2)}%</Text>
              </Container>
              <Container>
                <Text style={[styles.cardText, { fontSize: 25 }]}>{budget.name}</Text>
              </Container>
              <Container style={{ flexDirection: "row", width: "100%", justifyContent: "flex-start" }}>
                <Container style={{ marginRight: 10 }}>
                  <Text style={styles.cardText}>Consumed:</Text>
                  <Text style={styles.cardText}>{budget.consumed}</Text>
                </Container>
                <Container style={{ marginRight: 10 }}>
                  <Text style={styles.cardText}>Total Budget:</Text>
                  <Text style={styles.cardText}>{budget.totalBudgeted}</Text>
                </Container>
                <Container style={{ marginRight: 10 }}>
                  <Text style={styles.cardText}>Remaining Balance:</Text>
                  <Text style={styles.cardText}>{budget.remaningBalance}</Text>
                </Container>
              </Container>
            </Container>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.cardButton}
          onPress={() => {
            navigation.navigate('Edit', {
              screen: "EditBudget",
              params: {
                defaultBudget: budget,
                defaultCategories: categories
              }
            })
          }}
        >
          <Feather name="edit-2" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.cardButton, {
            backgroundColor: "#fc626a" 
          }]}
          onPress={() => {
            deleteUserBudget(user, id).then(() => {
              refreshing(true)
            }).catch(error => {
              console.log(error.message);
            })
          }}
        >
          <Feather name="trash-2" size={24} color="black" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function BudgetList({ navigation, route }) {
  const colorScheme = useColorScheme();
  const { budgets, user } = route.params;
  const [ refreshing, setRefresh] = React.useState(false)
  const focused = useIsFocused();

  React.useEffect(() => {
    if (focused && user) {
      setRefresh(true);
      getUserBudgets(user).then(res => {
        let sortedRes = res.sort( (a,b) => b.id > a.id);
        navigation.setParams({
          budgets: sortedRes,
          user: user,
        })
        setRefresh(false);
      })
    }
  }, [focused])

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    getUserBudgets(user).then(res => {
      let sortedRes = res.sort( (a,b) => b.id > a.id);
      navigation.setParams({
        budgets: sortedRes,
        user: user,
      })
      setRefresh(false);
    })
  }, [user])

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <SafeAreaView style={{ backgroundColor: "transparent" }}>
        <FlatList
          style={styles.listContainer} 
          refreshControl={
            <RefreshCtrl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          data={budgets}
          renderItem={(data, index) => (
            <BudgetCard
              key={index} 
              i={data.index}
              id={data.item.id} 
              budget={data.item} 
              user={user}
              colorScheme={colorScheme} 
              refreshing={refreshing}
              navigation={navigation}
            />
          )}
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, width: "100%",
    backgroundColor: "transparent",
    alignContent: "center",
    justifyContent: "flex-start",
    padding: 5,
  },
  listContainer: {
    height: "auto", width: "100%",
    backgroundColor: "transparent"
  },
  budgetContainer: {
    width: "95%", height: 150,
    alignSelf: "center", 
    borderRadius: 15,
    marginBottom: 10,
    elevation: 2,
    overflow: "hidden",
    backgroundColor: "white"
  },
  cardText: {
    fontWeight: "600"
  },
  cardButton: {
    height: "100%", paddingHorizontal: 20,
    justifyContent: "center", 
    alignContent: "center",
    backgroundColor: "#fcba62" 
  }
});