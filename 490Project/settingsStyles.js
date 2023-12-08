import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    textAlign: 'center',
  },
  profileID: {
    marginBottom: 40,
    textAlign: 'center',
    color: '#B5B5B5',
  },
  label: {
    fontWeight: 'bold',
  },
  editButton: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#24A0ED', 
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  pageButton: {
    flex: 1,
    padding: 20,
    margin: 6,
    backgroundColor: '#24A0ED',
    justifyContent: 'center',
    borderRadius: 5,
  },
  accountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default styles;
