import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const LiveYogaPageScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.post}>
        <Image source={require('../images/meditation.jpg')} style={styles.image} />
        <Text style={styles.title}>Live Yoga Session</Text>
        <Text style={styles.description}>Join our live session today!</Text>
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

export default LiveYogaPageScreen;
