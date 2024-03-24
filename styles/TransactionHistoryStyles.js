import { StyleSheet } from 'react-native';

const getStyles = (theme) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#262626' : "white",
      position: 'relative', 
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
      marginTop: 30,
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      alignItems: 'center',
    },
    centeredContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    transactionText: {
      fontSize: 20,
      fontWeight: '600',
      color: theme === 'dark' ? 'white' : 'black',
    },
  });

  export default getStyles;