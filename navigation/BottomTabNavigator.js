// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";

import Colors from "../constants/Colors";
import CreateButton from "../components/CreateButton";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";

import BudgetList from "../screens/View/BudgetListScreen";
import TransactionList from "../screens/View/TransactionListScreen";
import PayerList from "../screens/View/PayerListScreen";
import PayeeList from "../screens/View/PayeeListScreen";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({ route, navigation }) {
  const { accounts, budgets, payers, payees, categories, transactions } = route.params;
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Dashboard"
        component={TabOneNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-pie-chart" color={color} />
          ),
        }}
        initialParams={{
          accounts: accounts,
          budgets: budgets,
          payers: payers,
          payees: payees,
          categories: categories,
        }}
      />
      <BottomTab.Screen
        name="Add"
        component={Create}
        options={{
          headerShown: false, title: null, tabBarLabel: "",
          tabBarButton: () => (
            <CreateButton 
              createBtnProps={{
                accounts: accounts,
                budgets: budgets,
                payers: payers,
                payees: payees,
                categories: categories,
                transactions: transactions
              }}
              navigation={navigation}
            />
          )
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={TabTwoNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-settings" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  return <Ionicons size={20} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();

function TabOneNavigator({route}) {
  const { accounts, budgets, payers, payees, categories, transactions } = route.params;
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="DashboardTab"
        component={TabOneScreen}
        options={{ headerTitle: "Dashboard", headerLeft: null }}
        initialParams={{
          accounts: accounts,
          budgets: budgets,
          payers: payers,
          payees: payees,
          categories: categories,
          transactions: transactions
        }}
      />
      <TabOneStack.Screen
        name="Budget"
        component={BudgetNavigator}
        options={{ headerTitle: "Budget List", headerShown: false }}
      />
      <TabOneStack.Screen
        name="Transactions"
        component={TransactionList}
        options={{ headerTitle: "Transaction List" }}
      />
      <TabOneStack.Screen
        name="Payers"
        component={PayerList}
        options={{ headerTitle: "Payer List" }}
      />
      <TabOneStack.Screen
        name="Payees"
        component={PayeeList}
        options={{ headerTitle: "Payee List" }}
      />
    </TabOneStack.Navigator>
  );
}

function Create () {
  return (null);
}

const BudgetStack = createStackNavigator();
import CategoryList from "../screens/View/CategoryListScreen";
import { acc } from "react-native-reanimated";

function BudgetNavigator() {
  return (
    <BudgetStack.Navigator>
      <BudgetStack.Screen
        name="Budgets"
        component={BudgetList}
        options={{ headerTitle: "Budgets" }}
      />
      <BudgetStack.Screen
        name="Categories"
        component={CategoryList}
        options={{ headerTitle: "Name" }}
      />
    </BudgetStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="SettingsTab"
        component={TabTwoScreen}
        options={{ headerTitle: "Settings", headerLeft: null }}
      />
    </TabTwoStack.Navigator>
  );
}
