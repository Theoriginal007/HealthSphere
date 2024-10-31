import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function VirtualConsultationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Virtual Consultation</Text>
      <Text>Consult with healthcare professionals here.</Text>
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
