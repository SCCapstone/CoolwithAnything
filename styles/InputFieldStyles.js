import { StyleSheet } from 'react-native';

const getStyles = (theme) => StyleSheet.create({
    input: {
        backgroundColor: 'white', // Darker shade for input background
        color: theme === 'dark' ? 'white' : 'black', // White color text for better contrast
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 20,
        borderColor: theme === 'dark' ? 'white' : 'black',
        borderWidth: 1,
      },
});
  
export default getStyles;