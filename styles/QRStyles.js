import { StyleSheet } from 'react-native';

const getStyles = (theme) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? 'white' : "#262626",
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
    QRcontainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      resizeMode: 'contain',
    },
    QR: {
      width: 380,
      height: 380,
    },
    QRtext: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      color: theme === 'light' ? 'black' : 'white',
    }
  });

  export default getStyles;