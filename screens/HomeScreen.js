import React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ProgressBar from "../components/ProgressBar";
import CategoryCounter from "../components/CategoryCounter";
import DateTracker from "../components/DateTracker";
import Calendar from "../components/Calendar";
import BirthdayCelebration from "../components/BDCelebration";
import AccountButton from "../components/AccountButton";
import { useNavigation } from "@react-navigation/native";
import { countTasksForUser, getUserData, countTasksByAttributeForUser } from "../services/AuthAPI";

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userID } = route.params;
  const [userData, setUserData] = useState({ name: '', birthday: '', });
  const [taskCount, setTaskCount] = useState(0);
  const [taskTypeCount, setTaskTypeCount] = useState({});

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

  return (
    <ScrollView style={styles.container}>
      <DateTracker month="January" year={2021} />
      <AccountButton navigation={navigation} />
      <ProgressBar progress={taskCount} />
      <View style={styles.categoryContainer}>
        <CategoryCounter count={3} label="School" color="gold" />
        <CategoryCounter count={2} label="Personal" color="skyblue" />
        <CategoryCounter count={1} label="Gym" color="salmon" />
      </View>
      <Calendar userID={userID} navigation={navigation} birthday={userData.birthday}/>
      <BirthdayCelebration
        userName={userData.name}
        birthday={userData.birthday}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default HomeScreen;