import React, { useState, forwardRef } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Button, 
    Image, 
    TouchableOpacity, 
    Alert, 
    FlatList, 
    Modal, 
    ActivityIndicator 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

// Dummy data with past health records
const dummyPastRecords = [
    { symptoms: 'Migraines', details: 'Severe headache with sensitivity to light and sound. Lasted for 3 days.', image: 'https://via.placeholder.com/100', id: '1', date: '2023-09-10' },
    { symptoms: 'Flu', details: 'Fever, chills, muscle aches, and sore throat. Duration: 5 days.', image: 'https://via.placeholder.com/100', id: '2', date: '2023-08-14' },
    { symptoms: 'Backache', details: 'Persistent pain in the lower back. Duration: 2 weeks.', image: 'https://via.placeholder.com/100', id: '3', date: '2023-09-25' },
    { symptoms: 'Obesity', details: 'Weight significantly increased over the past year. BMI: 30.', image: 'https://via.placeholder.com/100', id: '4', date: '2023-10-05' },
    { symptoms: 'Cough', details: 'Dry cough lasting for over a week. No fever.', image: 'https://via.placeholder.com/100', id: '5', date: '2023-09-15' },
    { symptoms: 'Fatigue', details: 'Constant tiredness and lack of energy for 3 weeks.', image: 'https://via.placeholder.com/100', id: '6', date: '2023-09-20' },
    { symptoms: 'Nausea', details: 'Feeling nauseous after meals, especially fatty foods. Duration: 4 days.', image: 'https://via.placeholder.com/100', id: '7', date: '2023-09-30' },
    { symptoms: 'Skin rash', details: 'Red, itchy rash on the arms and legs. Duration: 5 days.', image: 'https://via.placeholder.com/100', id: '8', date: '2023-10-01' },
    { symptoms: 'Shortness of breath', details: 'Experiencing difficulty breathing during physical activities.', image: 'https://via.placeholder.com/100', id: '9', date: '2023-10-10' },
    { symptoms: 'Chest pain', details: 'Intermittent chest pain, especially during exercise. Duration: 1 week.', image: 'https://via.placeholder.com/100', id: '10', date: '2023-10-12' },
    { symptoms: 'Fever', details: 'High fever and chills for 2 days. Accompanied by fatigue.', image: 'https://via.placeholder.com/100', id: '11', date: '2023-10-15' },
];

