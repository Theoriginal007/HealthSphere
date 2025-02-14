import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HealthRecordsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Records</Text>
      <Text style={styles.subtitle}>View and manage your health records.</Text>
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

export default HealthRecordsScreen;
