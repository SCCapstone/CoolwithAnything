import React, { useState} from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
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
      
      // Fetch all payment methods for the user after adding a new one
      const updatedPaymentMethods = await fetchAllPaymentMethodsForUser(userId);
      
      // Navigate back to the PaymentMethodsScreen with the updated list
      navigation.navigate('PaymentMethods', { paymentMethods: updatedPaymentMethods });
    } catch (error) {
      console.error("Failed to save payment method", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Add Payment Method</Text>
        </View>
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
        
        <View style={styles.saveButtonContainer}>
          <Pressable 
            onPress={handleSavePaymentMethod} //This also navigates back to PaymentMethods
            style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Payment Method</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddPaymentMethodsScreen;