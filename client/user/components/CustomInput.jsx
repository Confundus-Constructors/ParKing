import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useForm, Controller } from "react-hook-form";

const CustomInput = ({control, name, placeholder, secureTextEntry}) => {
    return (
        <View style={styles.container}>
          <Controller
            control={control}
            name={name}
            render={({field: {value, onChange, onBlur}})=> (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
             />)
            }
          />
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