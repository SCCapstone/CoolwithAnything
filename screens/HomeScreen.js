import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Pressable, BackHandler, ScrollView } from "react-native";
import ProgressBar from "../components/ProgressBar";
import CategoryCounter from "../components/CategoryCounter";
import DateTracker from "../components/DateTracker";
import Calendar from "../components/Calendar";
import BirthdayCelebration from "../components/BDCelebration";
import AccountButton from "../components/AccountButton";
import { useNavigation } from "@react-navigation/native";
import { countTasksForUser, getUserData, countTasksByAttributeForUser, fetchTasksForUser } from "../services/AuthAPI";
import { useTheme } from '../services/ThemeContext';
import getStyles from "../styles/HomeScreenStyles";
import eventEmitter from '../components/EventEmitter';

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userID } = route.params;
  const [userData, setUserData] = useState({ name: "", birthday: "" });
  const [taskCount, setTaskCount] = useState(0);
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [taskTypeCount, setTaskTypeCount] = useState({});
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);


  // Function to fetch tasks and calculate progress
  const fetchAndCalculateTasks = async () => {
    const tasks = await fetchTasksForUser(userID);
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    setTotalTasks(total);
    setCompletedTasks(completed);
  };

  useEffect(() => {
    // Call fetchAndCalculateTasks initially
    fetchAndCalculateTasks();
  
    // Set up a listener for the taskUpdated event
    const unsubscribe = eventEmitter.subscribe('taskUpdated', fetchAndCalculateTasks);
  
    // Clean up the listener when the component unmounts or when userID changes
    return () => unsubscribe();
  }, [userID]);

  useEffect(() => {
    const fetchAndCountTasksByAttribute = async () => {
      try {
        // For example, to count by type
        const countsByType = await countTasksByAttributeForUser(userID, 'type');
        setTaskTypeCount(countsByType);
        console.log(countsByType);
      } catch (error) {
        console.error("Error fetching and counting tasks by attribute: ", error);
      }
    };
  
    if (userID) {
      fetchAndCountTasksByAttribute();
    }
  }, [userID]);

  useEffect(() => {
    const userID = route.params.userID; // Assuming userID is passed correctly
    const fetchAndCalculateTasks = async () => {
      const tasks = await fetchTasksForUser(userID);
      setTotalTasks(tasks.length);
      const completedCount = tasks.filter(task => task.completed).length;
      setCompletedTasks(completedCount);
    };

    fetchAndCalculateTasks();
    eventEmitter.emit('taskUpdated');
  }, [route.params.userID]); // Re-run when userID changes
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const count = await countTasksForUser(userID);
        setTaskCount(count);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
  
    if (userID) {
      fetchData();
    }
  }, [userID]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserData(userID);
        if (user) {
          setUserData({
            name: user.name,
            birthday: user.date_of_birth,
          });
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    if (userID) {
      fetchData();
    }
  }, [userID]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const count = await countTasksForUser(userID);
        setTaskCount(count);
        console.log("Task count: ", count);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    if (userID) {
      fetchData();
    }
  }, [userID]);
  console.log("Birthday (HS): ", userData.birthday);
  
    // Handle the hardware back button on Android devices
    useEffect(() => {
      const backAction = () => {
        return true;
      };
  
      // Add the back press event listener
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      // Remove the event listener when the component is unmounted or no longer focused
      return () => backHandler.remove();
    }, []);
  return (
    <View style={{flex: 1}}>
      <View style={styles.homeTextContainer}>
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }}>{/* Empty View as Spacer */}</View>
        <View style={{ flex: 2, alignItems: "center" }}>
          <Text style={styles.homeText}>Today</Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <AccountButton navigation={navigation} />
        </View>
      </View>
      <View style={{ width: 24 }} />
    </View>
      <ScrollView style={styles.container}>
    <View style={styles.topContainer}>
      <View style={styles.indicatorContainer}>
        <Text style={styles.title}>Your Progress</Text>
      </View>
    </View>
    <View style={styles.container}>
      <ProgressBar completedTasks={completedTasks} totalTasks={totalTasks} />
      {/* Render other components */}
    </View>
    <Text style={styles.title}>Active Tasks</Text>
    <View style={styles.categoryContainer}>
      <CategoryCounter count={3} label="School" color="#57BCBE" />
      <CategoryCounter count={2} label="Personal" color="#4BA4A6" />
      <CategoryCounter count={1} label="Work" color="#408D8E" />
      <CategoryCounter count={1} label="Gym" color="#347576" />
    </View>
    <Calendar
      userID={userID}
      navigation={navigation}
      birthday={userData.birthday}
    />
    <BirthdayCelebration
      userName={userData.name}
      birthday={userData.birthday}
    />
  </ScrollView>
    </View>
  );
};

export default HomeScreen;
