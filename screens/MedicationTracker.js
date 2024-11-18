import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

export default function MedicationTracker() {
  const [medications, setMedications] = useState([]);
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');

  // Function to add a medication
  const addMedication = () => {
    if (medicationName.trim() && dosage.trim()) {
      setMedications([...medications, { id: Date.now().toString(), name: medicationName, dosage }]);
      setMedicationName('');
      setDosage('');
    } else {
      Alert.alert("Error", "Please enter both medication name and dosage.");
    }
  };

  // Function to delete a medication
  const deleteMedication = (id) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medication Tracker</Text>
      
      {/* Input fields for medication name and dosage */}
      <TextInput
        style={styles.input}
        placeholder="Medication Name"
        value={medicationName}
        onChangeText={(text) => setMedicationName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Dosage"
        value={dosage}
        onChangeText={(text) => setDosage(text)}
      />
      
      {/* Add Medication Button */}
      <TouchableOpacity style={styles.addButton} onPress={addMedication}>
        <Text style={styles.addButtonText}>Add Medication</Text>
      </TouchableOpacity>

      {/* List of Medications */}
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.medicationItem}>
            <Text style={styles.medicationText}>{item.name} - {item.dosage}</Text>
            <TouchableOpacity onPress={() => deleteMedication(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#87CEEB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  medicationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  medicationText: {
    fontSize: 16,
    color: '#333',
  },
  deleteText: {
    color: '#FF6347',
    fontWeight: 'bold',
  },
});
