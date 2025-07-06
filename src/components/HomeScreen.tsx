import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Stethoscope, Calendar, Activity, Heart, Bell } from 'lucide-react-native';

interface HomeScreenProps {
  onNavigate?: (screen: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const handleNavigation = (screen: string) => {
    if (onNavigate) {
      onNavigate(screen);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>HealthSphere</Text>
        <Text style={styles.subtitle}>AI Doctor</Text>
      </View>

      {/* Greeting */}
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>
          Good Afternoon, Laura! 👋
        </Text>
        <Text style={styles.greetingSubtext}>How are you feeling today?</Text>
      </View>

      {/* AI Health Tip Card */}
      <View style={styles.tipCard}>
        <View style={styles.tipContent}>
          <View style={styles.tipIcon}>
            <Bell size={24} color="#ffffff" strokeWidth={2} />
          </View>
          <View style={styles.tipText}>
            <Text style={styles.tipTitle}>AI Health Tip</Text>
            <Text style={styles.tipDescription}>
              You may want to drink more water today. Stay hydrated!
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.blueGradient]}
            onPress={() => handleNavigation('symptom-checker')}
          >
            <Stethoscope size={24} color="#ffffff" strokeWidth={2} />
            <Text style={styles.actionText}>Check Symptoms</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.greenGradient]}
            onPress={() => handleNavigation('medication-tracker')}
          >
            <Heart size={24} color="#ffffff" strokeWidth={2} />
            <Text style={styles.actionText}>Track Medication</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.pinkGradient]}
            onPress={() => handleNavigation('health-tips')}
          >
            <Heart size={24} color="#ffffff" strokeWidth={2} />
            <Text style={styles.actionText}>Health Tips</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.orangeGradient]}
            onPress={() => handleNavigation('book-appointment')}
          >
            <Calendar size={24} color="#ffffff" strokeWidth={2} />
            <Text style={styles.actionText}>Book Appointment</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.purpleGradient]}
            onPress={() => handleNavigation('track-vitals')}
          >
            <Activity size={24} color="#ffffff" strokeWidth={2} />
            <Text style={styles.actionText}>Track Vitals</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Health Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Health</Text>
        <View style={styles.healthStats}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>72</Text>
            <Text style={styles.statLabel}>BPM</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>98.6°F</Text>
            <Text style={styles.statLabel}>Temp</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Hours Sleep</Text>
          </View>
        </View>
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
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  greeting: {
    marginBottom: 24,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  greetingSubtext: {
    fontSize: 16,
    color: '#6b7280',
  },
  tipCard: {
    backgroundColor: '#dbeafe',
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#93c5fd',
  },
  tipContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipIcon: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
  },
  tipText: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    color: '#1d4ed8',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  actions: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  blueGradient: {
    backgroundColor: '#3b82f6',
  },
  greenGradient: {
    backgroundColor: '#10b981',
  },
  pinkGradient: {
    backgroundColor: '#ec4899',
  },
  orangeGradient: {
    backgroundColor: '#f97316',
  },
  purpleGradient: {
    backgroundColor: '#8b5cf6',
  },
  actionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 12,
  },
  healthStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default HomeScreen;
