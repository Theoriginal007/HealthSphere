
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Home, Stethoscope, Calendar, FileText, User } from 'lucide-react-native';
import HomeScreen from './components/HomeScreen';
import CheckupScreen from './components/CheckupScreen';
import RemindersScreen from './components/RemindersScreen';
import ReportsScreen from './components/ReportsScreen';
import ProfileScreen from './components/ProfileScreen';
import SymptomCheckerScreen from './components/SymptomCheckerScreen';
import MedicationTrackerScreen from './components/MedicationTrackerScreen';

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  component: React.ComponentType<any>;
}

export default function App(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentScreen, setCurrentScreen] = useState<string>('home');

  const tabs: Tab[] = [
    { id: 'home', label: 'Home', icon: Home, component: HomeScreen },
    { id: 'checkup', label: 'Checkup', icon: Stethoscope, component: CheckupScreen },
    { id: 'reminders', label: 'Reminders', icon: Calendar, component: RemindersScreen },
    { id: 'reports', label: 'Reports', icon: FileText, component: ReportsScreen },
    { id: 'profile', label: 'Profile', icon: User, component: ProfileScreen },
  ];

  const handleNavigation = (screen: string) => {
    setCurrentScreen(screen);
    // Don't change active tab when navigating to feature screens
  };

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentScreen(tabId);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'symptom-checker':
        return <SymptomCheckerScreen />;
      case 'medication-tracker':
        return <MedicationTrackerScreen />;
      case 'health-tips':
        return (
          <View style={styles.comingSoonContainer}>
            <Text style={styles.comingSoonTitle}>Health Tips</Text>
            <Text style={styles.comingSoonText}>Coming Soon! 🏥</Text>
          </View>
        );
      case 'book-appointment':
        return (
          <View style={styles.comingSoonContainer}>
            <Text style={styles.comingSoonTitle}>Book Appointment</Text>
            <Text style={styles.comingSoonText}>Coming Soon! 📅</Text>
          </View>
        );
      case 'track-vitals':
        return (
          <View style={styles.comingSoonContainer}>
            <Text style={styles.comingSoonTitle}>Track Vitals</Text>
            <Text style={styles.comingSoonText}>Coming Soon! ❤️</Text>
          </View>
        );
      default:
        const ActiveComponent = tabs.find(tab => tab.id === currentScreen)?.component || HomeScreen;
        return <ActiveComponent onNavigate={handleNavigation} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>

      <View style={styles.bottomNav}>
        <View style={styles.tabContainer}>
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => handleTabPress(tab.id)}
                style={styles.tabButton}
                activeOpacity={0.7}
              >
                <IconComponent 
                  size={24} 
                  color={isActive ? '#2563eb' : '#9ca3af'} 
                  strokeWidth={2}
                />
                <Text style={[
                  styles.tabLabel, 
                  { color: isActive ? '#2563eb' : '#6b7280' }
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
  },
  bottomNav: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 8,
    paddingHorizontal: 16,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 60,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  comingSoonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  comingSoonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  comingSoonText: {
    fontSize: 18,
    color: '#6b7280',
  },
});
