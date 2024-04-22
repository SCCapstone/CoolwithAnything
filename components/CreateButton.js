import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CreateButton = ({ onPress, label, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.buttonDisabled : null]}
      onPress={onPress}
      disabled={disabled} // Disable the button functionality if disabled is true
    >
      <Text style={[styles.buttonText, disabled ? styles.textDisabled : null]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5da8af', // Normal state background color
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc', // Greyed out background color for disabled state
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  textDisabled: {
    color: '#7d7d7d' // Optional: change text color for disabled state if needed
  }
});

export default CreateButton;