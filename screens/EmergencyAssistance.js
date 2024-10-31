// src/screens/EmergencyAssistance.js
import React from 'react';
import { View, Text, StyleSheet, Button, Linking } from 'react-native';

const EmergencyAssistance = () => {
  const handleEmergencyCall = () => {
    // Replace with the actual emergency number
    const emergencyNumber = '1234567890';
    Linking.openURL(`tel:${emergencyNumber}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Assistance</Text>
      <Text style={styles.description}>
        If you need immediate assistance, please call the emergency services.
      </Text>
      <Button title="Call Emergency Services" onPress={handleEmergencyCall} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default EmergencyAssistance;
