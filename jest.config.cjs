module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!@mui/x-charts|@mui/material|@babel/runtime|d3-(color|format|interpolate|scale|shape|time|time-format|path|array)|internmap)',
    ],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'mjs'],
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy'
    },
  };