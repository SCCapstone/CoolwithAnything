import { StyleSheet } from 'react-native';

const getStyles = (theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
      },
      typeButton: {
        padding: 13,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#647e87', // Normal border color
        backgroundColor: '#3e5e60',
      },
      selectedTypeButton: {
        backgroundColor: '#5da8af',
        borderColor: '#8dc2c7', 
      },
      typeText: {
        color: 'white', // Text color for the type button
        fontWeight: '700',
      },
    });
export default getStyles;