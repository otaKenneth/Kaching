import { Text, View, Container, TouchableOpacity, SafeAreaView, ScrollView, RefreshCtrl } from "../../components/Themed";
import * as Progress from "react-native-progress";
import { StyleSheet, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import React from "react";

const BudgetCard = ({ id, budget, colorScheme, navigation }) => {
  const percentage = (budget.consumed / budget.totalBudgeted);
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
  };

  const navTo = {
    head: id > 0 ? 'Budget' : 'Edit',
    screen: id > 0 ? 'Categories' : 'EditCategory'
  };

  return (
    <View
      style={styles.budgetContainer}
    >
      <Progress.Bar 
        progress={percentage} 
        height={30} 
        width={null} 
        color={percentageColor(percentage)} 
        style={{ borderRadius: 15 }} 
      />
      <TouchableOpacity
        activeOpacity={0.6}
        style={{ 
          width: "100%", height: "100%", 
          padding: 10, 
          position: "absolute", top: 0,  
          backgroundColor: "transparent"
        }}
        onPress={() => navigation.navigate(navTo.head, 
          { screen: navTo.screen, 
            params: { 
              id: id, 
              categories: budget.categories, 
              headerName: budget.name, 
              totalBudget: budget.currentBalance 
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
              <Text style={styles.cardText}>{budget.remaining}</Text>
            </Container>
          </Container>
        </Container>
      </TouchableOpacity>
    </View>
  );
}

const wait = (tm) => {
  return new Promise(resolve => setTimeout(resolve, tm))
}

export default function BudgetList({ navigation, route }) {
  const colorScheme = useColorScheme();

  const { budgetList } = route.params;
  const [refresh, refreshing] = React.useState(false)
  const DATA = budgetList;

  React.useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      refreshing(true);
      setTimeout(() => {
        refreshing(false);
      }, 500)
    })
    return unsub;
  }, [navigation])

  const onRefresh = React.useCallback(() => {
    refreshing(true),
    wait(200).then(() => refreshing(false));
  }, [])

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <SafeAreaView style={{ backgroundColor: "transparent" }}>
        <ScrollView 
          style={{ backgroundColor: "transparent" }} 
          horizontal={false}
          refreshControl={
            <RefreshCtrl
              refreshing={refresh}
              onRefresh={onRefresh}
            />
          }
        >
          <View style={[styles.listContainer, { marginBottom: 50 }]}>
            {DATA.map((data, index) => (
              <BudgetCard 
                key={index} 
                id={index} 
                budget={data} 
                colorScheme={colorScheme} 
                navigation={navigation}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignContent: "center",
    justifyContent: "flex-start",
    padding: 5,
  },
  listContainer: {
    height: "auto", width: "100%",
    paddingTop: 15, alignContent: "center",
    flexDirection: "column", flexWrap: "wrap",
    backgroundColor: "transparent"
  },
  budgetContainer: {
    width: "95%", height: 150,
    justifyContent: "flex-start",
    borderRadius: 15,
    marginBottom: 10,
    // overflow: "hidden",
    elevation: 2
  },
  cardText: {
    fontWeight: "600"
  }
});