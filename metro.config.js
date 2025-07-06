const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add TypeScript extensions
config.resolver.sourceExts.push('ts', 'tsx', 'mjs', 'cjs');

// Asset extensions (for images, fonts, etc.)
config.resolver.assetExts = [
  ...config.resolver.assetExts.filter(ext => ext !== 'svg'), // Remove svg from assetExts
  'bin', // Add any other custom asset extensions you need
];

// SVG support (optional)
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

module.exports = config;