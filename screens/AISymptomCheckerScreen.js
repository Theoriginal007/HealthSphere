import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AISymptomCheckerScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Symptom Checker</Text>
      <Text style={styles.subtitle}>Use AI to check your symptoms and get recommendations.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AISymptomCheckerScreen;
