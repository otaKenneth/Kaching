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
import CreateExpense from "../screens/Create/ExpenseScreen";
import CreateIncome from "../screens/Create/IncomeScreen";
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
      <Stack.Screen name="Add" component={Create} />
      <Stack.Screen name="Edit" component={Edit} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}

const CreateStack = createStackNavigator();

function Create ({ navigation }) {
  return (
    <CreateStack.Navigator>
      <CreateStack.Screen 
        name="CreateAccount" 
        component={CreateAccount} 
        options={{ 
          headerShown: true, 
          headerTitle: "New Account" 
        }}
      />
      <CreateStack.Screen 
        name="CreateTransfer" 
        component={CreateTransfer} 
        options={{ 
          headerShown: true, 
          headerTitle: "Make a Transfer" 
        }}
      />
      <CreateStack.Screen name="CreateBudget" component={CreateBudget} options={{ headerShown: true, headerTitle: "New Budget" }} />
      <CreateStack.Screen 
        name="CreateExpense" 
        component={CreateExpense} 
        options={{ 
          headerShown: true, 
          headerTitle: "New Expense" 
        }}
      />
      <CreateStack.Screen 
        name="CreateIncome" 
        component={CreateIncome} 
        options={{ 
          headerShown: true, 
          headerTitle: "New Income" 
        }}
      />
      <CreateStack.Screen name="CreatePayee" component={CreatePayee} options={{ headerShown: true, headerTitle: "New Payee" }} />
      <CreateStack.Screen name="CreatePayer" component={CreatePayer} options={{ headerShown: true, headerTitle: "New Payer" }} />
    </CreateStack.Navigator>
  )
}

const EditStack = createStackNavigator();

import CategoryList from "../screens/Edit/CategoryListScreen";

function Edit ({navigation}) {
  return (
    <EditStack.Navigator>
      <EditStack.Screen
        name="EditCategory"
        component={CategoryList}
        options={{
          headerShown: true,
          headerTitle: "Edit Category List"
        }}
      />
    </EditStack.Navigator>
  );
}