import { StyleSheet } from 'react-native';

const getStyles = (theme) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme === 'light' ? 'white' : "#262626",
  },
  settingsTextContainer: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3e5e60',
    paddingHorizontal: 20,
  },
  settingsText: {
    marginTop: 30,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  backButton: {
    fontSize: 24, 
    fontWeight: 900, 
    marginTop: 30, 
    color: 'white',
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 7,
    color: theme === 'light' ? 'black' : 'white',
  },
  profileID: {
    marginBottom: 40,
    textAlign: 'center',
    color: '#B5B5B5',
  },
  label: {
    fontWeight: 'bold',
    color: theme === 'light' ? 'black' : 'white',
  },
  labelText: {
    color: theme === 'light' ? 'black' : 'white',
  },
  editButton: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#5da8af', 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.15)',
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
    backgroundColor: '#5da8af',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    /*
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 7 }, // Shadow offset x, y
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 2, // Shadow blur radius
    // Android Shadow
    elevation: 5,
    */
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
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
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
    backgroundColor: '#5da8af',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  modalCancelButton: {
    flex: 1,
    padding: 20,
    margin: 6,
    backgroundColor: '#c60e0b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  modalText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
  },
  tabBarContainer: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3e5e60',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    fontWeight: '900',
    flex: 1,
    justifyContent: 'center',
    height: 100,
    alignItems: 'center',
    borderColor: 'gray',
    backgroundColor: '#3e5e60',
  },
  activeTab: {
    backgroundColor: '#5da8af', 
  },
  tabText: {
    color: 'white',
    fontWeight: "800",
    fontSize: 24,
    marginBottom: 10,
  },
});

export default getStyles;
