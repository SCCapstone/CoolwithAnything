jest.mock('react-native-gesture-handler', () => {
    // Mock the actual modules and functions used from 'react-native-gesture-handler'
    return {
      // Example: if you are using the 'Swipeable' and 'DrawerLayout' components
      Swipeable: jest.fn().mockImplementation(() => null),
      DrawerLayout: jest.fn().mockImplementation(() => null),
      // Add other components or methods as necessary
    };
  });
  
  // Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
  jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
  
  // Mock your external modules here if necessary, for example:
  jest.mock('react-native/Libraries/Settings/Settings', () => ({
      get: jest.fn(),
      set: jest.fn(),
  }));
