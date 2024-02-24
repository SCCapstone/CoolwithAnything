import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { savePaymentMethodForUser, fetchAllPaymentMethodsForUser } from "../services/AuthAPI";

const AddPaymentMethodsScreen = () => {
  const navigation = useNavigation();
  const [nickname, setNickname] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [CVC, setCVC] = useState('');
  const [expDate, setExpDate] = useState('');
  const [name, setName] = useState('');
  const [ZIP, setZIP] = useState('');
  const userId = "USER_ID"

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
          onPress={handleSavePaymentMethod} 
          style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Payment Method</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
    position: 'relative', 
  },
  header: {
    position: 'absolute', 
    top: 45, 
    left: 20, 
    zIndex: 1, 
  },
  backText: {
    fontSize: 18,
    fontWeight: '700',
  },
  contentContainer: {
    marginTop: 25,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 85,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  label: {
    marginRight: 10, // Add some margin to the right of the label for spacing
    fontWeight: 'bold',
    marginTop: 1,
    marginLeft: 20,
  },
  input: {
    height: 50,
    margin: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    textAlignVertical: 'top', // Ensures text starts from the top
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '80%', // Adjust the width as needed
  },
  saveButtonContainer: {
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10,
    width: '60%',
    height: 60,
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default AddPaymentMethodsScreen;
