import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Auth from '@app/screens/Auth';
import Dashboard from '@app/screens/Dashboard';
import useAuthentication from 'src/hooks/useAuthentication';

const Navigation = () => {
  const user = useAuthentication();
  
  if (user == null) {
    return (
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    )
  }
};

const AuthStack = createNativeStackNavigator();

const AuthNavigation = ({navigation}) => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen
        name="Auth"
        component={Auth}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  )
}

const Stack = createNativeStackNavigator();

const RootNavigation = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }} >
      <Stack.Screen
        name="Root"
        component={Dashboard}
      />
    </Stack.Navigator>
  )
}

export default Navigation;