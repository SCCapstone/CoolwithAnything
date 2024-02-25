import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core'; // useRoute to receive parameters
import { deletePaymentMethodForUser, updatePaymentMethodForUser, fetchAllPaymentMethodsForUser } from "../services/AuthAPI"; 
import { getAuth } from 'firebase/auth';
import styles from "../styles/AddPaymentMethodsStyle"; 

const EditPaymentMethodsScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  const [nickname, setNickname] = useState(params?.nickname || '');
  const [creditCard, setCreditCard] = useState(params?.creditCard || '');
  const [CVC, setCVC] = useState(params?.CVC || '');
  const [expDate, setExpDate] = useState(params?.expDate || '');
  const [name, setName] = useState(params?.name || '');
  const [ZIP, setZIP] = useState(params?.ZIP || '');

  const handleUpdatePaymentMethod = async () => {
    try {
      // Ensure params?.id is correctly passed when navigating to this screen
      await updatePaymentMethodForUser(userId, params?.id, {
        nickname, creditCard, CVC, expDate, name, ZIP
      });
      console.log("Payment method updated successfully");
      //Fetch existing payment methods and go back to payments list
      const updatedPaymentMethods = await fetchAllPaymentMethodsForUser(userId);
      navigation.navigate('PaymentMethods', { paymentMethods: updatedPaymentMethods });
    } catch (error) {
      console.error("Failed to update payment method", error);
    }
  };

  const handleDeletePaymentMethod = async () => {
    try {
      await deletePaymentMethodForUser(userId, params?.id);
      console.log("Payment method deleted successfully");
      // Optionally, fetch the updated list of payment methods
      const updatedPaymentMethods = await fetchAllPaymentMethodsForUser(userId);
      navigation.navigate('PaymentMethods', { paymentMethods: updatedPaymentMethods });
    } catch (error) {
      console.error("Failed to delete payment method", error);
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
          <Text style={styles.title}>Edit Payment Method</Text>
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
            <TextInput style={[styles.input, {width: '17%'}]} 
            onChangeText={setZIP} 
            value={ZIP} 
            placeholder="12345"
            keyboardType="default"
            secureTextEntry={false}/>
          </View> 

        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.saveButtonContainer}>
            <Pressable 
              onPress={handleUpdatePaymentMethod} // Update this to handleUpdatePaymentMethod
              style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Update Payment Method</Text>
            </Pressable>
          </View>

          <View style={styles.deleteButtonContainer}>
            <Pressable 
              onPress={handleDeletePaymentMethod}
              style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete Payment Method</Text>
            </Pressable>
          </View>
        </View>

      </View>
    </ScrollView>
  );
};

export default EditPaymentMethodsScreen;