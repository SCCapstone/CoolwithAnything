import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "../styles/SearchBarStyle.js";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const [input, setInput] = useState("");
  const [apiData, setApiData] = useState([]);

  const handleSearch = () => {
    let options = {
      method: "GET",
      headers: { "X-Api-Key": "272B6ZvC3H2fVwwWGIngig==qQ1K3uNZQm2Pgn0o" },
    };

    let url = "https://api.api-ninjas.com/v1/recipe?query=" + input;

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setApiData(data);
      })
      .catch((err) => {
        console.log(`error ${err}`);
      });
  };

  useEffect(() => {
    // You can perform additional logic if needed when the 'apiData' state changes
    console.log("API data updated:", apiData);
  }, [apiData]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={(apiData) => setInput(apiData)}
          placeholder="What are you looking for?"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Image
          source={require("../assets/search.png")}
          resizeMode="contain"
          style={styles.buttonImage}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;