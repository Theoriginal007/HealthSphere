// __tests__/Component.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import Button from '../src/components/Button';

test('Button renders correctly', () => {
  const { getByText } = render(<Button title="Click me" onPress={() => {}} />);
  expect(getByText('Click me')).toBeTruthy();
});
