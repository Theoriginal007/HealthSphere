// screens/SymptomAnalysis.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SymptomAnalysis = () => {
    const [symptoms, setSymptoms] = useState('');
    const [result, setResult] = useState('');

    const analyzeSymptoms = () => {
        // Dummy analysis result (replace with real logic)
        setResult(`Based on the symptoms "${symptoms}", you might consider the following actions...`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Symptom Analysis</Text>
            <TextInput
                style={styles.input}
                placeholder="Describe your symptoms..."
                value={symptoms}
                onChangeText={setSymptoms}
            />
            <Button title="Analyze Symptoms" onPress={analyzeSymptoms} />
            {result ? <Text style={styles.result}>{result}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
    },
    result: {
        marginTop: 20,
        fontSize: 16,
    },
});

export default SymptomAnalysis;
