import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { func, string } from 'prop-types';

const Toggle = ({ theme, toggleTheme }) => {
  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.button}>
      <Text style={styles.text}>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</Text>
    </TouchableOpacity>
  );
};

Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};

const styles = StyleSheet.create({
  button: {
    border: 2,
    borderColor: 'gray',
    borderRadius: 30,
    padding: 8,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'black', // Adjust color based on your theme
  },
});

export default Toggle;