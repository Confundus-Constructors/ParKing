import { usePaymentSheet, StripeProvider, useStripe } from '@stripe/stripe-react-native';
import {host, port} from "../../../../env.js";
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

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
       <Text style={styles.title}>3. Provide a way for us to pay you </Text>
       <TouchableOpacity onPress={handleSavePaymentMethodPress} style={styles.box}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesomeIcon icon={faCreditCard} style={{ color: "white", opacity: 1 }} size={30} fade-size={'lg'} />
        <View style={{ marginLeft: 10 }}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18 }}>
            Add Payment Details
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
  },
  box: {
    width: 300,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#a9927d',
    borderRadius: 20,
    marginRight: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: 'lightgray',
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
  },
  title: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
  },
  })
export default Payment;
