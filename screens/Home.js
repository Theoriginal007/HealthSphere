import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, TextInput, Modal, Share } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; 

const posts = [
  { id: '1', image: require('../images/healthyfood.jpg'), title: 'Healthy Eating Tips', description: 'Boost your immunity with these foods.', type: 'tip' },
  { id: '2', image: require('../images/workout.jpg'), title: 'Workout Motivation', description: 'Stay active with these simple exercises.', type: 'workout' },
  { id: '3', image: require('../images/mentalhealth.jpg'), title: 'Mental Health Awareness', description: 'Manage stress effectively.', type: 'mental' },
  { id: '4', image: require('../images/doctor.jpg'), title: 'Meet the Experts', description: 'Find top-rated doctors.', type: 'expert' },
  { id: '5', image: require('../images/news.jpg'), title: 'Trending Health News', description: 'Latest updates in healthcare.', type: 'news' },
  { id: '6', image: require('../images/quotes.jpg'), title: 'Daily Motivation', description: '"Your body hears everything your mind says."', type: 'quote' },
  { id: '7', image: require('../images/poll.jpg'), title: 'Poll: Best Diet?', description: 'What diet works best for you?', type: 'poll' },
  { id: '8', image: require('../images/meditation.jpg'), title: 'Live Yoga Session', description: 'Join our live session today!', type: 'live' },
];

const HomeScreen = () => {
  const [likedPosts, setLikedPosts] = useState({});
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation(); 

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchText.toLowerCase()) ||
    post.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const handlePress = (type) => {
    console.log('Navigating to type:', type);
    
    switch(type) {
      case 'workout':
        navigation.navigate('WorkoutPageScreen');
        break;
      case 'mental':
        navigation.navigate('MentalHealthPageScreen');
        break;
      case 'expert':
        navigation.navigate('ExpertPageScreen');
        break;
      case 'news':
        navigation.navigate('NewsPageScreen');
        break;
      case 'quote':
        navigation.navigate('QuotePageScreen');
        break;
      case 'poll':
        navigation.navigate('PollPageScreen');
        break;
      case 'live':
        navigation.navigate('LiveYogaPageScreen');
        break;
      case 'tip':
        navigation.navigate('TipPageScreen');
        break;
      default:
        console.log('No screen for this type');
        break;
    }
  };
  

  const toggleLike = (id) => {
    setLikedPosts((prevLikes) => {
      const newLikes = { ...prevLikes };
      if (newLikes[id]) {
        // Remove the like if it already exists
        delete newLikes[id];
      } else {
        // Add the like if it doesn't exist
        newLikes[id] = 1;
      }
      return newLikes;
    });
  };
  

  const toggleComments = (postId) => {
    setSelectedPost(postId);
    setCommentsVisible(!commentsVisible);
  };

  const addComment = () => {
    if (newComment.trim()) {
      setComments((prevComments) => ({
        ...prevComments,
        [selectedPost]: [
          ...(prevComments[selectedPost] || []),
          { text: newComment, time: new Date().toLocaleTimeString() },
        ],
      }));
      setNewComment('');
    }
  };

  const sharePost = async (post) => {
    try {
      await Share.share({
        message: `${post.title}\n${post.description}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.postContainer}>
        <Image source={item.image} style={styles.postImage} />
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postDescription}>{item.description}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => toggleLike(item.id)}>
            <Icon name={likedPosts[item.id] ? "heart" : "heart-outline"} size={20} color="#ff4757" />
            <Text style={styles.likesCount}>{likedPosts[item.id] || 0} Likes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleComments(item.id)}>
            <Icon name="chatbubble-outline" size={20} color="#1e90ff" />
            <Text style={styles.commentsCount}>{(comments[item.id] || []).length} Comments</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => sharePost(item)}>
            <Icon name="share-social-outline" size={20} color="#1e90ff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress(item.type)}>
          <Text style={styles.linkText}>Discover More</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search health tips, workouts..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      
      <Modal visible={commentsVisible} animationType="slide">
        <View style={styles.commentSection}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setCommentsVisible(false)}>
            <Icon name="close" size={24} color="#000" />
          </TouchableOpacity>
          <FlatList
            data={comments[selectedPost] || []}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.comment}>
                <Text style={styles.commentText}>{item.text}</Text>
                <Text style={styles.commentTime}>{item.time}</Text>
              </View>
            )}
          />
          <Text style={styles.commentCountText}>
            {comments[selectedPost] ? `${comments[selectedPost].length} Comments` : 'No Comments Yet'}
          </Text>
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity onPress={addComment}>
              <Icon name="send" size={20} color="#1e90ff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 10 },
  searchBar: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 10 },
  postContainer: { backgroundColor: '#ffffff', borderRadius: 10, padding: 10, marginBottom: 10, elevation: 3 },
  postImage: { width: '100%', height: 150, borderRadius: 10, resizeMode: 'cover' },
  postTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 5 },
  postDescription: { fontSize: 14, color: '#555' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  likesCount: { fontSize: 12, color: '#555' },
  commentsCount: { fontSize: 12, color: '#555' },
  commentSection: { flex: 0.5, backgroundColor: '#fff', padding: 20 },
  closeButton: { alignSelf: 'flex-end', padding: 10 },
  comment: { borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 5 },
  commentText: { fontSize: 14 },
  commentTime: { fontSize: 12, color: '#888' },
  commentInputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  commentInput: { flex: 1, borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 5, marginRight: 10 },
  commentCountText: { fontSize: 14, marginVertical: 10, color: '#555' },
  linkText: { fontSize: 14, color: '#1e90ff' },
});

export default HomeScreen;
