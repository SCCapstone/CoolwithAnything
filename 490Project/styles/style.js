import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../theme.js";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.small,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.gray2,
    marginRight: SIZES.small,
    marginLeft: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  tabsContainer: {
    marginTop: 0,
    height: 50,
  },
  tabsWrapper: {
    flex: 1,
    marginRight: SIZES.small,
    marginLeft: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.blue,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SIZES.small,
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  contentContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
  tab: (currentMealType, item) => ({
    height: 100,
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: currentMealType === item ? COLORS.secondary : COLORS.gray2,
  }),
  tabText: (currentMealType, item) => ({
    fontFamily: FONT.medium,
    color: currentMealType === item ? COLORS.secondary : COLORS.gray2,
  }),
});

export default styles;