import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0', // Light grey background
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333', // Dark grey text for better readability
        marginBottom: 20,
    },
    taskItem: {
        backgroundColor: 'white', // White background for task items
        borderRadius: 10, // Rounded corners
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000', // Shadow for 3D effect
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    taskDetail: {
        fontSize: 16,
        color: '#666', // Medium grey for text
        marginBottom: 5,
    },
    taskPriority: {
        fontWeight: 'bold',
        color: '#007bff', // Blue color for emphasis on priority
    },
    touchableHighlight: {
        borderRadius: 10, // Ensures the ripple effect stays within the rounded borders
    },
});