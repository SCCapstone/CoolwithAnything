import React from "react";
import { func, string } from "prop-types";
import { TouchableOpacity, View, StyleSheet } from "react-native";

const Toggle = ({ theme, toggleTheme }) => {
  return (
    <TouchableOpacity onPress={toggleTheme}>
      <View style={styles.button}>
        {theme === "light" ? (
          <Sun width="24" height="24" />
        ) : (
          <Moon width="24" height="24" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const Sun = ({ width, height }) => (
  <View style={[styles.icon, { backgroundColor: "#F6C358" }]}>
    {/* SVG path for Sun */}
  </View>
);

const Moon = ({ width, height }) => (
  <View style={[styles.icon, { backgroundColor: "#F6C358" }]}>
    {/* SVG path for Moon */}
  </View>
);

Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};

const styles = StyleSheet.create({
  button: {
    border: 2,
    borderColor: "transparent",
    borderRadius: 30,
    padding: 8,
    alignItems: "center",
  },
  icon: {
    height: 24,
    width: 24,
    borderRadius: 12,
  },
});

export default Toggle;