import { StyleSheet } from 'react-native';

const getStyles = (theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
      },
      typeButton: {
        padding: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc', // Normal border color
        backgroundColor: 'white',
      },
      selectedTypeButton: {
        backgroundColor: '#007bff', // Background color for the selected type
        borderColor: '#0056b3', // Optional: change border color for the selected type
      },
      typeText: {
        color: '#000', // Text color for the type button
      },
    });
export default getStyles;