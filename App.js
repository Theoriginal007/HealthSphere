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
import HealthEducationScreen from './screens/EducationalContent';
import SettingsScreen from './screens/Settings';
import EmergencyAssistance from './screens/EmergencyAssistance';
import CommunityScreen from './screens/Community'; 
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Create Tab Navigator component
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Monitoring" 
        component={HealthMonitoringScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="pulse-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Consultations" 
        component={VirtualConsultationScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="chatbubble-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Education" 
        component={HealthEducationScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="book-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Emergency" 
        component={EmergencyAssistance} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="alert-circle-outline" color={color} size={size} />
          ),
        }}
      />
         <Tab.Screen 
        name="Community" 
        component={CommunityScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="people-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings-outline" color={color} size={size} />
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
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
