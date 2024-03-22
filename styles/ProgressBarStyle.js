import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    progressBackground: {
      height: 20,
      backgroundColor: 'lightgray',
      borderRadius: 10,
    },
    progressBar: {
      height: '100%',
      backgroundColor: 'pink',
      borderRadius: 10,
    },
    progressText: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: [{ translateX: -25 }, { translateY: -0 }],
      color: 'black',
      fontWeight: 'heavy', 
    },
  });

export default styles;