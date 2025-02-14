import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FindNearbyClinicsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Nearby Clinics</Text>
      <Text style={styles.subtitle}>Search for clinics in your area.</Text>
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

export default FindNearbyClinicsScreen;
