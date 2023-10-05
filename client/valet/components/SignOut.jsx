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
import { useNavigation } from '@react-navigation/native';


export default SignOut = ({variant}) => {
  const navigation = useNavigation();

  const buttonStyle = variant === 'home' ? styles.homeButton : styles.defaultButton;
  const textStyle = variant === 'home' ? styles.homeText : styles.defaultText;
  const containerStyle = variant === 'home' ? styles.homeContainer : styles.container;


  const signOut = () => {
    navigation.navigate('Welcome')
  }

  const handleSignOut = () => {
    Alert.alert(
      "", // Alert Title
      "Sign Out?",
      [
        {
          text: "Yes",
          onPress: signOut
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ]
    );
  }

  return (
    <SafeAreaView style={containerStyle}>
     <TouchableOpacity style={buttonStyle} onPress={handleSignOut}>
       <Text style={textStyle}>Sign Out</Text>
     </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  defaultButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A9927D',
    height: '10%',
    width: '50%',
    borderRadius: 20,
  },
  homeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A9927D',
    height: 25,
    width: 80,
    marginRight: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 2,

    // Android shadow style
    elevation: 5,
  },
  defaultText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25
  },
  homeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12
  }
})