// screens/Home.js
import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image 
          source={{ uri: 'https://example.com/your-logo.png' }} // Replace with your logo URL
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to HealthSphere</Text>
        <Text style={styles.subtitle}>Your personal health management system</Text>

        <View style={styles.metricContainer}>
          <Text style={styles.metricTitle}>Current Health Metrics</Text>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Heart Rate:</Text>
            <Text style={styles.metricValue}>72 bpm</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Steps Today:</Text>
            <Text style={styles.metricValue}>5,200 steps</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Sleep Duration:</Text>
            <Text style={styles.metricValue}>7 hours</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Log Symptoms"
            onPress={() => navigation.navigate('HealthMonitoring')}
          />
          <Button
            title="Book a Consultation"
            onPress={() => navigation.navigate('Virtual Consultation')}
          />
          <Button
            title="View Health Education"
            onPress={() => navigation.navigate('Health Education')}
          />
          <Button
            title="Settings"
            onPress={() => navigation.navigate('Settings')}
          />
        </View>

        <Text style={styles.sectionTitle}>Featured Articles</Text>
        <View style={styles.articlesContainer}>
          <View style={styles.articleBox}>
            <Text style={styles.articleTitle}>Understanding Your Heart Health</Text>
            <Text style={styles.articleSummary}>
              Learn about heart health and how to maintain a healthy lifestyle.
            </Text>
          </View>
          <View style={styles.articleBox}>
            <Text style={styles.articleTitle}>The Importance of Regular Check-ups</Text>
            <Text style={styles.articleSummary}>
              Regular check-ups can help catch potential health issues early.
            </Text>
          </View>
          <View style={styles.articleBox}>
            <Text style={styles.articleTitle}>Nutrition Tips for a Healthy Life</Text>
            <Text style={styles.articleSummary}>
              Discover essential nutrition tips to enhance your well-being.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 HealthSphere</Text>
        <Text style={styles.footerText}>Privacy Policy | Terms of Service</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
  },
  logo: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
  metricContainer: {
    marginBottom: 20,
  },
  metricTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  metricBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  metricLabel: {
    fontSize: 16,
    color: '#555',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  articlesContainer: {
    marginBottom: 20,
  },
  articleBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  articleSummary: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  footerText: {
    fontSize: 12,
    color: '#888',
  },
});
