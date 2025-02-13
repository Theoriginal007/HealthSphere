import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const TipPage = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.post}>
        <Image source={require('../images/healthyfood.jpg')} style={styles.image} />
        <Text style={styles.title}>Healthy Eating Tips</Text>
        <Text style={styles.description}>Boost your immunity with these foods.</Text>
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

export default TipPage;
