import { StyleSheet } from "react-native";

const getStyles = (theme) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme === 'dark' ? '#262626' : "white",
  },
  PMTextContainer: {
    position: 'relative',
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
  PMText: {
      marginTop: 30,
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      alignItems: 'center',
  },
  noPaymentText: { 
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 20,
    color: theme === 'dark' ? 'white' : 'black',
  },
  addPaymentContainer: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3e5e60',
  },
  noPaymentContainer: {
    margin: 20,
    alignItems: 'center',
  },
  addPayment: {
    color: 'white',
    fontSize: 16,
  },
  plusStyle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  paymentsContainer: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#ddd', 
    padding: 15, 
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    backgroundColor: '#5da8af',
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // Elevation for Android
    alignItems: 'center', 
    justifyContent: 'center',
    width: 300,
  },
  paymentMethod: {
    fontSize: 24,
    marginVertical: 8,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default getStyles;