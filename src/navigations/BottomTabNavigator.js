import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '@app/screens/Dashboard';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

import BottomTabBG from 'assets/images/bottomTabNavBG(2).png';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName='Dashboard'
      screenOptions={{
        tabBarBackground: () => (
          <Image source={BottomTabBG} style={{ width: '100%' }} />
        ),
        tabBarStyle: {
          width: '100%',
          flex: 0.13,
          elevation: 0, boxShadow: 0,
          backgroundColor: 'transparent',
          borderTopColor: 'transparent'
        },
        tabBarLabelStyle: {
          marginTop: 0, marginBottom: 20
        },
        tabBarIconStyle: {
          width: 90,
          border: 'none'
        },
        tabBarActiveTintColor: "white",
        tabBarHideOnKeyboard: true
      }}
    >
      <BottomTab.Screen
        name="Tab One"
        component={TabOneNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <TabBarIcon 
              name="ios-pie-chart" 
              color={color} 
              size={25}
            />
          )
        }}
      />
      <BottomTab.Screen
        name="Tab Two"
        component={TabOneNavigator}
        options={{
          headerShown: false,
          title: null,
          tabBarLabel: "",
          tabBarIconStyle: {
            position: 'relative',
            top: -30, left: 1,
            height: '100%',
          },
          tabBarIcon: ({color}) => (
            <TabBarIcon 
              name="ios-add" 
              color={color} 
              size={50}
              style={{
                height: 60,
                width: 60,
                backgroundColor: 'orange',
                borderRadius: 30,
                paddingTop: 4, paddingLeft: 3,
                textAlign: 'center', alignItems: 'center', justifyContent: 'center',
              }}
            />
          )
        }}
      />
      <BottomTab.Screen
        name="Tab Three"
        component={TabOneNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <TabBarIcon 
              name="settings" 
              color={color} 
              size={25}
            />
          )
        }}
      />
    </BottomTab.Navigator>
  );
};

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  const { size, style, ...otherProps } = props;
  return <Ionicons size={size} style={{ height: size, width: size, ...style }} {...otherProps} />;
}

const TabOneStack = createNativeStackNavigator();

const TabOneNavigator = ({route, navigation}) => {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTitle: "Dashboard",
          headerLeft: null
        }}
      />
    </TabOneStack.Navigator>
  )
}

export default BottomTabNavigator;