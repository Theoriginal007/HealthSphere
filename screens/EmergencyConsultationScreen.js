import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmergencyConsultationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Consultation</Text>
      <Text style={styles.subtitle}>Connect with a doctor immediately for emergency consultation.</Text>
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

export default EmergencyConsultationScreen;
