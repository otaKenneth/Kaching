import React, {useState} from "react";
import { Container, Text, View, Pressable, SafeAreaView, ScrollView } from "../../components/Themed";
import Collapsible from 'react-native-collapsible';
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import appStyles from "../../assets/styles/appStyles";

function incomeList (transactions) {
  return transactions.filter(income => income.type == 1);
}

function expenseList (transactions) {
  return transactions.filter(income => income.type == 2);
}

export default function TransactionList ({ route, navigation }) {
  const colorScheme = useColorScheme();
  const [isIncomeCollapse, setIncomeCollapse] = useState(false);
  const [isExpenseCollapse, setExpenseCollapse] = useState(false);

  const { transactions } = route.params;
  console.log(transactions);
  const incomeData = incomeList(transactions);
  const expenseData = expenseList(transactions);

  const Row = ({ data }) => {
    if (data) {
      return (
        <View>
          <Container>
            <Text>{data.description}</Text>
          </Container>
        </View>
      );
    } else {
      return null;
    }
  }

  const IncomeList = () => (
    <Container style={{ height: "auto", width: "100%", }}>
      <View style={[
          appStyles.collapsibleHeader,
          {
            backgroundColor: Colors[colorScheme].headerBackgroundColor
          }
        ]}
        >
        <Text style={{ fontWeight: "500", fontSize: 18, color: Colors[colorScheme].headerTextColor }}>Incomes</Text>
        <Pressable
          style={{ backgroundColor: "transparent" }}
          onPress={() => setIncomeCollapse(isIncomeCollapse ? false:true)}
        >
          {!isIncomeCollapse &&
            <Ionicons size={25} name="chevron-up-outline" color="#fff" />
          }
          {isIncomeCollapse && 
            <Ionicons size={25} name="chevron-down-outline" color="#fff" />
          }
        </Pressable>
      </View>
      <Collapsible collapsed={isIncomeCollapse} duration={1000}>
        <SafeAreaView>
          <ScrollView>
            <View style={[{backgroundColor: Colors[colorScheme].cardBackground, padding: 10 }]}>
              {incomeData.length == 0 &&
                <Text style={{ textAlign: "center" }}>No Result</Text>
              }
              {incomeData.map((data, index) => <Row key={index} data={data} colorScheme={colorScheme} />)}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Collapsible>
    </Container>
  );

  const ExpenseList = () => (
    <Container style={{ height: "auto", width: "100%", }}>
      <View style={[
          appStyles.collapsibleHeader,
          {
            backgroundColor: Colors[colorScheme].headerBackgroundColor
          }
        ]}
        >
        <Text style={{ fontWeight: "500", fontSize: 18, color: Colors[colorScheme].headerTextColor }}>Expenses</Text>
        <Pressable
          style={{ backgroundColor: "transparent" }}
          onPress={() => setExpenseCollapse(isExpenseCollapse ? false:true)}
        >
          {!isExpenseCollapse &&
            <Ionicons size={25} name="chevron-up-outline" color="#fff" />
          }
          {isExpenseCollapse && 
            <Ionicons size={25} name="chevron-down-outline" color="#fff" />
          }
        </Pressable>
      </View>
      <Collapsible collapsed={isExpenseCollapse} duration={1000}>
        <View style={[{backgroundColor: Colors[colorScheme].cardBackground, padding: 10 }]}>
          {expenseData.length == 0 &&
            <Text style={{ textAlign: "center" }}>No Result</Text>
          }
          {expenseData.map((data, index) => <Row key={index} data={data} colorScheme={colorScheme} />)}
        </View>
      </Collapsible>
    </Container>
  )

  return (
    <View style={{ height: "auto", width: "100%", padding: 10, backgroundColor: "transparent" }}>
      <SafeAreaView style={{ backgroundColor: "transparent" }}>
        <ScrollView style={{ backgroundColor: "transparent" }}>
          <IncomeList />
          <Container
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <ExpenseList />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});