import { SafeAreaView, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import UserTabs from './UserTabs.jsx';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from "react-hook-form";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

async function loadFonts() {
  await Font.loadAsync({
    'Oswald-Medium': require('../../../assets/fonts/Oswald-Medium.ttf'),  // adjust the path accordingly
  });
};

const SignUpScreen = () => {
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [phone, setPhone] = useState('');

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const { control, handleSubmit, watch, formState: {errors} } = useForm();
  const pwd = watch('password');

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


        <CustomInput name="firstName" placeholder="First Name" control={control} rules={{required: 'First name is required'}} />
        <CustomInput name="lastName" placeholder="Last Name" control={control} rules={{required: 'Last name is required'}} />
        <CustomInput name="phoneNumber" placeholder="Phone Number" control={control} rules={{required: 'Phone number is required'}} />
        <CustomInput name="email" placeholder="Email" control={control} rules={{pattern: {value: EMAIL_REGEX, message: 'Email is invalid'}}} />
        <CustomInput name="password" placeholder="Password" control={control}
          rules={{required: 'Password is required', minLength: {value: 8, message: 'Password must be at least 8 characters long'}}} secureTextEntry={true} />
        <CustomInput name="confirmPassword" placeholder="Confirm Password" control={control}
          rules={{validate: value => value === pwd || "Password don not match"}} value secureTextEntry={true} />


        <CustomButton
          style={styles.button}
          textStyle={{ ...styles.commonFont, color: '#A9927D' }}
          title="Register"
          onPress={handleSubmit(onRegisterPressed)}
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