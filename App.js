import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ValetTabs from './client/valet/components/ValetTabs';
import UHP from './client/user/components/UserHomePage';
import Welcome from './client/user/components/Welcome';
import SignUpScreen from './client/user/components/SignUpScreen';
import React, { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

// import { router } from 'expro-router';
import CarManage from './client/valet/components/CarManage.jsx';

export default function App() {
  const [isFontLoaded, setFontLoaded] = useState(false);
  const [ emp, setEmp ] = useState(true);

  const loadFonts = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
      await Font.loadAsync({
        'Oswald-Medium': require('./assets/fonts/Oswald-Medium.ttf'),
        'Oswald-Regular': require('./assets/fonts/Oswald-Regular.ttf'),
        'Oswald-Light': require('./assets/fonts/Oswald-Light.ttf'),
        'Oswald-Bold': require('./assets/fonts/Oswald-Bold.ttf'),
        'Oswald-ExtraLight': require('./assets/fonts/Oswald-ExtraLight.ttf'),
        'Oswald-SemiBold': require('./assets/fonts/Oswald-SemiBold.ttf'),
        'Oswald-VariableFont_wght': require('./assets/fonts/Oswald-VariableFont_wght.ttf'),
      });
      setFontLoaded(true);
    } catch (e) {
      console.warn(e);
    } finally {
      SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!isFontLoaded) {
    return null; // Return null or an empty view, since the splash screen is still visible
  }

  return (
    // <Welcome />
    <SignUpScreen />
    // <CarManage />
    // <ValetTabs/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
