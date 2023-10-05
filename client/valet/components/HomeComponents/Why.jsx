import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Why = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.paragraph, styles.bolded]}>
        ParKing Valet Onboarding Disclaimer
      </Text>

      <Text style={styles.paragraph}>
        Welcome to ParKing's Valet Partnership Program. Prior to commencing your role as a ParKing Valet, we mandate the submission of your valid driver's license and insurance card for our records. As a valet partner, you will be entrusted with the responsibility of handling customers' vehicles.
      </Text>

      <Text style={styles.paragraph}>
        It's imperative to ensure that you operate within the legal frameworks set by your jurisdiction and maintain necessary protections against potential damages, liabilities, or thefts.
      </Text>

      <Text style={styles.paragraph}>
        It is paramount to understand that ParKing does not extend any form of insurance coverage, neither to its valet partners nor to its users. Any damages, alterations, or liabilities arising during the time a client's vehicle is under your care will be your sole responsibility.
      </Text>

      <Text style={styles.paragraph}>
        We strongly recommend securing comprehensive insurance coverage tailored to your activities as a valet to safeguard against unforeseen circumstances.
      </Text>

      <Text style={styles.paragraph}>
        We appreciate your understanding and commitment to upholding the highest standards of service and care in this partnership.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  paragraph: {
    marginBottom: 10,  // This provides space between paragraphs.
  },
  bolded: {
    fontWeight: 'bold',
  }
});

export default Why;
