import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Alert, 
    FlatList, 
    Modal, 
    Button,
    Image,
    ActivityIndicator 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

// Dummy data for testing purposes
const dummyRecords = [
    { id: '1', symptoms: 'Migraines', details: 'Severe headache for 3 days.', image: 'https://via.placeholder.com/100', date: '2023-09-10' },
    { id: '2', symptoms: 'Flu', details: 'Fever and chills for 5 days.', image: 'https://via.placeholder.com/100', date: '2023-08-14' }
];

// Health Monitoring Component
const HealthMonitoring = () => {
    const [symptoms, setSymptoms] = useState('');
    const [image, setImage] = useState(null);
    const [records, setRecords] = useState(dummyRecords);
    const [loading, setLoading] = useState(false);
    const [sleepData, setSleepData] = useState([6, 7, 8, 6, 5, 7, 8]); // Dummy sleep data (hours)

    // Handle image picker
    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permission required!");
            return;
        }
        try {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            Alert.alert("Image selection failed!");
        }
    };

    // Handle symptom submission
    const handleSubmit = () => {
        if (symptoms.trim().length < 5) {
            Alert.alert('Error', 'Describe symptoms with at least 5 characters.');
            return;
        }
        setLoading(true);
        const newRecord = {
            id: Date.now().toString(),
            symptoms,
            details: 'User description',
            image: image || 'https://via.placeholder.com/100',
            date: new Date().toLocaleDateString(),
        };
        setRecords([...records, newRecord]);
        setSymptoms('');
        setImage(null);
        setLoading(false);
        Toast.show({ type: 'success', text1: 'Submitted!', text2: 'Symptoms recorded.' });
    };

    // Export to CSV
    const exportToCSV = async () => {
        const csv = Papa.unparse(records);
        const fileUri = FileSystem.documentDirectory + 'health_data.csv';
        await FileSystem.writeAsStringAsync(fileUri, csv);
        Alert.alert('CSV Exported!');
    };

    // Export to PDF
    const exportToPDF = async () => {
        const html = `
            <h1>Health Records</h1>
            <table>
                <tr><th>Symptom</th><th>Details</th><th>Date</th></tr>
                ${records.map(r => `<tr><td>${r.symptoms}</td><td>${r.details}</td><td>${r.date}</td></tr>`).join('')}
            </table>
        `;
        const options = { html, fileName: 'health_data', directory: 'Documents' };
        const file = await RNHTMLtoPDF.convert(options);
        Alert.alert('PDF Exported!', `Saved at: ${file.filePath}`);
    };

    // Line chart for sleep data
    const sleepChart = (
        <LineChart
            data={{
                labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                datasets: [{
                    data: sleepData,
                    strokeWidth: 2,
                }]
            }}
            width={Dimensions.get('window').width - 40} // Screen width for responsiveness
            height={220}
            chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 1, // Optional
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16,
                },
                propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                },
            }}
            style={{
                marginVertical: 8,
                borderRadius: 16,
            }}
        />
    );

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Health Monitoring</Text>
            <TextInput 
                placeholder="Describe symptoms..." 
                value={symptoms} 
                onChangeText={setSymptoms} 
                style={{ borderWidth: 1, marginVertical: 10, padding: 10 }} 
            />
            <TouchableOpacity onPress={pickImage}>
                <Text style={{ color: 'blue' }}>Upload Image</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, marginVertical: 10 }} />}
            <Button title="Submit" onPress={handleSubmit} disabled={loading} />
            {loading && <ActivityIndicator size="large" />}
            
            {/* Sleep Tracking Visualization */}
            <Text style={{ marginVertical: 20, fontSize: 18 }}>Sleep Tracking (Last 7 Days)</Text>
            {sleepChart}

            {/* List of Recorded Symptoms */}
            <FlatList 
                data={records} 
                keyExtractor={item => item.id} 
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 10 }}>
                        <Text>{item.symptoms}</Text>
                        <Text>{item.details}</Text>
                        <Text>{item.date}</Text>
                        <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
                    </View>
                )}
            />
            <Button title="Export to CSV" onPress={exportToCSV} />
            <Button title="Export to PDF" onPress={exportToPDF} />
        </View>
    );
};

export default HealthMonitoring;
