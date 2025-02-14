import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BookAppointmentScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book an Appointment</Text>
      <Text style={styles.subtitle}>Choose your preferred date and time to book an appointment.</Text>
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

export default BookAppointmentScreen;
