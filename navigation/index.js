// If you are not familiar with React Navigation, check out the "Fundamentals" guide:
// https://reactnavigation.org/docs/getting-started
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import NotFoundScreen from "../screens/NotFoundScreen";
import HomeScreen from "../screens/HomeScreen";

import CreateAccount from "../screens/Create/AccountScreen";
import CreatePayee from "../screens/Create/PayeeScreen";
import CreatePayer from "../screens/Create/PayerScreen";
import CreateBudget from "../screens/Create/BudgetScreen";
import CreateTransaction from "../screens/Create/TrasactionScreen";
import CreateTransfer from "../screens/Create/TransferScreen";

import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ headerShown: true, headerTitle: "New Account" }} />
      <Stack.Screen name="CreateTransfer" component={CreateTransfer} options={{ headerShown: true, headerTitle: "Make a Transfer" }} />
      <Stack.Screen name="CreateBudget" component={CreateBudget} options={{ headerShown: true, headerTitle: "New Budget" }} />
      <Stack.Screen name="CreateTransaction" component={CreateTransaction} options={{ headerShown: true, headerTitle: "New Transaction" }} />
      <Stack.Screen name="CreatePayee" component={CreatePayee} options={{ headerShown: true, headerTitle: "New Payee" }} />
      <Stack.Screen name="CreatePayer" component={CreatePayer} options={{ headerShown: true, headerTitle: "New Payer" }} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
