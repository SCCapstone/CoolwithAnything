import { StyleSheet } from 'react-native';

const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: theme === 'dark' ? '#262626' : "white",
    },
      header: {
        flexDirection: 'row',
        height: 80,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#3e5e60',
        paddingHorizontal: 20,
      },
      backText: {
        marginTop: 30,
        fontSize: 24,
        fontWeight: '700',
        color: 'white',
      },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white', // Dark grey text for better readability
        marginTop: 35,
    },
    taskItem: {
        backgroundColor: theme === 'dark' ? '#262626' : "white",
        borderRadius: 10, // Rounded corners
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000', // Shadow for 3D effect
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
    },
    taskName: {
        fontSize: 18,
        color: theme === 'dark' ? 'white' : 'black',
        fontWeight: '900',
    },
    taskDetail: {
        fontSize: 16,
        color: theme === 'dark' ? 'white' : 'black',
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

export default getStyles;