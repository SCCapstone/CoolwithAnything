import React, { useState} from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { savePaymentMethodForUser, fetchAllPaymentMethodsForUser } from "../services/AuthAPI";
import { getAuth } from 'firebase/auth';
import styles from "../styles/AddPaymentMethodsStyle";

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

  const handleSavePaymentMethod = async () => {
    try {
      await savePaymentMethodForUser(userId, { nickname, creditCard, CVC, expDate, name, ZIP });
      console.log("Payment method saved successfully");
      Alert.alert(
        "Success", // Alert Title
        "Your payment method was saved successfully.", // Alert Message
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
    <View>

      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.title}>Add Payment Method</Text>
        <View style={{width: 24}}/>
      </View>

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.label}>Nickname:</Text>
              <TextInput style={styles.input} 
              onChangeText={setNickname} 
              value={nickname} 
              placeholder="My Card"
              keyboardType="default"
              secureTextEntry={false}/>
            </View> 
            
            <View>
              <Text style={styles.label}>Credit Card:</Text>
              <TextInput style={[styles.input, {width: '43%'}]}
              onChangeText={setCreditCard} 
              value={creditCard} 
              placeholder="1234 5678 9012 3456"
              keyboardType="default"
              secureTextEntry={false}/>
            </View> 

            <View>
              <Text style={styles.label}>CVC:</Text>
              <TextInput style={[styles.input, {width: '13%'}]} 
              onChangeText={setCVC} 
              value={CVC} 
              placeholder="123"
              keyboardType="default"
              secureTextEntry={false}/>
            </View> 

            <View>
              <Text style={styles.label}>EXP Date:</Text>
              <TextInput style={[styles.input, {width: '16%'}]}
              onChangeText={setExpDate} 
              value={expDate} 
              placeholder="01/23"
              keyboardType="default"
              secureTextEntry={false}/>
            </View>

            <View>
              <Text style={styles.label}>Name on card:</Text>
              <TextInput style={styles.input} 
              onChangeText={setName} 
              value={name} 
              placeholder="John Appleseed"
              keyboardType="default"
              secureTextEntry={false}/>
            </View>

            <View>
              <Text style={styles.label}>ZIP:</Text>
              <TextInput style={[styles.input, {width: '16%'}]} 
              onChangeText={setZIP} 
              value={ZIP} 
              placeholder="12345"
              keyboardType="default"
              secureTextEntry={false}/>
            </View> 

          </View>
        </View>
      </ScrollView>
      <View style={styles.saveButtonContainer}>
        <Pressable 
          onPress={handleSavePaymentMethod}
          style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Payment Method</Text>
        </Pressable>
      </View>

    </View>
  );
};

export default AddPaymentMethodsScreen;