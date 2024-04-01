import { StyleSheet } from 'react-native';

const getStyles = (theme) => StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
      },
      title: {
        color: theme === 'dark' ? 'white' : 'black',
        fontSize: 22,
        fontWeight: 'bold',
      },
      closeButton: {
        fontSize: 22,
      },
    });
export default getStyles;