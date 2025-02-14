import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  ActivityIndicator, 
  useColorScheme 
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const VirtualConsultationScreen = () => {
  const navigation = useNavigation(); // React Navigation hook for navigation
  const scheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);
  const isDarkMode = scheme === 'dark';

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000); // Simulate loading
  }, []);

  const handlePress = (route) => {
    navigation.navigate(route); // Navigate to respective screen
  };

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: isDarkMode ? '#333' : '#f5f5f5' }]}>
        <ActivityIndicator size="large" color="#00B3B3" />
        <Text style={[styles.loadingText, { color: isDarkMode ? '#fff' : '#333' }]}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#f5f5f5' }]}
    >
      <Image
        source={require('../images/doctor.jpg')}
        style={styles.image}
      />

      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#333' }]}>Virtual Consultation</Text>
      <Text style={[styles.subtitle, { color: isDarkMode ? '#ccc' : '#666' }]}>
        Connect with healthcare professionals anytime, anywhere.
      </Text>

      <View style={styles.buttonContainer}>
        <CustomButton
          icon="calendar"
          text="Book Appointment"
          onPress={() => handlePress('BookAppointmentScreen')} // Navigate to BookAppointmentScreen
          isDarkMode={isDarkMode}
        />
        <CustomButton
          icon="pulse"
          text="AI Symptom Checker"
          onPress={() => handlePress('AISymptomCheckerScreen')} // Navigate to AISymptomCheckerScreen
          isDarkMode={isDarkMode}
        />
        <CustomButton
          icon="health-and-safety"
          text="Emergency Consultation"
          iconType="MaterialIcons"
          onPress={() => handlePress('EmergencyConsultationScreen')}
          isDarkMode={isDarkMode}
        />
        <CustomButton
          icon="hospital"
          text="Find Nearby Clinics"
          iconType="FontAwesome5"
          onPress={() => handlePress('FindNearbyClinicsScreen')}
          isDarkMode={isDarkMode}
        />
        <CustomButton
          icon="chatbubbles"
          text="Chat with Doctor"
          onPress={() => handlePress('ChatWithDoctorScreen')}
          isDarkMode={isDarkMode}
        />
        <CustomButton
          icon="folder-open"
          text="Health Records"
          onPress={() => handlePress('HealthRecordsScreen')}
          isDarkMode={isDarkMode}
        />
      </View>

      {/* Additional sections... */}
    </ScrollView>
  );
};

/** Custom Button Component **/
const CustomButton = ({ icon, text, onPress, iconType = 'Ionicons', isDarkMode }) => {
  const IconComponent = iconType === 'MaterialIcons' ? MaterialIcons : iconType === 'FontAwesome5' ? FontAwesome5 : Ionicons;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: isDarkMode ? '#00B3B3' : '#00B3B3',
          shadowColor: isDarkMode ? '#000' : '#007777',
        },
      ]}
      onPress={onPress}
    >
      <IconComponent name={icon} size={26} color="white" style={styles.icon} />
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

/** Styles **/
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 125,
    borderWidth: 3,
    borderColor: '#00B3B3',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 25,
    textAlign: 'center',
    maxWidth: 320,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 25,
    marginVertical: 12,
    borderRadius: 15,
    width: '90%',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  sectionContainer: {
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  sectionText: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default VirtualConsultationScreen;
