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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  modalInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
  modalSaveButton : {
    flex: 1,
    padding: 20,
    margin: 6,
    backgroundColor: '#24A0ED',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  modalCancelButton: {
    flex: 1,
    padding: 20,
    margin: 6,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  modalText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
  },
});

export default styles;
