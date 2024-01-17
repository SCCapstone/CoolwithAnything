// components/CommentBox.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const CommentBox = ({ onCommentChange }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.commentInput}
        multiline
        placeholder="Comments"
        onChangeText={onCommentChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    height: 100,
    textAlignVertical: 'top',
    padding: 10,
  },
});

export default CommentBox;
