
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { Calendar, User, Bell, Heart } from 'lucide-react-native';

const BookAppointmentScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [reason, setReason] = useState('');

  const doctors = [
    { id: 1, name: 'Dr. Sarah Wilson', specialty: 'General Medicine', rating: 4.9 },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Cardiology', rating: 4.8 },
    { id: 3, name: 'Dr. Emily Brown', specialty: 'Dermatology', rating: 4.7 },
    { id: 4, name: 'Dr. James Davis', specialty: 'Neurology', rating: 4.9 },
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime || !selectedDoctor || !reason.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    Alert.alert(
      'Appointment Booked!',
      `Your appointment with ${selectedDoctor} on ${selectedDate} at ${selectedTime} has been booked successfully.`,
      [{ text: 'OK' }]
    );

    // Reset form
    setSelectedDate('');
    setSelectedTime('');
    setSelectedDoctor('');
    setReason('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Calendar size={32} color="#f97316" strokeWidth={2} />
        <Text style={styles.title}>Book Appointment</Text>
        <Text style={styles.subtitle}>Schedule your consultation with our doctors</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Doctor</Text>
          <View style={styles.doctorsContainer}>
            {doctors.map((doctor) => (
              <TouchableOpacity
                key={doctor.id}
                style={[
                  styles.doctorCard,
                  selectedDoctor === doctor.name && styles.selectedCard
                ]}
                onPress={() => setSelectedDoctor(doctor.name)}
              >
                <View style={styles.doctorInfo}>
                  <Text style={[
                    styles.doctorName,
                    selectedDoctor === doctor.name && styles.selectedText
                  ]}>
                    {doctor.name}
                  </Text>
                  <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                  <Text style={styles.doctorRating}>⭐ {doctor.rating}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter date (e.g., March 15, 2024)"
            value={selectedDate}
            onChangeText={setSelectedDate}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.timeSlotsContainer}>
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.selectedTimeSlot
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[
                  styles.timeSlotText,
                  selectedTime === time && styles.selectedTimeSlotText
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reason for Visit</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Describe your symptoms or reason for consultation..."
            value={reason}
            onChangeText={setReason}
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBookAppointment}
        >
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 80,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  form: {
    gap: 24,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  doctorsContainer: {
    gap: 12,
  },
  doctorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedCard: {
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
  },
  doctorInfo: {
    gap: 4,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  selectedText: {
    color: '#3b82f6',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#6b7280',
  },
  doctorRating: {
    fontSize: 14,
    color: '#f59e0b',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 16,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeSlot: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedTimeSlot: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#6b7280',
  },
  selectedTimeSlotText: {
    color: '#ffffff',
  },
  textArea: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  bookButton: {
    backgroundColor: '#f97316',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default BookAppointmentScreen;
