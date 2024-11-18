// src/components/Button.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ padding: 10, backgroundColor: 'blue' }}>
    <Text style={{ color: 'white' }}>{title}</Text>
  </TouchableOpacity>
);

export default Button;
