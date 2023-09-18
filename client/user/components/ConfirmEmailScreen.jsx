import { SafeAreaView, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import UserTabs from './UserTabs.jsx';
import * as Font from 'expo-font';
import React, { useState } from 'react';

async function loadFonts() {
  await Font.loadAsync({
    'Oswald-Medium': require('../../../assets/fonts/Oswald-Medium.ttf'),  // adjust the path accordingly
  });
};

const ConfirmEmailScreen = () => {
  const [code, setCode] = useState('');

  const onConfirmPressed = () => {
    console.warn('Confirm Pressed');
  };

  const onResendPressed = () => {
    console.warn('Resend Code Pressed');
  };

  const onBackSignInPressed = () => {
    console.warn('Back to Sign In Pressed');
  };


  return (
    <SafeAreaView style={styles.container}>

      <SafeAreaView style={styles.mainContent}>

        <Text style = {styles.text}>Confirm your email</Text>


        <CustomInput placeholder="Enter your confirmation code" value={code} setValue={setCode} />



        <CustomButton
          style={styles.button}
          textStyle={{ ...styles.commonFont, color: '#A9927D' }}
          title="Confirm"
          onPress={onConfirmPressed}
          color="#171412"
        />



        <TouchableOpacity>
          <Text onPress={onResendPressed} style={styles.clickableText}>Resend Code</Text>
        </TouchableOpacity>


        <TouchableOpacity>
          <Text onPress={onBackSignInPressed} style={styles.clickableText}>Back to Sign In</Text>
        </TouchableOpacity>
      </SafeAreaView>



    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'center'
  },

  image: {
    marginLeft: 30,
    width: "60%",
    height: 100,
  },

  container:{
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#D0D3D2',
    paddingBottom: 20,
  },

  button: {
    marginTop: 15,
    width: 350,
    alignSelf: 'center',
  },

  clickableText: {
    marginTop: 30,
    color: '#171412',
    alignSelf: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'Oswald-Medium',
  },

  text: {
    marginLeft: 20,
    marginRight: 33,
    marginBottom: 30,
    fontSize: 23,
    color: '#171412',
    alignSelf: 'center',
    fontFamily: 'Oswald-Bold',
  },

  term: {
    marginLeft: 33,
    marginRight: 33,
    marginBottom: 30,
    marginTop: 10,
    fontSize: 14,
    color: '#171412',
    alignSelf: 'center',
    fontFamily: 'Oswald-Light',
  },

  link: {
    color: '#49111C',

  }
})
export default ConfirmEmailScreen;