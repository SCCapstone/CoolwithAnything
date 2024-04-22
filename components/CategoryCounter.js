import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/CategoryCounterStyle'; // Make sure this path is correct

const CategoryCounter = ({ count, label, color, onPress }) => {
    return (
        <TouchableOpacity style={styles.circleContainer} onPress={onPress}>
            <View style={[styles.counter, { backgroundColor: color }]}>
                <Text style={styles.countText}>{count}</Text>
            </View>
            <Text style={styles.categoryLabel}>{label}</Text>
        </TouchableOpacity>
    );
};

export default CategoryCounter;