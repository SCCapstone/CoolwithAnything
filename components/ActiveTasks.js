import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  format,
  startOfMonth,
  endOfMonth,
  parseISO,
  isSameMonth,
} from "date-fns";
import styles from "../styles/ActiveTasksStyle";
import { fetchTasksForUser } from "../services/AuthAPI";
import eventEmitter from "../components/EventEmitter";
import { useCurrentMonth } from "./CurrentMonthContext";

const ActiveTasks = ({ userID }) => {
  const navigation = useNavigation();
  const { currentMonth } = useCurrentMonth();
  const [categories, setCategories] = useState([
    { label: "School", color: "#FFA07A" },
    { label: "Work", color: "#20B2AA" },
    { label: "Personal", color: "#778899" },
    { label: "Gym", color: "#FFD700" },
  ]);
  const [currentMonthOnly, setCurrentMonthOnly] = useState(false);

  useEffect(() => {
    const fetchAndCountTasks = async () => {
      const startDate = startOfMonth(currentMonth);
      const endDate = endOfMonth(currentMonth);
      // Log to see if and when this function runs
      console.log("Fetching tasks for month:", format(currentMonth, "yyyy-MM"));
      console.log("Current month only:", currentMonthOnly);

      // Fetch tasks for the whole month irrespective of the switch
      const tasks = await fetchTasksForUser(
        userID,
        startDate.toISOString(),
        endDate.toISOString()
      );
      const filteredTasks = currentMonthOnly
        ? tasks.filter((task) => isSameMonth(parseISO(task.date), currentMonth))
        : tasks;

      const updatedCategories = categories.map((category) => {
        const categoryTasks = filteredTasks.filter(
          (task) => task.type === category.label
        );
        return { ...category, count: categoryTasks.length };
      });
      setCategories(updatedCategories);
    };

    fetchAndCountTasks();
    // Listen to task updates, month changes, or toggle of currentMonthOnly
    const unsubscribeTaskUpdated = eventEmitter.subscribe(
      "taskUpdated",
      fetchAndCountTasks
    );
    const unsubscribeMonthChange = eventEmitter.subscribe(
      "monthChanged",
      fetchAndCountTasks
    );
    const unsubscribeTaskDeleted = eventEmitter.subscribe(
      "taskDeleted",
      fetchAndCountTasks
    );
    const unsubscribeTaskAdded = eventEmitter.subscribe(
      "taskAdded",
      fetchAndCountTasks
    );

    return () => {
      unsubscribeTaskUpdated();
      unsubscribeMonthChange();
      unsubscribeTaskDeleted();
      unsubscribeTaskAdded();
    };
  }, [userID, currentMonth, currentMonthOnly]); // Include currentMonthOnly in dependencies to trigger re-fetch

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text>
          Showing: {currentMonthOnly ? "This Month's Tasks" : "All Time Tasks"}
        </Text>
        <Switch value={currentMonthOnly} onValueChange={setCurrentMonthOnly} />
      </View>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.circle, { backgroundColor: category.color }]}
          onPress={() =>
            navigation.navigate("CategoryTasksView", {
              category: category.label,
              userID,
            })
          }
        >
          <Text style={styles.countText}>{category.count}</Text>
          <Text style={styles.labelText}>{category.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ActiveTasks;
