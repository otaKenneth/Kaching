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
import TransactionList from "../screens/View/TransactionList";
import PayerList from "../screens/View/PayerList";
import PayeeList from "../screens/View/PayeeList";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation }) {
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
      />
      <BottomTab.Screen
        name="Add"
        component={Create}
        options={{
          headerShown: false, title: null, tabBarLabel: "",
          tabBarButton: ({props}) => (
            <CreateButton {...props} navigation={navigation} />
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

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="DashboardTab"
        component={TabOneScreen}
        options={{ headerTitle: "Dashboard", headerLeft: null }}
      />
      <TabOneStack.Screen
        name="Budget"
        component={BudgetList}
        options={{ headerTitle: "Budget List" }}
      />
      <TabOneStack.Screen
        name="Transactions"
        component={TransactionList}
        options={{ headerTitle: "Transaction List" }}
      />
      <TabOneStack.Screen
        name="Payers"
        component={PayerList}
        options={{ headerTitle: "Budget List" }}
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
