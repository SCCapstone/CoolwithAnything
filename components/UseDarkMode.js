import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useDarkMode = () => {
  const [theme, setTheme] = useState('light');
  const [mountedComponent, setMountedComponent] = useState(false);

  const setMode = async (mode) => {
    try {
      await AsyncStorage.setItem('theme', mode);
      setTheme(mode);
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  };

  const themeToggler = () => {
    theme === 'light' ? setMode('dark') : setMode('light');
  };

  useEffect(() => {
    const getStoredTheme = async () => {
      try {
        const localTheme = await AsyncStorage.getItem('theme');
        localTheme ? setTheme(localTheme) : setMode('light');
        setMountedComponent(true);
      } catch (error) {
        console.error('Error getting stored theme:', error);
      }
    };

    getStoredTheme();
  }, []);

  return [theme, themeToggler, mountedComponent];
};