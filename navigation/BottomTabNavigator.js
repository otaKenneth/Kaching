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
        component={BottomTabNavigator}
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
    </TabOneStack.Navigator>
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
