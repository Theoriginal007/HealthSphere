import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const NewsPageScreen= () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.post}>
        <Image source={require('../images/news.jpg')} style={styles.image} />
        <Text style={styles.title}>Trending Health News</Text>
        <Text style={styles.description}>Latest updates in healthcare.</Text>
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

export default NewsPageScreen;
