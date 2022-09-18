import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Auth from '@app/screens/Auth';

const Navigation = () => {
  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
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

export default Navigation;