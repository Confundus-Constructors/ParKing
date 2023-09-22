import { SafeAreaView, Text, Image, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import UserTabs from './UserTabs.jsx';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from "react-hook-form";
import { FIREBASE_AUTH } from '../../../FirebaseConfig.ts';

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword
} from "firebase/auth";

import axios from 'axios';
import {host, port} from "../../../env.js";

import { User } from 'firebase/auth';

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

async function loadFonts() {
  await Font.loadAsync({
    'Oswald-Medium': require('../../../assets/fonts/Oswald-Medium.ttf'),  // adjust the path accordingly
  });
};

const Welcome = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const auth = FIREBASE_AUTH;
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [ userId, setUserId ] = useState(1);
  const { control, handleSubmit, formState: {errors}, } = useForm();

  const navigation = useNavigation();


  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '221488399738-k5otuspijkga9rkii95f7v6dit6i3k27.apps.googleusercontent.com'
  });

  const [request2, response2, promptAsync2] = Facebook.useAuthRequest({
    clientId: "1012811586526206"
  });

  const checkLocalUser = async() => {
    try {
      setLoading(true);
      const userJSON = await AsyncStorage.getItem('@user');
      const userData = userJSON != null ? JSON.parse(userJSON) : null;
      console.log("Local storage", userData);
      setUser(userData);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
      .then(async(authResult) => {
        if (authResult.user.firstLogin) {  // Replace 'firstLogin' with field name you use in Firebase.
          navigation.navigate('ConfirmEmailScreen');
          // Optionally, update Firebase to set firstLogin to false for this user.
        } else {
          // navigation.navigate('UHP');
          // ---- KURT AND JON ADD PUT ROUTE ---- //
          const db_response = await updateUserDeviceTokenNoPW( auth.currentUser.email, auth.currentUser.stsTokenManager);
          // if (db_response.data === "" || db_response.data === undefined) {
          //   navigation.navigate('SignUpScreen');
          // } else {
            setUserId(db_response.data.id);
            if (db_response.data.is_employee) {
              const employee_data = await getEmployeeFromDB( db_response.data.id);
              const garage_id = employee_data.data.garage_id;
              navigation.navigate('VHP', { data: garage_id}); // need to pass userId into
            } else {
              navigation.navigate('UserTabs', { data: db_response.data.id}); // need to pass userId into
            }
          // }
        }
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
    }
  }, [response]);


  useEffect(() => {
    if (response2?.type === 'success') {
        const { token } = response2.params;
        const credential = FacebookAuthProvider.credential(token);
        signInWithCredential(auth, credential)
        .then((authResult) => {
            if (authResult.user.firstLogin) { // Replace 'firstLogin' with field name you use in Firebase.
                navigation.navigate('ConfirmEmailScreen');
                // Optionally, update Firebase to set firstLogin to false for this user.
            } else {

                navigation.navigate('UserTabs');
            }
        })
        .catch((error) => {
            console.error("Error signing in with Facebook:", error);
        });
    }
}, [response2]);




  const onSignInPressed = async(data) => {
    // console.log(data);

    // navigation.navigate('UHP');
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, data.Email, data.Password);
      // console.log('herererererererer', response);
      // navigation.navigate('UHP');
      // ---- KURT AND JON ADD PUT ROUTE ---- //
      const db_response = await updateUserDeviceToken( response.user, data.Password);
      setUserId(db_response.data.id);
      console.log('userId in Welcome - ', db_response.data.id);
      if (db_response.data.is_employee) {
        const employee_data = await getEmployeeFromDB( db_response.data.id);
        const garage_id = employee_data.data.garage_id;
        navigation.navigate('VHP', { data: garage_id}); // need to pass userId into
      } else {
        navigation.navigate('UserTabs', { data: db_response.data.id}); // need to pass userId into
      }
    } catch (error) {
      console.log(error);
      alert('Sign in failed. Please try again.' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSignInGooglePressed = () => {
    promptAsync();
  };

  const onSignInFacebookPressed = () => {
    // console.warn('Sign In FacebookPressed');
    promptAsync2();
  };

  const onForgotPassPressed = () => {

    navigation.navigate('ForgotPasswordScreen');
  };

  const onGuestPressed = () => {

    navigation.navigate('UserTabs');
  };

  const onCreatePressed = () => {

    navigation.navigate('SignUpScreen');
  };

  // --- START DATABASE FUNCTIONS --- //
  const updateUserDeviceToken = (obj, password) => {
    console.log({host, port});
    let payload = {
      email: obj.email,
      password: password,
      stsTokenManager: obj.stsTokenManager,
    }
    return axios.put(`http://${host}:${port}/users`, payload);
  };
  const updateUserDeviceTokenNoPW = (email, token) => {
    let payload = {
      email: email,
      stsTokenManager: token,
    }
    return axios.put(`http://${host}:${port}/users/auth`, payload);
  };
  const getEmployeeFromDB = (user) => {
    return axios.get(`http://${host}:${port}/users/employees/${user}`);
    // TESTING ONLY BELOW
    // return axios.get(`http://localhost:${port}/users/employees/${user}`);
  }
  // --- END DATABASE FUNCTIONS --- //

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
    >
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <SafeAreaView style={styles.mainContent}>
                    <Image style={styles.image} source={require('../../../assets/app-logo.png')} />
                    <Text style={styles.text}>Create an account to reserve your parking spot.</Text>

                    <CustomInput
                        name="Email"
                        placeholder="Email"
                        autoCapitalize="none"
                        control={control}
                        rules={{ required: 'Email is required', pattern: { value: EMAIL_REGEX, message: 'Email is invalid' } }}
                    />
                    <CustomInput
                        name="Password"
                        placeholder="Password"
                        control={control}
                        rules={{ required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters long' } }}
                        secureTextEntry={true}
                    />

                    <CustomButton
                        style={styles.button}
                        textStyle={{ ...styles.commonFont, color: '#A9927D' }}
                        title="Sign In"
                        onPress={handleSubmit(onSignInPressed)}
                        color="#171412"
                    />

                    <TouchableOpacity>
                        <Text onPress={onForgotPassPressed} style={styles.clickableText}>Forgot password?</Text>
                    </TouchableOpacity>

                    <CustomButton
                        style={styles.button}
                        textStyle={{ ...styles.commonFont, color: '#171412' }}
                        title="Continue With Google"
                        onPress={onSignInGooglePressed}
                        color="#A9927D"
                    />
                    <CustomButton
                        style={styles.button}
                        textStyle={{ ...styles.commonFont, color: '#D0D3D2' }}
                        title="Continue With Facebook"
                        onPress={onSignInFacebookPressed}
                        color="#49111C"
                    />
                    <TouchableOpacity>
                        <Text onPress={onGuestPressed} style={styles.clickableText}>Continue as Guest</Text>
                    </TouchableOpacity>
                </SafeAreaView>

                <TouchableOpacity>
                    <Text onPress={onCreatePressed} style={styles.clickableText}>Do not have an account? CREATE ONE</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    </KeyboardAvoidingView>
);

}


const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'center'
  },

  image: {
    marginTop: 90,
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
  }
})
export default Welcome;