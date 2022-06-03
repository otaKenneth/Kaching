import { Text, View, Container, TouchableOpacity, SafeAreaView, ScrollView } from "../../components/Themed";
import { StyleSheet, useColorScheme } from "react-native";
import budgetList from "../../hooks/budgetList";
import Colors from "../../constants/Colors";

export default function BudgetList ({ navigation }) {
  const colorScheme = useColorScheme();
  const DATA = budgetList;

  const BudgetCard = ({ budget, colorScheme }) => {
    const background = {
      backgroundColor: Colors[colorScheme].tint
    }

    return (
      <View
        style={styles.budgetContainer}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          style={[background, { width: "100%", height: "100%", padding: 15}]}
          onPress={() => navigation.navigate('Dashboard', { screen: "Transactions", params: {transactions: budget.transactions }})}
        >
          <Container style={{ width: "100%", marginBottom: 17 }}>
            <Container>
              <Text style={{ color: "#000", fontSize: 25, fontWeight: "400" }}>{budget.name}</Text>
            </Container>
            <Container style={{ flexDirection: "row", width: "100%", justifyContent: "flex-start" }}>
              <Container style={{ marginRight: 10 }}>
                <Text style={{ color: "#000", }}>Consumed:</Text>
                <Text style={{ color: "#000", }}>{budget.consumed}</Text>
              </Container>
              <Container style={{ marginRight: 10 }}>
                <Text style={{ color: "#000", }}>Total Budget:</Text>
                <Text style={{ color: "#000", }}>{budget.totalBudgeted}</Text>
              </Container>
              <Container style={{ marginRight: 10 }}>
                <Text style={{ color: "#000", }}>Remaining Balance:</Text>
                <Text style={{ color: "#000", }}>{budget.remaining}</Text>
              </Container>
            </Container>
          </Container>
          <Container style={{ backgroundColor: "#fff", width: "100%", height: 30 }} className="progressBar">
            <Container style={{ paddingVertical: 5 }}>
              <Text style={{ textAlign: "center" }}>99%</Text>
            </Container>
          </Container>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView horizontal={false}>
          <View style={styles.listContainer}>
            {DATA.map((data, index) => <BudgetCard key={index} budget={data} colorScheme={colorScheme} />)}
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
    borderRadius: 15, elevation: 10, 
    marginBottom: 10, 
    overflow: "hidden",
  }
});