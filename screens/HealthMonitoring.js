import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HealthMonitoringScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Monitoring</Text>
      <Text>Track your health metrics here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
