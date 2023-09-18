import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useForm, Controller } from "react-hook-form";

const CustomInput = ({control, name, rules = {}, placeholder, secureTextEntry}) => {
    return (

        <Controller
              control={control}
              name={name}
              rules={rules}
              render={({field: {value, onChange, onBlur}, fieldState: {error}})=> (
                <>
                <View style={[styles.container, {borderColor: error ? 'red' : '#e8e8e8'}]}>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    style={styles.input}
                    secureTextEntry={secureTextEntry}
                  />
              </View>
              {error && <Text style={{color: 'red', alignSelf:"stretch", marginLeft: 50, fontSize: 13, fontFamily: 'Oswald-Light'}}>{error.message || "Error"}</Text>}

              </>

              )}
            />

    );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 50,
    marginVertical: 5,
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