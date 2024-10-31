import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from './screens/Welcome';
import SignUpScreen from './screens/SignUp';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import TermsAndConditionsScreen from './screens/TermsAndConditions';
import HealthMonitoringScreen from './screens/HealthMonitoring';
import VirtualConsultationScreen from './screens/VirtualConsultation';
import HealthEducationScreen from './screens/EducationalContent.js ';
import SettingsScreen from './screens/Settings';
import EmergencyAssistance from './screens/EmergencyAssistance'; // Make sure this file exists
import CommunityScreen from './screens/Community'; // Make sure this file exists
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); // Initialize Tab Navigator

// Create Tab Navigator component
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} /> // Home icon
          ),
        }}
      />
      <Tab.Screen 
        name="Analysis" 
        component={HealthMonitoringScreen} // Adjust this to the correct component
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="pulse-outline" color={color} size={size} /> // Symptom Analysis icon
          ),
        }}
      />
      <Tab.Screen 
        name="Consultations" 
        component={VirtualConsultationScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="chatbubble-outline" color={color} size={size} /> // Virtual Consultation icon
          ),
        }}
      />
      <Tab.Screen 
        name="Education" 
        component={HealthEducationScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="book-outline" color={color} size={size} /> // Educational Content icon
          ),
        }}
      />
      <Tab.Screen 
        name="Emergency" 
        component={EmergencyAssistance} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="alert-circle-outline" color={color} size={size} /> // Emergency Assistance icon
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings-outline" color={color} size={size} /> // Settings icon
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen 
          name="Home" 
          component={TabNavigator} 
          options={{ headerShown: false }} // Hide header for TabNavigator
        />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
