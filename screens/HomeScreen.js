import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import ProgressBar from "../components/ProgressBar";
import CategoryCounter from "../components/CategoryCounter";
import DateTracker from "../components/DateTracker";
import Calendar from "../components/Calendar";
import BirthdayCelebration from "../components/BDCelebration";
import AccountButton from "../components/AccountButton";
import { useNavigation } from "@react-navigation/native";
import { countTasksForUser, getUserData } from "../services/AuthAPI";
import { useTheme } from "../services/ThemeContext";
import getStyles from "../styles/HomeScreenStyles";

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userID } = route.params;
  const [userData, setUserData] = useState({ name: "", birthday: "" });
  const [taskCount, setTaskCount] = useState(0);
  const { theme } = useTheme();
  const styles = getStyles(theme);

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

  return (
    <View style={styles.container}>
      <View style={styles.homeTextContainer}>
        <View style={styles.headerContainer}>
          <View style={{flex: 1}}> 
            {/* Empty View as Spacer */}
          </View>
          <View style={{flex: 2, alignItems: 'center'}}> 
            <Text style={styles.homeText}>Today</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}> 
            <AccountButton navigation={navigation} />
          </View>
        </View>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.topContainer}>
       <View style={styles.indicatorContainer}>
        <Text style={styles.monthYearText}>Your Progress:</Text>
       </View>
        <AccountButton navigation={navigation} />
      </View>
      <ProgressBar progress={taskCount}/>
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
    </View>
  );
};

export default HomeScreen;
