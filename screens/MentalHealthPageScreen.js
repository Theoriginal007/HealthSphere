import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const MentalHealthPageScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.post}>
        <Image source={require('../images/mentalhealth.jpg')} style={styles.image} />
        <Text style={styles.title}>Mental Health Awareness</Text>
        <Text style={styles.description}>Manage stress effectively.</Text>
      </View>
      {/* Add more posts or static content here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  post: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 250,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
});

export default MentalHealthPageScreen;