const HealthMonitoring = () => {
    const [symptoms, setSymptoms] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [pastRecords, setPastRecords] = useState(dummyPastRecords);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [bmiModalVisible, setBmiModalVisible] = useState(false);
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmiResult, setBmiResult] = useState('');
    const colors = ['#FFCCBC', '#B2DFDB', '#BBDEFB', '#FFE0B2', '#D1C4E9', '#C8E6C9'];

    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.dotsButton} onPress={() => setBmiModalVisible(true)}>
              <Text style={styles.dotsText}>...</Text>
          </TouchableOpacity>

          {/* Render additional components or views here */}
      </View>
  );
};

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("Permission is required to access camera roll!");
            return;
        }
        try {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri);
            }
        } catch (error) {
            Alert.alert("Image selection failed!");
        }
    };

    const handleSubmit = () => {
        if (symptoms.trim().length < 5) {
            Alert.alert('Submission Error', 'Please describe your symptoms with at least 5 characters.');
            return;
        }
        setLoading(true);
        const newRecord = {
            symptoms,
            details: 'User-entered symptoms description',
            image: selectedImage || 'https://via.placeholder.com/100',
            id: Date.now().toString(),
            date: new Date().toLocaleDateString(),
        };
        setPastRecords((prevRecords) => [...prevRecords, newRecord]);
        setSymptoms('');
        setSelectedImage(null);

        const simulatedPrediction = generatePredictions(symptoms);
        setPredictions((prevPredictions) => [...prevPredictions, simulatedPrediction]);
        setLoading(false);

        Toast.show({
            type: 'success',
            text1: 'Record Submitted!',
            text2: 'Your symptoms have been recorded.',
        });
    };

    const generatePredictions = (symptoms) => {
        const predictionsMap = {
            'Migraines': 'Possible conditions: Stress, Dehydration, Migraine Disorder.',
            'Flu': 'Possible conditions: Influenza, common cold.',
            'Backache': 'Possible conditions: Muscle strain, Herniated disc, Kidney issues.',
            'Obesity': 'Possible conditions: Heart disease, Diabetes, Joint problems.',
            'Cough': 'Possible conditions: Common cold, Allergies, Respiratory infections.',
            'Fatigue': 'Possible conditions: Anemia, Thyroid issues, Chronic fatigue syndrome.',
            'Nausea': 'Possible conditions: Gastroenteritis, Food poisoning, Pregnancy.',
            'Skin rash': 'Possible conditions: Allergies, Eczema, Psoriasis.',
            'Shortness of breath': 'Possible conditions: Asthma, COPD, Heart issues.',
            'Chest pain': 'Possible conditions: Angina, Heart attack, Panic attacks.',
            'Fever': 'Possible conditions: Infection, Inflammation, Heat exhaustion.',
        };
        return predictionsMap[symptoms] || 'No specific predictions available.';
    };

    const handleRecordPress = (record) => {
        setSelectedRecord(record);
        setModalVisible(true);
    };

    const exportToCSV = async () => {
      const csv = Papa.unparse(healthData);
      const fileUri = FileSystem.documentDirectory + 'health_data.csv';
      await FileSystem.writeAsStringAsync(fileUri, csv);
      alert('CSV file exported successfully!');
  };

  const exportToPDF = async () => {
      const html = `
          <h1>Health Data Records</h1>
          <table>
              <tr><th>Symptom</th><th>Details</th><th>Prediction</th></tr>
              ${healthData.map(record => `
                  <tr>
                      <td>${record.symptom}</td>
                      <td>${record.details}</td>
                      <td>${record.prediction}</td>
                  </tr>
              `).join('')}
          </table>
      `;

      const options = {
          html,
          fileName: 'health_data',
          directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      alert('PDF file exported successfully at: ' + file.filePath);
  };
  return (
    <View>
        <Text>Health Monitoring Records</Text>
        {healthData.map((record, index) => (
            <View key={index}>
                <Text>Symptom: {record.symptom}</Text>
                <Text>Details: {record.details}</Text>
                <Text>Prediction: {record.prediction}</Text>
            </View>
        ))}
        <Button title="Export to CSV" onPress={exportToCSV} />
        <Button title="Export to PDF" onPress={exportToPDF} />
    </View>
);
    // BMI Calculation
    const calculateBMI = () => {
        const weightNum = parseFloat(weight);
        const heightNum = parseFloat(height) / 100; // Convert height to meters
        if (!weightNum || !heightNum) {
            Alert.alert("Invalid Input", "Please enter valid weight and height.");
            return;
        }
        const bmi = (weightNum / (heightNum * heightNum)).toFixed(2);
        setBmiResult(`Your BMI is: ${bmi}`);
    };

    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.dotsButton} onPress={() => setBmiModalVisible(true)}>
              <Text style={styles.dotsText}>...</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Health Monitoring</Text>

          <TextInput
              style={styles.input}
              placeholder="Describe your symptoms..."
              value={symptoms}
              onChangeText={setSymptoms}
              multiline
          />

          {/* Arrange buttons vertically */}
          <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={pickImage}>
                  <Text style={styles.buttonText}>Upload Image</Text>
              </TouchableOpacity>

              {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}

              <Button title="Submit" color="#FF6347" onPress={handleSubmit} />
          </View>

          {loading && <ActivityIndicator size="large" color="#3498DB" style={styles.loadingIndicator} />}

          <Text style={styles.subtitle}>Past Records</Text>
          <FlatList
              data={pastRecords}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                  // Randomly select a color from the colors array
                  const backgroundColor = colors[Math.floor(Math.random() * colors.length)];

                  return (
                      <TouchableOpacity 
                          style={[styles.recordContainer, { backgroundColor }]} // Apply the background color
                          onPress={() => handleRecordPress(item)}
                      >
                          <Image source={{ uri: item.image }} style={styles.recordImage} />
                          <View style={styles.recordDetails}>
                              <Text style={styles.recordSymptoms}>{item.symptoms}</Text>
                              <Text style={styles.recordDate}>{item.date}</Text>
                          </View>
                      </TouchableOpacity>
                  );
              }}
          />

          {/* Modal for Viewing Record Details */}
          <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
              <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Record Details</Text>
                  {selectedRecord && (
                      <>
                          <Image source={{ uri: selectedRecord.image }} style={styles.modalImage} />
                          <Text style={styles.modalSymptoms}>Symptoms: {selectedRecord.symptoms}</Text>
                          <Text style={styles.modalDetails}>Details: {selectedRecord.details}</Text>
                          <Text style={styles.modalDate}>Date: {selectedRecord.date}</Text>
                      </>
                  )}
                  <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
          </Modal>

          {/* Modal for BMI Calculation */}
          <Modal visible={bmiModalVisible} animationType="slide" onRequestClose={() => setBmiModalVisible(false)}>
              <View style={styles.bmiModalContainer}>
                  <Text style={styles.bmiTitle}>BMI Calculator</Text>
                  <TextInput
                      style={styles.bmiInput}
                      placeholder="Weight (kg)"
                      keyboardType="numeric"
                      value={weight}
                      onChangeText={setWeight}
                  />
                  <TextInput
                      style={styles.bmiInput}
                      placeholder="Height (cm)"
                      keyboardType="numeric"
                      value={height}
                      onChangeText={setHeight}
                  />
                  <Button title="Calculate BMI" onPress={calculateBMI} />
                  {bmiResult && <Text style={styles.bmiResult}>{bmiResult}</Text>}
                  <Button title="Close" onPress={() => setBmiModalVisible(false)} />
              </View>
          </Modal>

          <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  loadingIndicator: {
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  recordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  recordImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  recordDetails: {
    flex: 1,
  },
  recordSymptoms: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  recordDate: {
    fontSize: 14,
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  modalSymptoms: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDetails: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  bmiModalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  bmiTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  bmiInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    marginBottom: 15,
    textAlign: 'center',
  },
  bmiResult: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  dotsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  dotsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
});


export default HealthMonitoring;
