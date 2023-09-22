import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

export default SignOut = ({navigation}) => {

  const signOut = () => {
    navigation.navigate('Welcome')
  }

  return (
    <SafeAreaView style={styles.container}>
    <TouchableOpacity style={styles.button}onPress={signOut}>
      <Text style={styles.text}>Sign Out</Text>
    </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A9927D',
    height: '10%',
    width: '50%',
    borderRadius: 20,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25
  }

})