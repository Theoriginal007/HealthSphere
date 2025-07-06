
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Stethoscope, User, Heart } from 'lucide-react-native';

const SymptomCheckerScreen = () => {
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState('');

  const handleSymptomCheck = async () => {
    if (!symptoms.trim()) {
      Alert.alert('Error', 'Please describe your symptoms');
      return;
    }

    setLoading(true);
    
    // Simulate AI diagnosis
    setTimeout(() => {
      const possibleConditions = [
        'Common Cold - Rest and stay hydrated',
        'Seasonal Allergies - Consider antihistamines',
        'Stress/Anxiety - Practice relaxation techniques',
        'Mild Infection - Monitor symptoms and rest'
      ];
      
      const randomDiagnosis = possibleConditions[Math.floor(Math.random() * possibleConditions.length)];
      setDiagnosis(`Based on your symptoms, you might have: ${randomDiagnosis}. Please consult a healthcare professional for proper diagnosis.`);
      setLoading(false);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Stethoscope size={32} color="#3b82f6" strokeWidth={2} />
        <Text style={styles.title}>AI Symptom Checker</Text>
        <Text style={styles.subtitle}>Describe your symptoms for AI-powered insights</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="Enter your age"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[styles.genderButton, gender === 'male' && styles.selectedGender]}
              onPress={() => setGender('male')}
            >
              <Text style={[styles.genderText, gender === 'male' && styles.selectedGenderText]}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderButton, gender === 'female' && styles.selectedGender]}
              onPress={() => setGender('female')}
            >
              <Text style={[styles.genderText, gender === 'female' && styles.selectedGenderText]}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Describe Your Symptoms</Text>
          <TextInput
            style={styles.textArea}
            value={symptoms}
            onChangeText={setSymptoms}
            placeholder="Describe your symptoms in detail..."
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity
          style={[styles.analyzeButton, loading && styles.disabledButton]}
          onPress={handleSymptomCheck}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Analyzing...' : 'Analyze Symptoms'}
          </Text>
        </TouchableOpacity>

        {diagnosis ? (
          <View style={styles.resultCard}>
            <Heart size={24} color="#10b981" strokeWidth={2} />
            <Text style={styles.resultTitle}>AI Analysis Result</Text>
            <Text style={styles.resultText}>{diagnosis}</Text>
            <Text style={styles.disclaimer}>
              ⚠️ This is not a medical diagnosis. Please consult with a healthcare professional.
            </Text>
          </View>
        ) : null}
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
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 16,
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
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  selectedGender: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  genderText: {
    fontSize: 16,
    color: '#6b7280',
  },
  selectedGenderText: {
    color: '#ffffff',
  },
  analyzeButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  resultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    gap: 12,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  resultText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 24,
  },
  disclaimer: {
    fontSize: 14,
    color: '#f59e0b',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 8,
  },
});

export default SymptomCheckerScreen;
