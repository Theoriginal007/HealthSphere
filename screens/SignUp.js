// screens/SignUp.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox'; // Make sure to install expo-checkbox

export default function SignUpScreen({ navigation }) {
  const [isChecked, setChecked] = useState(false); // State for checkbox
  const [username, setUsername] = useState(''); // State for username
  const [name, setName] = useState(''); // State for actual name
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password

  const handleSignUp = () => {
    // Check if all fields are filled
    if (!username || !name || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Check if terms and conditions are accepted
    if (!isChecked) {
      alert('You must agree to the terms and conditions.');
      return;
    }

    // If all checks pass, navigate to Home
    navigation.replace('Home');
  };

  const handleTermsPress = () => {
    navigation.navigate('TermsAndConditions'); // Ensure this screen exists in your navigator
  };

  return (
    <ImageBackground 
      source={require('../images/welcome.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>

        {/* TextInput for username */}
        <TextInput 
          style={styles.input} 
          placeholder="Username" 
          value={username}
          onChangeText={setUsername} 
        />
        
        {/* TextInput for actual name */}
        <TextInput 
          style={styles.input} 
          placeholder="Actual Name" 
          value={name}
          onChangeText={setName} 
        />
        
        {/* TextInput for email */}
        <TextInput 
          style={styles.input} 
          placeholder="Email" 
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail} 
        />
        
        {/* TextInput for password */}
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          secureTextEntry 
          value={password}
          onChangeText={setPassword} 
        />

        {/* TextInput for confirm password */}
        <TextInput 
          style={styles.input} 
          placeholder="Confirm Password" 
          secureTextEntry 
          value={confirmPassword}
          onChangeText={setConfirmPassword} 
        />

        {/* Terms and Conditions Checkbox */}
        <View style={styles.checkboxContainer}>
          <Checkbox 
            value={isChecked} 
            onValueChange={setChecked} 
            style={styles.checkbox} 
          />
          <Text style={styles.checkboxLabel}>
            I have read the Terms and Conditions
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an account? Log In</Text>
        </TouchableOpacity>

        {/* Terms and Conditions Link */}
        <TouchableOpacity onPress={handleTermsPress}>
          <Text style={styles.linkText}>Terms and Conditions</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent', // Set to transparent to see background
    width: '90%', // Width of the container
    maxWidth: 400, // Max width for larger screens
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007BFF', // Title color
  },
  input: {
    height: 50,
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
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
    color: '#007BFF', // Color for the link text
    textDecorationLine: 'underline', // Underline style for link
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    color: '#000', // Change text color as needed
    fontSize: 14,
  },
});
