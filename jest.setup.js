// This line should be at the top of the file to properly set up the environment for 'react-native-gesture-handler'
import 'react-native-gesture-handler/jestSetup';

// Mocking specific exports from 'react-native-gesture-handler'
jest.mock('react-native-gesture-handler', () => {
  return {
    // Add other components you want to mock here
    // For example:
    // Swipeable: jest.fn().mockImplementation(() => null),
    // DrawerLayout: jest.fn().mockImplementation(() => null),
  };
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock your external modules here if necessary, for example:
jest.mock('react-native/Libraries/Settings/Settings', () => ({
    get: jest.fn(),
    set: jest.fn(),
}));

// Add any additional setup or mocks below
