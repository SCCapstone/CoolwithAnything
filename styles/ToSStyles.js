import { StyleSheet } from 'react-native';

const getStyles = (theme) => StyleSheet.create({
  screen: {
    flex: 1,
  },
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
    fontWeight: "700",
    color: 'white',
  },
  title: {
    marginTop: 30,
    color: 'white',
    fontSize: 24,
    fontWeight: "bold",
    alignItems: 'center',
  },
  contentTitleContainer: {
    marginTop: 85,
    alignItems: 'center',
  },
  contentTitleText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: -20,
  },
  content: {
    padding: 20,
  },
  contentHeader: {
    fontWeight: "800",
    color: theme === 'dark' ? 'white' : 'black',
    marginTop: 20,
  },
  contentText: {
    marginTop: 10,
    marginBottom: 20,
  },
  contentParagraph: {
    marginBottom: 3,
    marginTop: 3,
    color: theme === 'dark' ? 'white' : 'black',
  }
});

export default getStyles;