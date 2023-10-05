import { usePaymentSheet, StripeProvider, useStripe } from '@stripe/stripe-react-native';
import {host, port} from "../../../../env.js";
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

const Payment = () => {
  const [isPaymentSheetInitialized, setPaymentSheetInitialized] = useState(false);

  const publishableKey = 'pk_test_51KmkwmD8fOfZHqZlVkg6wpMbUVM0V6sn1k1nV9lWiELW5nuLQQRHj7YR3tzZp2gyvxEQbjXUNbSCTvGQnFshyVCA00pnPNa8HV';


  const { initPaymentSheet, presentPaymentSheet} = usePaymentSheet();
  useEffect(() => {
    async function fetchPaymentSheetParams() {

        const response = await fetch(`http://${host}:${port}/create-setup-intent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const { clientSecret } = await response.json();

        const { error } = await initPaymentSheet({
          setupIntentClientSecret: clientSecret,
        });
        if (error) {
          console.error("Initialization failed:", error);
          return;
        } else {
          setPaymentSheetInitialized(true);
        }

    }

    fetchPaymentSheetParams();
}, []);

async function handleSavePaymentMethodPress() {
  if (!isPaymentSheetInitialized) {
    console.log('Payment sheet is not yet initialized.');
    return;
  }

  const { error } = await presentPaymentSheet();

  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Payment method saved successfully!');
  }
}

  return (
    <View>
      <StripeProvider
        publishableKey={publishableKey}>
    <TouchableOpacity style={styles.homeButton} onPress={handleSavePaymentMethodPress}><Text style={styles.homeText}>Add Payment Details</Text></TouchableOpacity>
    </StripeProvider>
    </View>
);
}
const styles = StyleSheet.create({
  homeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A9927D',
    height: 28,
    width: 200,
    marginRight: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    marginTop: 35,
  },
  homeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
  })
export default Payment;
