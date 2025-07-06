
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Heart, Activity, User, Bell } from 'lucide-react-native';

const HealthTipsScreen = () => {
  const healthTips = [
    {
      id: 1,
      title: "Stay Hydrated",
      description: "Drink at least 8 glasses of water daily to maintain optimal health",
      icon: Heart,
      color: "#3b82f6",
      category: "Nutrition"
    },
    {
      id: 2,
      title: "Regular Exercise",
      description: "Aim for 30 minutes of moderate exercise 5 days a week",
      icon: Activity,
      color: "#10b981",
      category: "Fitness"
    },
    {
      id: 3,
      title: "Quality Sleep",
      description: "Get 7-9 hours of quality sleep every night for better health",
      icon: Bell,
      color: "#8b5cf6",
      category: "Wellness"
    },
    {
      id: 4,
      title: "Stress Management",
      description: "Practice meditation or deep breathing to manage daily stress",
      icon: User,
      color: "#ec4899",
      category: "Mental Health"
    }
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Heart size={32} color="#ec4899" strokeWidth={2} />
        <Text style={styles.title}>Health Tips</Text>
        <Text style={styles.subtitle}>Daily tips for better health and wellness</Text>
      </View>

      <View style={styles.tipsContainer}>
        {healthTips.map((tip) => {
          const IconComponent = tip.icon;
          return (
            <TouchableOpacity key={tip.id} style={styles.tipCard}>
              <View style={styles.cardContent}>
                <View style={[styles.iconContainer, { backgroundColor: `${tip.color}20` }]}>
                  <IconComponent size={24} color={tip.color} strokeWidth={2} />
                </View>
                <View style={styles.textContainer}>
                  <View style={styles.categoryContainer}>
                    <Text style={[styles.category, { color: tip.color }]}>{tip.category}</Text>
                  </View>
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  <Text style={styles.tipDescription}>{tip.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  tipsContainer: {
    gap: 16,
  },
  tipCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
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
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  categoryContainer: {
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
});

export default HealthTipsScreen;
