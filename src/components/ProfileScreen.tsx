import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, TextInput, Alert } from 'react-native';
import { User, Bell, Heart } from 'lucide-react-native';

interface UserProfile {
  name: string;
  email: string;
  height: string;
  weight: string;
  bloodType: string;
  age: string;
}

const ProfileScreen = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Laura Johnson",
    email: "laura.johnson@email.com",
    height: "5'6\"",
    weight: "135 lbs",
    bloodType: "O+",
    age: "28 years"
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState<UserProfile>(profile);

  const menuItems = [
    { id: 1, title: "Personal Information", icon: User, color: "#3b82f6" },
    { id: 2, title: "Health Profile", icon: Heart, color: "#ec4899" },
    { id: 3, title: "Settings", icon: User, color: "#6b7280" },
    { id: 4, title: "Notifications", icon: Bell, color: "#f59e0b" },
    { id: 5, title: "Privacy & Security", icon: User, color: "#10b981" },
    { id: 6, title: "Help & Support", icon: User, color: "#8b5cf6" },
    { id: 7, title: "Sign Out", icon: User, color: "#ef4444" }
  ];

  const healthStats = [
    { label: "Height", value: profile.height },
    { label: "Weight", value: profile.weight },
    { label: "Blood Type", value: profile.bloodType },
    { label: "Age", value: profile.age }
  ];

  const handleSaveProfile = () => {
    if (!editingProfile.name.trim() || !editingProfile.email.trim()) {
      Alert.alert('Error', 'Name and email are required');
      return;
    }

    setProfile(editingProfile);
    setShowEditModal(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleMenuPress = (title: string) => {
    if (title === 'Personal Information' || title === 'Health Profile') {
      setShowEditModal(true);
    } else {
      Alert.alert('Coming Soon', `${title} feature will be available soon!`);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <User size={48} color="#ffffff" strokeWidth={2} />
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setShowEditModal(true)}
          >
            <Text style={styles.editButtonText}>✏️</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.email}>{profile.email}</Text>
      </View>

      {/* Quick Health Stats */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Health Overview</Text>
        <View style={styles.statsGrid}>
          {healthStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.menuContainer}>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity 
                key={item.id} 
                style={styles.menuItem}
                onPress={() => handleMenuPress(item.title)}
              >
                <View style={styles.menuContent}>
                  <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
                    <IconComponent size={20} color={item.color} strokeWidth={2} />
                  </View>
                  <Text style={styles.menuText}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Edit Profile Modal */}
      <Modal visible={showEditModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              value={editingProfile.name}
              onChangeText={(text) => setEditingProfile(prev => ({ ...prev, name: text }))}
              placeholder="Enter your name"
            />
            
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={editingProfile.email}
              onChangeText={(text) => setEditingProfile(prev => ({ ...prev, email: text }))}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
            
            <Text style={styles.inputLabel}>Height</Text>
            <TextInput
              style={styles.input}
              value={editingProfile.height}
              onChangeText={(text) => setEditingProfile(prev => ({ ...prev, height: text }))}
              placeholder="Enter your height"
            />
            
            <Text style={styles.inputLabel}>Weight</Text>
            <TextInput
              style={styles.input}
              value={editingProfile.weight}
              onChangeText={(text) => setEditingProfile(prev => ({ ...prev, weight: text }))}
              placeholder="Enter your weight"
            />
            
            <Text style={styles.inputLabel}>Blood Type</Text>
            <TextInput
              style={styles.input}
              value={editingProfile.bloodType}
              onChangeText={(text) => setEditingProfile(prev => ({ ...prev, bloodType: text }))}
              placeholder="Enter your blood type"
            />
            
            <Text style={styles.inputLabel}>Age</Text>
            <TextInput
              style={styles.input}
              value={editingProfile.age}
              onChangeText={(text) => setEditingProfile(prev => ({ ...prev, age: text }))}
              placeholder="Enter your age"
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setEditingProfile(profile);
                  setShowEditModal(false);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveProfile}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 80,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    backgroundColor: '#3b82f6',
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#10b981',
    borderRadius: 16,
    padding: 8,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  editButtonText: {
    fontSize: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#6b7280',
  },
  statsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  menuSection: {
    marginBottom: 24,
  },
  menuContainer: {
    gap: 12,
  },
  menuItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 16,
    marginBottom: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  saveButton: {
    backgroundColor: '#3b82f6',
  },
  cancelButtonText: {
    color: '#6b7280',
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default ProfileScreen;
