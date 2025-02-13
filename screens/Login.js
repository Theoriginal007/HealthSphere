import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for password

  const handleLogin = () => {
    // Check if fields are filled
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    // Navigate to Home if credentials are valid (add your own validation logic)
    navigation.replace('Home');
  };

  return (
    <ImageBackground 
      source={require('../images/welcome.jpg')} // Replace with your image path
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>

        {/* TextInput for username */}
        <TextInput 
          style={styles.input} 
          placeholder="Username" 
          placeholderTextColor="#fff" // Change placeholder text color for better visibility
          value={username} 
          onChangeText={setUsername} 
        />

        {/* TextInput for password */}
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          placeholderTextColor="#fff" // Change placeholder text color for better visibility
          secureTextEntry 
          value={password} 
          onChangeText={setPassword} 
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, // Allow the background image to cover the entire screen
    justifyContent: 'center', // Center items vertically
    alignItems: 'center', // Center items horizontally
  },
  container: {
    width: '90%', // Set width of the container
    maxWidth: 400, // Maximum width for larger screens
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker semi-transparent background for better contrast
    borderRadius: 10, // Rounded corners for the container
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF', // Change text color to white for better visibility
  },
  input: {
    height: 50,
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#FFFFFF', // Change text color for input
    width: '100%', // Full width for input
  },
  button: {
    backgroundColor: '#007BFF', // Button background color
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%', // Full width for button
    alignItems: 'center', // Center button text
  },
  buttonText: {
    color: '#FFFFFF', // Button text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 15,
    color: '#FFFFFF', // Change link text color to white for better visibility
    textDecorationLine: 'underline', // Underline style for link
  },
});
