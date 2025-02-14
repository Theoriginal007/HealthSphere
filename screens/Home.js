import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, TextInput, Modal, Share, RefreshControl, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';

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
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState(posts.slice(0, 4));
  const navigation = useNavigation();
  const { colors } = useTheme();

  const filteredPosts = data.filter(post =>
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
        delete newLikes[id];
      } else {
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setData(posts.slice(0, 4));
      setPage(1);
      setRefreshing(false);
    }, 2000);
  }, []);

  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setData(prevData => [...prevData, ...posts.slice(page * 4, (page + 1) * 4)]);
      setPage(prevPage => prevPage + 1);
      setLoading(false);
    }, 1000);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.postContainer, { backgroundColor: colors.card }]}>
        <Image source={item.image} style={styles.postImage} />
        <Text style={[styles.postTitle, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.postDescription, { color: colors.text }]}>{item.description}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => toggleLike(item.id)}>
            <Icon name={likedPosts[item.id] ? "heart" : "heart-outline"} size={20} color="#ff4757" />
            <Text style={[styles.likesCount, { color: colors.text }]}>{likedPosts[item.id] || 0} Likes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleComments(item.id)}>
            <Icon name="chatbubble-outline" size={20} color="#1e90ff" />
            <Text style={[styles.commentsCount, { color: colors.text }]}>{(comments[item.id] || []).length} Comments</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress(item.type)}>
            <Text style={[styles.linkText, { color: colors.primary }]}>Discover More</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        style={[styles.searchBar, { backgroundColor: colors.card, color: colors.text }]}
        placeholder="Search health tips, workouts..."
        placeholderTextColor={colors.text}
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
      
      <Modal visible={commentsVisible} animationType="slide">
        <View style={[styles.commentSection, { backgroundColor: colors.background }]}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setCommentsVisible(false)}>
            <Icon name="close" size={24} color={colors.text} />
          </TouchableOpacity>
          <FlatList
            data={comments[selectedPost] || []}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.comment}>
                <Text style={[styles.commentText, { color: colors.text }]}>{item.text}</Text>
                <Text style={[styles.commentTime, { color: colors.text }]}>{item.time}</Text>
              </View>
            )}
          />
          <Text style={[styles.commentCountText, { color: colors.text }]}>
            {comments[selectedPost] ? `${comments[selectedPost].length} Comments` : 'No Comments Yet'}
          </Text>
          <View style={styles.commentInputContainer}>
            <TextInput
              style={[styles.commentInput, { color: colors.text, borderBottomColor: colors.text }]}
              placeholder="Add a comment..."
              placeholderTextColor={colors.text}
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity onPress={addComment}>
              <Icon name="send" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchBar: { padding: 10, borderRadius: 8, marginBottom: 10 },
  postContainer: { borderRadius: 10, padding: 10, marginBottom: 10, elevation: 3 },
  postImage: { width: '100%', height: 150, borderRadius: 10, resizeMode: 'cover' },
  postTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 5 },
  postDescription: { fontSize: 14 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  likesCount: { fontSize: 12 },
  commentsCount: { fontSize: 12 },
  commentSection: { flex: 0.5, padding: 20 },
  closeButton: { alignSelf: 'flex-end', padding: 10 },
  comment: { borderBottomWidth: 1, paddingVertical: 5 },
  commentText: { fontSize: 14 },
  commentTime: { fontSize: 12 },
  commentInputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  commentInput: { flex: 1, borderBottomWidth: 1, padding: 5, marginRight: 10 },
  commentCountText: { fontSize: 14, marginVertical: 10 },
  linkText: { fontSize: 14 },
  loadingFooter: { paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#CED0CE' },
});

export default HomeScreen;