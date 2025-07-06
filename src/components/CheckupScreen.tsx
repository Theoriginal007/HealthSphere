
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Stethoscope, Activity, Heart, Thermometer, Brain, Scale } from 'lucide-react-native';

const CheckupScreen = () => {
  const checkupOptions = [
    {
      id: 1,
      title: "AI Symptom Checker",
      description: "Describe your symptoms and get AI-powered insights",
      icon: Stethoscope,
      color: "#3b82f6"
    },
    {
      id: 2,
      title: "Vital Signs Monitor",
      description: "Track heart rate, blood pressure, and more",
      icon: Activity,
      color: "#10b981"
    },
    {
      id: 3,
      title: "Heart Health Check",
      description: "Monitor cardiovascular health and rhythm",
      icon: Heart,
      color: "#ef4444"
    },
    {
      id: 4,
      title: "Temperature Check",
      description: "Record and track body temperature",
      icon: Thermometer,
      color: "#f97316"
    },
    {
      id: 5,
      title: "Mental Health Assessment",
      description: "Evaluate mood and mental wellness",
      icon: Brain,
      color: "#8b5cf6"
    },
    {
      id: 6,
      title: "Weight & BMI Tracker",
      description: "Monitor weight changes and BMI",
      icon: Scale,
      color: "#06b6d4"
    }
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Health Checkup</Text>
      <Text style={styles.subtitle}>Choose a checkup option to monitor your health</Text>
      
      <View style={styles.optionsContainer}>
        {checkupOptions.map((option) => {
          const IconComponent = option.icon;
          return (
            <TouchableOpacity key={option.id} style={styles.optionCard}>
              <View style={styles.cardContent}>
                <View style={[styles.iconContainer, { backgroundColor: `${option.color}20` }]}>
                  <IconComponent size={20} color={option.color} strokeWidth={2} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
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
    paddingTop: 60, // Add top padding to prevent content from starting at the very top
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default CheckupScreen;
