import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, TextInput, Alert } from 'react-native';
import { Calendar, Bell, Heart, User } from 'lucide-react-native';

interface Reminder {
  id: string;
  title: string;
  time: string;
  icon: any;
  color: string;
  completed: boolean;
  recurring: string;
}

const RemindersScreen = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: "Take Morning Vitamins",
      time: "8:00 AM",
      icon: Heart,
      color: "#3b82f6",
      completed: false,
      recurring: "Daily"
    },
    {
      id: '2',
      title: "Doctor Appointment - Dr. Smith",
      time: "2:00 PM",
      icon: Calendar,
      color: "#10b981",
      completed: false,
      recurring: "One-time"
    },
    {
      id: '3',
      title: "Evening Walk",
      time: "6:00 PM",
      icon: Bell,
      color: "#f97316",
      completed: true,
      recurring: "Daily"
    },
    {
      id: '4',
      title: "Blood Pressure Check",
      time: "9:00 PM",
      icon: Bell,
      color: "#ec4899",
      completed: false,
      recurring: "Weekly"
    },
    {
      id: '5',
      title: "Take Evening Medication",
      time: "10:00 PM",
      icon: Heart,
      color: "#8b5cf6",
      completed: false,
      recurring: "Daily"
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    time: '',
    recurring: 'Daily'
  });

  const toggleReminder = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  };

  const handleAddReminder = () => {
    if (!newReminder.title.trim() || !newReminder.time.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const reminder: Reminder = {
      id: Date.now().toString(),
      title: newReminder.title,
      time: newReminder.time,
      icon: Bell,
      color: "#3b82f6",
      completed: false,
      recurring: newReminder.recurring
    };

    setReminders([...reminders, reminder]);
    setNewReminder({ title: '', time: '', recurring: 'Daily' });
    setShowAddModal(false);
    Alert.alert('Success', 'Reminder added successfully!');
  };

  const deleteReminder = (id: string) => {
    Alert.alert(
      'Delete Reminder',
      'Are you sure you want to delete this reminder?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setReminders(prev => prev.filter(reminder => reminder.id !== id))
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Health Reminders</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.subtitle}>Stay on track with your health routine</Text>
      
      <View style={styles.remindersContainer}>
        {reminders.map((reminder) => {
          const IconComponent = reminder.icon;
          return (
            <TouchableOpacity 
              key={reminder.id} 
              style={[styles.reminderCard, reminder.completed && styles.completedCard]}
              onPress={() => toggleReminder(reminder.id)}
            >
              <View style={styles.cardContent}>
                <View style={[styles.iconContainer, { backgroundColor: `${reminder.color}20` }]}>
                  <IconComponent size={20} color={reminder.color} strokeWidth={2} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.reminderTitle, reminder.completed && styles.completedText]}>
                    {reminder.title}
                  </Text>
                  <Text style={styles.reminderTime}>{reminder.time}</Text>
                  <Text style={styles.reminderRecurring}>{reminder.recurring}</Text>
                </View>
                <View style={styles.statusContainer}>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteReminder(reminder.id)}
                  >
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                  <View style={[
                    styles.statusDot, 
                    { backgroundColor: reminder.completed ? '#10b981' : '#6b7280' }
                  ]} />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Reminder</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Reminder Title"
              value={newReminder.title}
              onChangeText={(text) => setNewReminder(prev => ({ ...prev, title: text }))}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Time (e.g., 8:00 AM)"
              value={newReminder.time}
              onChangeText={(text) => setNewReminder(prev => ({ ...prev, time: text }))}
            />
            
            <View style={styles.recurringContainer}>
              <Text style={styles.recurringLabel}>Frequency:</Text>
              <View style={styles.recurringOptions}>
                {['Daily', 'Weekly', 'Monthly', 'One-time'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.recurringOption,
                      newReminder.recurring === option && styles.selectedRecurring
                    ]}
                    onPress={() => setNewReminder(prev => ({ ...prev, recurring: option }))}
                  >
                    <Text style={[
                      styles.recurringText,
                      newReminder.recurring === option && styles.selectedRecurringText
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddReminder}
              >
                <Text style={styles.saveButtonText}>Add Reminder</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },
  remindersContainer: {
    gap: 16,
  },
  reminderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  completedCard: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#6b7280',
  },
  reminderTime: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  reminderRecurring: {
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  deleteText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
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
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 16,
    marginBottom: 16,
  },
  recurringContainer: {
    marginBottom: 20,
  },
  recurringLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  recurringOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  recurringOption: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  selectedRecurring: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  recurringText: {
    fontSize: 14,
    color: '#6b7280',
  },
  selectedRecurringText: {
    color: '#ffffff',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
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

export default RemindersScreen;
