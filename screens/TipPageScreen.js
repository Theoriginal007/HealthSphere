import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const posts = [
  {
    title: 'Healthy Eating Tips',
    description: 'Boost your immunity with these foods.',
    image: require('../images/healthyfood.jpg'),
  },
  // Add more posts here
];

const TipPageScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {posts.map((post, index) => (
        <View style={styles.post} key={index}>
          <Image source={post.image} style={styles.image} />
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.description}>{post.description}</Text>
        </View>
      ))}
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

export default TipPageScreen;
