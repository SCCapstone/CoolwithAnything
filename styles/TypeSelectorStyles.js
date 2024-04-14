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
        backgroundColor: '#5da8af',
        borderColor: '#8dc2c7', 
      },
      typeText: {
        color: '#000', // Text color for the type button
      },
    });
export default getStyles;