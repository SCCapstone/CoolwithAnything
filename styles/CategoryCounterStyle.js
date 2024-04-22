import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  circleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  counter: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  countText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryLabel: {
    fontSize: 14,
  },
});
