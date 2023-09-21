import { SafeAreaView, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import UserTabs from './UserTabs.jsx';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from "react-hook-form";
import { FIREBASE_AUTH } from '../../../FirebaseConfig.ts';
import {createUserWithEmailAndPassword} from 'firebase/auth';


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
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, watch, formState: {errors} } = useForm();
  const pwd = watch('password');

  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;

  const onRegisterPressed = async(data) => {
    console.log(data);
    setLoading(true);
    try { const response = await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log(response);



      navigation.navigate('ConfirmEmailScreen');
    } catch (error) {
      console.log(error);
      alert('Sign up failed. Please try again.' + error.message);
    } finally {
      setLoading(false);
    }
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
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <SafeAreaView style={styles.mainContent}>

            <Text style = {styles.text}>Create an account to reserve your parking spot.</Text>


            <CustomInput name="firstName" placeholder="First Name" control={control} autoCapitalize="none" rules={{required: 'First name is required'}} />
            <CustomInput name="lastName" placeholder="Last Name" control={control} autoCapitalize="none" rules={{required: 'Last name is required'}} />
            <CustomInput name="phoneNumber" placeholder="Phone Number" control={control} rules={{required: 'Phone number is required'}} />
            <CustomInput name="email" placeholder="Email" control={control} autoCapitalize="none" rules={{required: 'Email is required', pattern: {value: EMAIL_REGEX, message: 'Email is invalid'}}} />
            <CustomInput name="password" placeholder="Password" control={control} autoCapitalize="none"
              rules={{required: 'Password is required', minLength: {value: 8, message: 'Password must be at least 8 characters long'}}} secureTextEntry={true} />
            <CustomInput name="confirmPassword" placeholder="Confirm Password" control={control} autoCapitalize="none"
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

            <TouchableOpacity>
              <Text onPress={onGoSignInPressed} style={styles.clickableText}>Already have an account? SIGN IN</Text>
            </TouchableOpacity>


          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1
  },

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