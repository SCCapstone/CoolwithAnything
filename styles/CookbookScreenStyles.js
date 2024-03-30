import { StyleSheet } from 'react-native';

const getStyles = (theme) => StyleSheet.create({
    container: {
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
      cookbookContainer: {
        flexDirection: 'row',
        height: 80,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#3e5e60',
        paddingHorizontal: 20,
      },
      cookbookText: {
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
  });

  export default getStyles;