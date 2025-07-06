
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FileText, TrendingUp, BarChart3, Calendar } from 'lucide-react-native';

const ReportsScreen = () => {
  const reports = [
    {
      id: 1,
      title: "Health Summary",
      description: "Overall health metrics and trends",
      icon: BarChart3,
      color: "#3b82f6",
      date: "Last 30 days"
    },
    {
      id: 2,
      title: "Medication Report",
      description: "Medication adherence and effectiveness",
      icon: FileText,
      color: "#10b981",
      date: "This month"
    },
    {
      id: 3,
      title: "Activity Report",
      description: "Physical activity and exercise tracking",
      icon: TrendingUp,
      color: "#f97316",
      date: "This week"
    },
    {
      id: 4,
      title: "Appointment History",
      description: "Past consultations and checkups",
      icon: Calendar,
      color: "#ec4899",
      date: "Last 6 months"
    }
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Health Reports</Text>
      
      <View style={styles.reportsContainer}>
        {reports.map((report) => {
          const IconComponent = report.icon;
          return (
            <TouchableOpacity key={report.id} style={styles.reportCard}>
              <View style={styles.cardContent}>
                <View style={[styles.iconContainer, { backgroundColor: `${report.color}20` }]}>
                  <IconComponent size={20} color={report.color} strokeWidth={2} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.reportTitle}>{report.title}</Text>
                  <Text style={styles.reportDescription}>{report.description}</Text>
                  <Text style={styles.reportDate}>{report.date}</Text>
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
    paddingTop: 60, // Add top padding to prevent content from starting at the very top
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 24,
  },
  reportsContainer: {
    gap: 16,
  },
  reportCard: {
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
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  reportDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  reportDate: {
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
});

export default ReportsScreen;
