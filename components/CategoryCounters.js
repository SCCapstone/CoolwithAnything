import React from 'react';
import { View } from 'react-native';
import CategoryCounter from './CategoryCounter';

const categories = [
    { label: 'School', color: '#FFA07A', count: 10 },
    { label: 'Work', color: '#20B2AA', count: 5 },
    { label: 'Personal', color: '#778899', count: 8 },
    { label: 'Gym', color: '#FFD700', count: 4 },
];

const CategoryCounters = ({ navigation }) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {categories.map((category, index) => (
          <CategoryCounter
            key={index}
            count={category.count}
            label={category.label}
            color={category.color}
            onPress={() => navigation.navigate('CategoryTasksView', { category: category.label })}
          />
        ))}
      </View>
    );
  };

export default CategoryCounters;