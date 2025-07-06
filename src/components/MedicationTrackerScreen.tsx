
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Modal } from 'react-native';
import { Heart, User, Calendar, Bell } from 'lucide-react-native';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  taken: boolean;
}

const MedicationTrackerScreen = () => {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Vitamin D',
      dosage: '1000 IU',
      frequency: 'Daily',
      time: '8:00 AM',
      taken: false
    },
    {
      id: '2',
      name: 'Omega-3',
      dosage: '500mg',
      frequency: 'Twice daily',
      time: '8:00 AM, 8:00 PM',
      taken: true
    }
  ]);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    time: ''
  });

  const handleAddMedication = () => {
    if (!newMedication.name.trim() || !newMedication.dosage.trim()) {
      Alert.alert('Error', 'Please fill in medication name and dosage');
      return;
    }

    const medication: Medication = {
      id: Date.now().toString(),
      name: newMedication.name,
      dosage: newMedication.dosage,
      frequency: newMedication.frequency || 'Daily',
      time: newMedication.time || '8:00 AM',
      taken: false
    };

    setMedications([...medications, medication]);
    setNewMedication({ name: '', dosage: '', frequency: '', time: '' });
    setShowAddModal(false);
    Alert.alert('Success', 'Medication added successfully!');
  };

  const toggleMedicationTaken = (id: string) => {
    setMedications(prev =>
      prev.map(med =>
        med.id === id ? { ...med, taken: !med.taken } : med
      )
    );
  };

  const deleteMedication = (id: string) => {
    Alert.alert(
      'Delete Medication',
      'Are you sure you want to delete this medication?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setMedications(prev => prev.filter(med => med.id !== id))
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Heart size={32} color="#10b981" strokeWidth={2} />
        <Text style={styles.title}>Medication Tracker</Text>
        <Text style={styles.subtitle}>Keep track of your daily medications</Text>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddModal(true)}
      >
        <Text style={styles.addButtonText}>+ Add New Medication</Text>
      </TouchableOpacity>

      <View style={styles.medicationsContainer}>
        {medications.map((medication) => (
          <View key={medication.id} style={[styles.medicationCard, medication.taken && styles.takenCard]}>
            <View style={styles.medicationInfo}>
              <Text style={[styles.medicationName, medication.taken && styles.takenText]}>
                {medication.name}
              </Text>
              <Text style={styles.medicationDetails}>
                {medication.dosage} • {medication.frequency}
              </Text>
              <Text style={styles.medicationTime}>
                <Calendar size={16} color="#6b7280" strokeWidth={2} /> {medication.time}
              </Text>
            </View>
            <View style={styles.medicationActions}>
              <TouchableOpacity
                style={[styles.statusButton, medication.taken && styles.takenButton]}
                onPress={() => toggleMedicationTaken(medication.id)}
              >
                <Text style={[styles.statusText, medication.taken && styles.takenStatusText]}>
                  {medication.taken ? 'Taken' : 'Take'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteMedication(medication.id)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Medication</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Medication Name"
              value={newMedication.name}
              onChangeText={(text) => setNewMedication(prev => ({ ...prev, name: text }))}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Dosage (e.g., 500mg)"
              value={newMedication.dosage}
              onChangeText={(text) => setNewMedication(prev => ({ ...prev, dosage: text }))}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Frequency (e.g., Daily, Twice daily)"
              value={newMedication.frequency}
              onChangeText={(text) => setNewMedication(prev => ({ ...prev, frequency: text }))}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Time (e.g., 8:00 AM)"
              value={newMedication.time}
              onChangeText={(text) => setNewMedication(prev => ({ ...prev, time: text }))}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddMedication}
              >
                <Text style={styles.saveButtonText}>Add Medication</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  addButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  medicationsContainer: {
    gap: 16,
  },
  medicationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  takenCard: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  takenText: {
    textDecorationLine: 'line-through',
    color: '#6b7280',
  },
  medicationDetails: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  medicationTime: {
    fontSize: 14,
    color: '#6b7280',
    flexDirection: 'row',
    alignItems: 'center',
  },
  medicationActions: {
    gap: 8,
  },
  statusButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  takenButton: {
    backgroundColor: '#10b981',
  },
  statusText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  takenStatusText: {
    color: '#ffffff',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  deleteText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 16,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  saveButton: {
    backgroundColor: '#10b981',
  },
  cancelButtonText: {
    color: '#6b7280',
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default MedicationTrackerScreen;
