import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ValetTabs from './client/valet/components/ValetTabs';
import UHP from './client/user/components/UserHomePage';
import Welcome from './client/user/components/Welcome';
import React, { useState } from 'react';
// import { router } from 'expro-router';
import CarManage from './client/valet/components/CarManage.jsx';

export default function App() {
  const [ emp, setEmp ] = useState(true);
  return (
    <CarManage />
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
