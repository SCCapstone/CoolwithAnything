module.exports = {
  preset: 'jest-expo',
  transform: {
      '^.+\\.js$': 'babel-jest',
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
};
