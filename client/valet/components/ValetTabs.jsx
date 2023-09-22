import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import HomeScreen from "./HomeScreen";
import Icon from "react-native-ico-material-design";
import { Ionicons } from "@expo/vector-icons";
import CameraScreen from "./CameraScreen";
import CarsScreen from "./CarsScreen";
import { StatusBar } from "react-native";
import CalendarScreen from "./CalendarScreen";
import {SafeAreaView, View, StyleSheet} from 'react-native';
import SignOutScreen from './SignOutScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';


export default ValetTabs = () => {
  const [garageId, setGarageId] = useState(1);
  const route = useRoute();
  useEffect(() => {
    if (route.params) {
      setGarageId(route.params.data);
    }
  }, [route]);

  const theme = useTheme();
  theme.colors.secondaryContainer = "transparent";

  const navTheme = {
    colors: {
      background: "white",
    },
  };

  const Tab = createMaterialBottomTabNavigator();

  return (
    <View style={styles.view}>
    {/* // <NavigationContainer theme={navTheme}> */}
      <StatusBar barStyle="light-content" translucent={true} />
      <Tab.Navigator
        barStyle={{ backgroundColor: "black" }}
        activeColor="white"
        inactiveColor="gray"
      >
        {/* <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name="md-home"
                  size={24}
                  color={tabInfo.focused ? "white" : "gray"}
                />
              );
            },
          }}
        /> */}
        <Tab.Screen
          name="Cars"
          initialParams={
          {garage: garageId}
          }
          component={CarsScreen}
          options={{
            tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name="car"
                  size={24}
                  color={tabInfo.focused ? "white" : "gray"}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="QR Scan"
          component={CameraScreen}
          options={{
            tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name="qr-code-outline"
                  size={24}
                  color={tabInfo.focused ? "white" : "gray"}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name="calendar"
                  size={24}
                  color={tabInfo.focused ? "white" : "gray"}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Sign Out Screen"
          component={SignOutScreen}
          options={{
            tabBarLabel: 'Sign Out',
            barTintColor: 'white',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="exit-run" color={color} size={32} />
            )
          }}
        />
      </Tab.Navigator>
    {/* // </NavigationContainer> */}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex:1
  }
})