import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const LoginCustomButton = ({ title, color, textStyle, style, ...props }) => {
    return (
        <TouchableOpacity style={[styles.button, style, { backgroundColor: color }]} {...props}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        fontFamily: 'Oswald-Medium'
    },
});

export default LoginCustomButton;