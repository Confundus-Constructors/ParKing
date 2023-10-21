import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../components/Welcome";
import SignUpScreen from "../components/SignUpScreen";
import ConfirmEmailScreen from "../components/ConfirmEmailScreen";
import ForgotPasswordScreen from "../components/ForgotPasswordScreen";
import NewPasswordScreen from "../components/NewPasswordScreen";
import UHP from "../components/UserHomePage";
import ValetTabs from "../../valet/components/ValetTabs";
import UserTabs from "../components/UserTabs";
import { useTheme } from 'react-native-paper';
import ResTabs from '../components/ResTabs.jsx';
import Reserve from '../components/UserReserve.jsx';
import MyMap from '../../valet/components/HomeComponents/MyMap';
import {AuthProvider} from '../../valet/components/HomeComponents/Auth';
import AppWrapper from '../../valet/components/HomeComponents/DynamicTabs'

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const theme = useTheme();
  const navTheme = {
    colors: {
      background: "white"
    }
  };

  return (
    <AuthProvider>
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
       <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
       <Stack.Screen
          name="ConfirmEmailScreen"
          component={ConfirmEmailScreen}
        />
          <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />


        <Stack.Screen name="UserTabs" component={UserTabs} />
        <Stack.Screen name="VHP" component={ValetTabs} />
        <Stack.Screen name="ResTabs" component={ResTabs} />
        <Stack.Screen name="MyMap" component={MyMap} />
        <Stack.Screen name="Account" component={AppWrapper} />
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
};

export default Navigation;
