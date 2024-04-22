import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { fetchTasksForUser } from '../services/AuthAPI';
import { format } from 'date-fns';
import eventEmitter from '../components/EventEmitter';
import { useTheme } from '../services/ThemeContext';
import getStyles from '../styles/CategoryTasksViewStyle';

const CategoryTasksView = ({ route, navigation }) => {
    const { category, userID } = route.params;
    const [tasks, setTasks] = useState([]);
    const { theme } = useTheme();
    const styles = getStyles(theme);

    useEffect(() => {
        const fetchCategoryTasks = async () => {
            const allTasks = await fetchTasksForUser(userID);
            const filteredTasks = allTasks.filter(task => task.type === category);
            setTasks(filteredTasks);
        };

        fetchCategoryTasks();

        // Subscribe to taskUpdated event to refresh list
        const unsubscribe = eventEmitter.subscribe('taskUpdated', fetchCategoryTasks);

        return () => unsubscribe();
    }, [category, userID]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{`${category} Active Tasks`}</Text>
            <FlatList
                data={tasks}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.taskItem}
                        onPress={() => navigation.navigate('EditTaskScreen', { task: item, userId: userID })}
                    >
                        <Text style={styles.taskName}>{item.name}</Text>
                        <Text style={styles.taskDetail}>Date: {format(new Date(item.date), 'PPP')}</Text>
                        <Text style={styles.taskDetail}>Priority: {item.priority}</Text>
                        <Text style={styles.taskDetail}>Status: {item.completed ? 'Completed' : 'Pending'}</Text>
                        <Text style={styles.taskDetail}>Location: {item.location}</Text>
                        <Text style={styles.taskDetail}>Comments: {item.comment}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default CategoryTasksView;