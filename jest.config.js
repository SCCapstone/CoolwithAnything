module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-community|react-native-gesture-handler|@react-native-js-polyfills)/)',
  ],

  // Detox-specific configurations
  setupFilesAfterEnv: ['<rootDir>/e2e/init.js'],  // This file will contain Detox-specific initialization code
  testEnvironment: 'node',
  testRunner: 'jest-circus/runner',  // Recommended test runner for Detox
  testTimeout: 120000,  // Increase timeout for Detox tests

  // Define a separate testRegex for Detox e2e tests to avoid conflicts with your unit/integration tests
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',  // Modify as needed to match your project's file structure

  // Detox runs e2e tests in a separate environment, so you may want to exclude them from your unit test runs
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};
