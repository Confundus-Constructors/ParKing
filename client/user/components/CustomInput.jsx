import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
    return (
        <View style={styles.container}>
            <TextInput
              value = {value}
              onChangeText = {setValue}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry} />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 50,
    marginVertical: 5,
    borderbottomWidth: 1,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    width: "75%",
    height: 35,
    paddingHorizontal: 10,

  },

  input: {
    fontSize: 16,
    padding: 10,
    fontFamily: 'Oswald-Medium',
  },

});

export default CustomInput;