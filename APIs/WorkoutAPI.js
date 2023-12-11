import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

const WorkoutApi = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    let options = {
      method: 'GET',
      headers: { 'X-Api-Key': '272B6ZvC3H2fVwwWGIngig==qQ1K3uNZQm2Pgn0o' }
    };

    let url = 'https://api.api-ninjas.com/v1/exercises?muscle=biceps';

    fetch(url, options)
      .then((res) => res.json()) // parse response as JSON
      .then((data) => {
        console.log(data);
        setApiData(data); // update state with fetched data
      })
      .catch((err) => {
        console.log(`error ${err}`);
      });
  }, []);

  return (
    <View>
      <Text>API Screen</Text>
      <FlatList
  data={apiData}
  keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
  renderItem={({ item }) => (
    <View>
      <Text>{item.name}</Text>
    </View>
  )}
/>

    </View>
  );
};

export default WorkoutApi;
