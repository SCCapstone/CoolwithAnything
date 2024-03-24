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
  });

  export default getStyles;