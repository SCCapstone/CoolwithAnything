// components/ExerciseItem.js
import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const ExerciseItem = ({ onSetsChange, onRepsChange, onDelete }) => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Exercise" />
      <TextInput
        style={styles.inputSmall}
        keyboardType="numeric"
        placeholder="Sets"
        onChangeText={onSetsChange}
      />
      <TextInput
        style={styles.inputSmall}
        keyboardType="numeric"
        placeholder="Reps"
        onChangeText={onRepsChange}
      />
      <Button title="Delete" onPress={onDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  inputSmall: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});

export default ExerciseItem;
