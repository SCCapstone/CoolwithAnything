import React, { useState, useEffect } from "react";
import MealCards from "../components/MealCards";

const CookbookAPI = ({ query, route }) => {
  const [apiData, setApiData] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [modalVisible, setModalVisible] = useState("");

  useEffect(() => {
    let options = {
      method: "GET",
      headers: { "X-Api-Key": "272B6ZvC3H2fVwwWGIngig==qQ1K3uNZQm2Pgn0o" },
    };

    let url = "https://api.api-ninjas.com/v1/recipe?query=" + query;

    fetch(url, options)
      .then((res) => res.json()) // parse response as JSON
      .then((data) => {
        console.log(data);
        setApiData(data); // update state with fetched data
      })
      .catch((err) => {
        console.log(`error ${err}`);
      });
  }, [query]);

  const handleCardPress = (recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  return (
    <MealCards
    apiData={apiData}
    handleCardPress={handleCardPress}
    selectedRecipe={selectedRecipe}
    closeModal={() => setSelectedRecipe("")}
    route={route}
    />
  )
};

export default CookbookAPI;