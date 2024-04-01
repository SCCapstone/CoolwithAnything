import { StyleSheet } from 'react-native';

const getStyles = (theme) => StyleSheet.create({
    container: {
        marginVertical: 10,
      },
      directionsInput: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5,
        height: 100,
        textAlignVertical: "top",
        padding: 10,
      },
});
  
export default getStyles;