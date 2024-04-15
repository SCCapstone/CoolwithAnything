import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { format, parseISO, startOfDay, endOfDay } from "date-fns";
import { deleteTask, fetchTasksForUser } from "../services/AuthAPI";
import eventEmitter from "./EventEmitter";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from '../services/ThemeContext';
import getStyles from "../styles/DailyViewStyles";

const DailyView = ({ userID, selectedDate, navigation, isBirthday }) => {
  const [tasks, setTasks] = useState([]);
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [displayOptions, setDisplayOptions] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const allTasks = await fetchTasksForUser(userID);
        const filteredTasks = allTasks.filter((task) => {
          const taskDate = parseISO(task.date); // Convert the date string to a Date object
          return (
            taskDate >= startOfDay(selectedDate) &&
            taskDate <= endOfDay(selectedDate)
          );
        });
        setTasks(filteredTasks);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
        Alert.alert("Error", "Failed to fetch tasks.");
      }
    };

    fetchTasks();

    // Subscribe to taskUpdated event
    const unsubscribe = eventEmitter.subscribe("taskUpdated", fetchTasks);

    // Return an unsubscribe function to clean up
    return () => {
      unsubscribe();
    };
  }, [selectedDate, userID]);

  const onTaskSelect = (task) => {
    // Navigate to the task edit screen with the selected task details
    navigation.navigate("EditTaskScreen", { task, userId: userID });
  };

  const onTaskDelete = async (taskId) => {
    try {
      await deleteTask(userID, taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      Alert.alert("Success", "Task deleted successfully.");
      eventEmitter.emit("taskUpdated");
    } catch (error) {
      console.error("Error deleting task: ", error);
      Alert.alert("Error", "Failed to delete task.");
    }
  };
  const toggleDisplayOptions = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, showOptions: !task.showOptions } : task
      )
    );
  };
  const toggleCheckmark = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Daily Tasks for {format(selectedDate, "PPP")}
      </Text>
      {isBirthday && (
        <Text style={{ fontSize: 30, alignSelf: "center" }}>
          🎉 Happy Birthday! 🎉
        </Text>
      )}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => onTaskSelect(item)}>
              <Text style={styles.taskItemText}>{item.name}</Text>
            </TouchableOpacity>
            {/* {item.showOptions && (
              <> */}
                {/* <TouchableOpacity
                  onPress={() => toggleCheckmark(item.id)}
                  style={[styles.checkmarkButton, { marginLeft: "58%" }]}
                >
                  {item.isChecked ? (
                    <Fontisto
                      name="checkbox-active"
                      size={30}
                      color="#57BCBE"
                    />
                  ) : (
                    <Fontisto
                      name="checkbox-passive"
                      size={30}
                      color="#57BCBE"
                    />
                  )}
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => onTaskDelete(item.id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              {/* </>
            )} */}
            {/* <TouchableOpacity onPress={() => toggleDisplayOptions(item.id)} style={{}}>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={30}
                color="#57BCBE"
              /> 
            </TouchableOpacity>*/}
          </View>
        )}
      />
    </View>
  );
};

export default DailyView;
