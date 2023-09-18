import { SafeAreaView, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import UserTabs from './UserTabs.jsx';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

async function loadFonts() {
  await Font.loadAsync({
    'Oswald-Medium': require('../../../assets/fonts/Oswald-Medium.ttf'),  // adjust the path accordingly
  });
};

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  const onRegisterPressed = () => {
    navigation.navigate('ConfirmEmailScreen');
  };

  const onTermOfUsePressed = () => {
    console.warn('Term of Use Pressed');
  };

  const onPrivacyPressed = () => {
    console.warn('Privacy Pressed');
  };

  const onGoSignInPressed = () => {
    navigation.navigate('Welcome');
  };


  return (
    <SafeAreaView style={styles.container}>

      <SafeAreaView style={styles.mainContent}>

        <Text style = {styles.text}>Create an account to reserve your parking spot.</Text>


        <CustomInput placeholder="First Name" value={firstName} setValue={setFirstName} />
        <CustomInput placeholder="Last Name" value={lastName} setValue={setLastName} />
        <CustomInput placeholder="Phone Number" value={phone} setValue={setPhone} />
        <CustomInput placeholder="Email" value={email} setValue={setEmail} />
        <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} />
        <CustomInput placeholder="Confirm Password" value={confirmPassword} setValue={setConfirmPassword} secureTextEntry={true} />


        <CustomButton
          style={styles.button}
          textStyle={{ ...styles.commonFont, color: '#A9927D' }}
          title="Register"
          onPress={onRegisterPressed}
          color="#171412"
        />

        <Text style={styles.term}>
          By registering, you confirm that you accept our <Text onPress={onTermOfUsePressed} style={styles.link}>Terms of Use</Text> and <Text onPress={onPrivacyPressed} style={styles.link}>Privacy Policy</Text>.
        </Text>



        <TouchableOpacity>
          <Text style={styles.clickableText}>Continue as Guest</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <TouchableOpacity>
        <Text onPress={onGoSignInPressed} style={styles.clickableText}>Already have an account? SIGN IN</Text>
      </TouchableOpacity>


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
export default SignUpScreen;