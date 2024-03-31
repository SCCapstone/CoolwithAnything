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
import { getUserData } from "../services/AuthAPI";
import { useTheme } from '../services/ThemeContext';
import getStyles from "../styles/HomeScreenStyles";

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userID } = route.params;
  const [userData, setUserData] = useState({ name: '', birthday: '' });
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

  return (
    <ScrollView style={styles.container}>
      <DateTracker month="January" year={2021} />
      <AccountButton navigation={navigation} />
      <ProgressBar progress={40} />
      <View style={styles.categoryContainer}>
        <CategoryCounter count={3} label="Schoolxxx" color="gold" />
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

export default HomeScreen;