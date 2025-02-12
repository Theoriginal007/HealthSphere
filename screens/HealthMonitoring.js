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

const dummyRecords = [
    { id: '1', symptoms: 'Migraines', details: 'Severe headache for 3 days.', image: 'https://via.placeholder.com/100', date: '2023-09-10' },
    { id: '2', symptoms: 'Flu', details: 'Fever and chills for 5 days.', image: 'https://via.placeholder.com/100', date: '2023-08-14' }
];

const HealthMonitoring = () => {
    const [symptoms, setSymptoms] = useState('');
    const [image, setImage] = useState(null);
    const [records, setRecords] = useState(dummyRecords);
    const [loading, setLoading] = useState(false);
    
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

    const exportToCSV = async () => {
        const csv = Papa.unparse(records);
        const fileUri = FileSystem.documentDirectory + 'health_data.csv';
        await FileSystem.writeAsStringAsync(fileUri, csv);
        Alert.alert('CSV Exported!');
    };

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

    return (
        <View>
            <Text>Health Monitoring</Text>
            <TextInput placeholder="Describe symptoms..." value={symptoms} onChangeText={setSymptoms} />
            <TouchableOpacity onPress={pickImage}><Text>Upload Image</Text></TouchableOpacity>
            {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
            <Button title="Submit" onPress={handleSubmit} disabled={loading} />
            {loading && <ActivityIndicator size="large" />}
            <FlatList 
                data={records} 
                keyExtractor={item => item.id} 
                renderItem={({ item }) => (
                    <View>
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
