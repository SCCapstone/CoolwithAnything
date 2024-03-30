import { StyleSheet } from 'react-native';

const getStyles = (theme) => StyleSheet.create({
      screen: {
        flex: 1,
        backgroundColor: theme === 'dark' ? '#262626' : "white",
      },
      tabBar: {
        flexDirection: "row",
        paddingTop: 10,
      },
      tabItem: {
        flex: 1,
        alignItems: "center",
        padding: 16,
      },
      activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: "#5da8af",
      },
      tabText: {
        fontSize: 16,
        color: theme === 'dark' ? 'white' : 'black',
      },
      cookbookTextContainer: {
        height: 80,
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#3e5e60',
      },
      cookbookText: {
        marginTop: 36,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
      },
  });

  export default getStyles;