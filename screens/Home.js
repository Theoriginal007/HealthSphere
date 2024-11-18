import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import HealthMonitoring from './HealthMonitoring'; // Ensure the path is correct
import VirtualConsultation from './VirtualConsultation'; // Ensure the path is correct
import MedicationTracker from './MedicationTracker'; // Ensure the path is correct
import Settings from './Settings'; // Ensure the path is correct

const Stack = createStackNavigator();

// Home Screen Component
export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Search Bar Section */}
      <TextInput 
        style={styles.searchBar}
        placeholder="Search for health information, doctors, or services..."
        onSubmitEditing={(event) => handleSearch(event.nativeEvent.text)}
      />

      {/* Optional: You can add more content here if needed */}
      <Text style={styles.sectionTitle}>Welcome to the Health App</Text>
    </View>
  );
}

// Example search handling function
const handleSearch = (query) => {
  console.log(`Searching for: ${query}`);
  // Implement search functionality here
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'flex-start',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
});

// App Component with Navigation
export function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="HealthMonitoring" component={HealthMonitoring} />
        <Stack.Screen name="VirtualConsultation" component={VirtualConsultation} />
        <Stack.Screen name="MedicationTracker" component={MedicationTracker} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
