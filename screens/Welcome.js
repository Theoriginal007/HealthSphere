// screens/Welcome.js
import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground 
      source={require('../images/Welcome.jpeg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <Text style={styles.title}>Welcome to HealthSphere 🩺🥼🏥</Text>

      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Log In" onPress={() => navigation.navigate('Login')} />
        </View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
  },
  title: {
    position: 'absolute',
    top: 60,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});
