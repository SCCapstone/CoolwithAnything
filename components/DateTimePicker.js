// components/DateTimePicker.js
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DateTimePicker = ({ onConfirm, onCancel }) => {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const showDatePicker = () => {
    setPickerVisible(true);
  };

  const hideDatePicker = () => {
    setPickerVisible(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    onConfirm(date);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer} title="Show Date Picker" onPress={showDatePicker}>
        <Text style={styles.buttonText}>Show Date Picker</Text>
      </TouchableOpacity>
      <DateTimePickerModal
      style={styles.container}
        isVisible={isPickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    backgroundColor: '#5da8af',
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: '90%',
    height: 40,
  },
  buttonText: {
    marginTop: 2,
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  }
});

export default DateTimePicker;
