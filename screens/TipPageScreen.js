import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  Modal,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { useTheme } from '@react-navigation/native';

const posts = [
  {
    id: '1',
    title: 'Healthy Eating Tips',
    description: 'Boost your immunity with these foods.',
    image: require('../images/healthyfood.jpg'),
    video: null,
    likes: 120,
    comments: ['Great post!', 'So healthy!'],
    user: { name: 'HealthGuru', avatar: require('../images/doctor.jpg') },
  },
  {
    id: '2',
    title: 'Exercise for Mental Health',
    description: 'Exercise to boost your mental health and reduce stress.',
    image: require('../images/exercise.jpg'),
    video: null,
    likes: 85,
    comments: ['I feel so much better after working out!', 'Great advice!'],
    user: { name: 'FitnessFanatic', avatar: require('../images/doctor.jpg') },
  },
  {
    id: '3',
    title: 'Meditation Benefits',
    description: 'Take time to meditate and clear your mind.',
    image: require('../images/meditation.jpg'),
    video: null,
    likes: 200,
    comments: ['Meditation is life!', 'I love this!'],
    user: { name: 'ZenMaster', avatar: require('../images/doctor.jpg') },
  },
  // Add more posts as needed
];

const TipPageScreen = () => {
  const [commentText, setCommentText] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState(posts.slice(0, 2));
  const { colors } = useTheme();
  const likeAnimation = useRef(new Animated.Value(1)).current;

  const handleLike = (index) => {
    const updatedPosts = [...data];
    updatedPosts[index].likes += 1;
    setData(updatedPosts);

    // Like animation
    Animated.sequence([
      Animated.timing(likeAnimation, { toValue: 1.2, duration: 100, useNativeDriver: true }),
      Animated.timing(likeAnimation, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const handleAddComment = (index) => {
    if (commentText.trim() !== '') {
      const updatedPosts = [...data];
      updatedPosts[index].comments.push(commentText);
      setData(updatedPosts);
      setCommentText('');
    }
  };

  const handleShare = (post) => {
    alert(`Shared: ${post.title}`);
  };

  const handleSave = (index) => {
    const updatedPosts = [...data];
    updatedPosts[index].saved = !updatedPosts[index].saved;
    setData(updatedPosts);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData(posts.slice(0, 2));
      setPage(1);
      setRefreshing(false);
    }, 2000);
  };

  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setData((prevData) => [...prevData, ...posts.slice(page * 2, (page + 1) * 2)]);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    }, 1000);
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.post, { backgroundColor: colors.card }]}>
      <View style={styles.userInfo}>
        <Image source={item.user.avatar} style={styles.avatar} />
        <Text style={[styles.userName, { color: colors.text }]}>{item.user.name}</Text>
      </View>
      {item.image && <Image source={item.image} style={styles.image} />}
      {item.video && (
        <Video
          source={item.video}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
      )}
      <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
      <Text style={[styles.description, { color: colors.text }]}>{item.description}</Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleLike(index)} style={styles.iconButton}>
          <Animated.View style={{ transform: [{ scale: likeAnimation }] }}>
            <Ionicons name={item.likes % 2 === 0 ? 'heart' : 'heart-outline'} size={24} color="red" />
          </Animated.View>
          <Text style={[styles.iconText, { color: colors.text }]}>{item.likes} Likes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setSelectedPost(index); setCommentsVisible(true); }} style={styles.iconButton}>
          <Ionicons name="chatbubble-outline" size={24} color="blue" />
          <Text style={[styles.iconText, { color: colors.text }]}>{item.comments.length} Comments</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleShare(item)} style={styles.iconButton}>
          <Ionicons name="share-social-outline" size={24} color="green" />
          <Text style={[styles.iconText, { color: colors.text }]}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSave(index)} style={styles.iconButton}>
          <Ionicons name={item.saved ? 'bookmark' : 'bookmark-outline'} size={24} color="orange" />
          <Text style={[styles.iconText, { color: colors.text }]}>{item.saved ? 'Saved' : 'Save'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />

      <Modal visible={commentsVisible} animationType="slide">
        <View style={[styles.commentModal, { backgroundColor: colors.background }]}>
          <TouchableOpacity onPress={() => setCommentsVisible(false)} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
          <ScrollView>
            {selectedPost !== null &&
              data[selectedPost].comments.map((comment, idx) => (
                <Text key={idx} style={[styles.comment, { color: colors.text }]}>
                  - {comment}
                </Text>
              ))}
          </ScrollView>
          <View style={styles.commentInputContainer}>
            <TextInput
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Add a comment..."
              placeholderTextColor={colors.text}
              style={[styles.commentInput, { color: colors.text, borderColor: colors.text }]}
            />
            <Button title="Post" onPress={() => handleAddComment(selectedPost)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  post: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 250,
  },
  video: {
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
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    marginLeft: 5,
    fontSize: 16,
  },
  commentModal: {
    flex: 1,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  comment: {
    fontSize: 14,
    marginVertical: 5,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  loadingFooter: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#CED0CE',
  },
});

export default TipPageScreen;