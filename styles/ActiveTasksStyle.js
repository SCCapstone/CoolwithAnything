import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Get the window width
const circleSize = width / 4 - 10; // Calculate size to fit 4 across with padding

const getStyles = (theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    circle: {
        width: '23%', // Adjust according to screen size or preferences
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 1,
        borderRadius: 50,
        padding: 10,
    },
    countText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    labelText: {
        color: 'white',
    },
    title: {
        color: theme === 'dark' ? 'white' : 'black',
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        marginBottom: 10,
    },
    switchLabel: {
        marginLeft: 10,
    },
    darkText: {
        color: '#ffffff', // Light text for dark backgrounds
    },
    lightText: {
        color: '#000000', // Dark text for light backgrounds
    },
    taskText: {
        color: theme === 'dark' ? 'white' : 'black', 
    },
});

export default getStyles;