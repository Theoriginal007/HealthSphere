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
import ExpertPageScreen from './screens/ExpertPageScreen';  // Corrected import
import LiveYogaPageScreen from './screens/LiveYogaPageScreen';  // Corrected import
import MentalHealthPageScreen from './screens/MentalHealthPageScreen';  // Corrected import
import NewsPageScreen from './screens/NewsPageScreen';  // Corrected import
import PollPageScreen from './screens/PollPageScreen';  // Corrected import
import QuotePageScreen from './screens/QuotePageScreen';  // Corrected import
import TipPageScreen from './screens/TipPageScreen';  // Corrected import
import WorkoutPageScreen from './screens/WorkoutPageScreen';  // Corrected import
import BookAppointmentScreen from './screens/BookAppointmentScreen';
import AISymptomCheckerScreen from './screens/AISymptomCheckerScreen';
import EmergencyConsultationScreen from './screens/EmergencyConsultationScreen';
import FindNearbyClinicsScreen from './screens/FindNearbyClinicsScreen';
import ChatWithDoctorScreen from './screens/ChatWithDoctorScreen';
import HealthRecordsScreen from './screens/HealthRecordsScreen';
import Icon from 'react-native-vector-icons/Ionicons';

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
        {/* Add New Screens for Navigation */}
        <Stack.Screen name="BookAppointmentScreen" component={BookAppointmentScreen} />
        <Stack.Screen name="AISymptomCheckerScreen" component={AISymptomCheckerScreen} />
        <Stack.Screen name="EmergencyConsultationScreen" component={EmergencyConsultationScreen} />
        <Stack.Screen name="FindNearbyClinicsScreen" component={FindNearbyClinicsScreen} />
        <Stack.Screen name="ChatWithDoctorScreen" component={ChatWithDoctorScreen} />
        <Stack.Screen name="HealthRecordsScreen" component={HealthRecordsScreen} />
        {/* Add Pages for Navigation */}
        <Stack.Screen name="ExpertPageScreen" component={ExpertPageScreen} />
        <Stack.Screen name="LiveYogaPageScreen" component={LiveYogaPageScreen} />
        <Stack.Screen name="MentalHealthPageScreen" component={MentalHealthPageScreen} />
        <Stack.Screen name="NewsPageScreen" component={NewsPageScreen} />
        <Stack.Screen name="PollPageScreen" component={PollPageScreen} />
        <Stack.Screen name="QuotePageScreen" component={QuotePageScreen} />
        <Stack.Screen name="TipPageScreen" component={TipPageScreen} />
        <Stack.Screen name="WorkoutPageScreen" component={WorkoutPageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
