import React, { useState} from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useTheme } from '../services/ThemeContext';
import { savePaymentMethodForUser, fetchAllPaymentMethodsForUser } from "../services/AuthAPI";
import { getAuth } from 'firebase/auth';
import getStyles from "../styles/AddPaymentMethodsStyle";

const AddPaymentMethodsScreen = () => {
  const navigation = useNavigation();
  const [nickname, setNickname] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [CVC, setCVC] = useState('');
  const [expDate, setExpDate] = useState('');
  const [name, setName] = useState('');
  const [ZIP, setZIP] = useState('');
  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handleSavePaymentMethod = async () => {
    try {
      await savePaymentMethodForUser(userId, { nickname, creditCard, CVC, expDate, name, ZIP });
      console.log("Payment method saved successfully");
      Alert.alert(
        "Success", // Alert Title
        "Your payment method was saved successfully!", // Alert Message
        [
          {
            text: "OK",
            onPress: () => navigation.navigate('PaymentMethods'),
          },
        ]
      );
      
      // Fetch all payment methods for the user after adding a new one
      const updatedPaymentMethods = await fetchAllPaymentMethodsForUser(userId);
      
      // Navigate back to the PaymentMethodsScreen with the updated list
      navigation.navigate('PaymentMethods', { paymentMethods: updatedPaymentMethods });
    } catch (error) {
      console.error("Failed to save payment method", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.title}>Add Payment Method</Text>
        <View style={{width: 24}}/>
      </View>

      <ScrollView style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.label}>Nickname:</Text>
              <TextInput style={styles.input} 
              onChangeText={setNickname} 
              value={nickname} 
              placeholder="My Card"
              placeholderTextColor={'grey'}
              keyboardType="default"
              secureTextEntry={false}/>
            </View> 
            
            <View>
              <Text style={styles.label}>Credit Card:</Text>
              <TextInput style={[styles.input, {width: '13%'}]} 
              onChangeText={setCreditCard} 
              value={creditCard} 
              placeholder="123"
              placeholderTextColor={'grey'}
              keyboardType="default"
              secureTextEntry={false}/>
            </View> 

            <View>
              <Text style={styles.label}>CVC:</Text>
              <TextInput style={[styles.input, {width: '13%'}]} 
              onChangeText={setCVC} 
              value={CVC} 
              placeholder="123"
              placeholderTextColor={'grey'}
              keyboardType="default"
              secureTextEntry={false}/>
            </View> 

            <View>
              <Text style={styles.label}>EXP Date:</Text>
              <TextInput style={[styles.input, {width: '16%'}]}
              onChangeText={setExpDate} 
              value={expDate} 
              placeholder="01/23"
              placeholderTextColor={'grey'}
              keyboardType="default"
              secureTextEntry={false}/>
            </View>

            <View>
              <Text style={styles.label}>Name on card:</Text>
              <TextInput style={styles.input} 
              onChangeText={setName} 
              value={name} 
              placeholder="John Appleseed"
              placeholderTextColor={'grey'}
              keyboardType="default"
              secureTextEntry={false}/>
            </View>

            <View>
              <Text style={styles.label}>ZIP:</Text>
              <TextInput style={[styles.input, {width: '16%'}]} 
              onChangeText={setZIP} 
              value={ZIP} 
              placeholder="12345"
              placeholderTextColor={'grey'}
              keyboardType="default"
              secureTextEntry={false}/>
            </View> 

          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}> 
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity 
            onPress={handleSavePaymentMethod}
            style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Payment Method</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

export default AddPaymentMethodsScreen;