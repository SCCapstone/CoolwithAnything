// TaskDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { fetchTasksForCategoryAndMonth } from '../services/AuthAPI'; // Assume this is a function you've created

const TaskDetailScreen = ({ route, navigation }) => {
  const { category, month } = route.params;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await fetchTasksForCategoryAndMonth(category, month);
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, [category, month]);

  return (
    <View>
      <Text>{category} Tasks for {month}</Text>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

export default TaskDetailScreen;