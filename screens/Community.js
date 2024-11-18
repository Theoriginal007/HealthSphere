import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const communityData = [
  { id: '1', title: 'Community Health Tips', content: 'Here are some tips to maintain your health.' },
  { id: '2', title: 'Vaccination Drive', content: 'Join us for the upcoming vaccination drive this weekend!' },
  { id: '3', title: 'Support Group Meeting', content: 'Participate in our support group for mental health.' },
  // Add more posts as needed
];

export default function Community({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.postContainer} onPress={() => handlePostPress(item)}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
    </TouchableOpacity>
  );

  const handlePostPress = (post) => {
    // Handle post press, e.g., navigate to detailed view or display a modal
    console.log(`Selected Post: ${post.title}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Community Feed</Text>
      <FlatList
        data={communityData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 16,
  },
  postContainer: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#e7e7e7',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  postContent: {
    fontSize: 14,
    color: '#666',
  },
});
