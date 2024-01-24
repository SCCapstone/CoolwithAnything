import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from "react-native";
import SearchIcon from "../assets/search.png";
import styles from "../styles/WorkoutStyles";

const SearchBar = ({ searchTerm, setSearchTerm, handleClick }) => {
  return (
    <View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="What are you looking for?"
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={SearchIcon}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default SearchBar;
