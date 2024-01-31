import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';


const SearchBar = () => {
  return (
      <div style={styles.container}>SearchBar</div>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 200,
  },
});

export default SearchBar;