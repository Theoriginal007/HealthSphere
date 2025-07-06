import React from 'react';
import { registerRootComponent } from 'expo';
import { AppRegistry, View, Text } from 'react-native';
import App from './src/App';

// Error boundary component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Something went wrong. Please restart the app.</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

// Wrap your app with error boundary
const AppWithErrorBoundary = (props) => (
  <ErrorBoundary>
    <App {...props} />
  </ErrorBoundary>
);

// Register the main component
registerRootComponent(AppWithErrorBoundary);

// Additional safety check for React Native
if (module.hot) {
  module.hot.accept();
}