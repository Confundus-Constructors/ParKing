import { SafeAreaView, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import LoginCustomButton from './LoginCustomButton';
import UserTabs from './UserTabs.jsx';
import * as Font from 'expo-font';

async function loadFonts() {
  await Font.loadAsync({
    'Oswald-Medium': require('../../../assets/fonts/Oswald-Medium.ttf'),  // adjust the path accordingly
  });
};

const Welcome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView>
        <Image style = {styles.image} source={require('../../../assets/app-logo.png')} />
      </SafeAreaView>
      <LoginCustomButton
        style={styles.button}
        textStyle={{ ...styles.commonFont, color: '#A9927D' }}
        title="Continue With Google"
        color="#171412"
      />

      <LoginCustomButton
        style={styles.button}
        textStyle={{ ...styles.commonFont, color: '#171412' }}
        title="Continue With Facebook"
        color="#A9927D"
      />

      <LoginCustomButton
        style={styles.button}
        textStyle={{ ...styles.commonFont, color: '#D0D3D2' }}
        title="Create Account With Email"
        color="#49111C"
      />

      <TouchableOpacity>
        <Text style={styles.clickableText}>Continue as Guest</Text>
      </TouchableOpacity>


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  image: {
    marginLeft: 30,
    width: 240,
    height: 100,
  },

  container:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#D0D3D2',
  },

  button: {
    marginTop: 30,
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
})
export default Welcome;