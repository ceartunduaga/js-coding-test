module.exports = {
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
      '^.+\\.mjs$': 'babel-jest', 
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(@babel/runtime|@mui|d3-shape|internmap|delaunator|robust-predicates)/)',
    ],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'mjs']
  };