import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useTheme } from '../services/ThemeContext';
import { savePaymentMethodForUser, fetchAllPaymentMethodsForUser } from "../services/AuthAPI";
import { getAuth } from 'firebase/auth';
import getStyles from "../styles/AddPaymentMethodsStyle";
import { numberOfLines } from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';

const AddPaymentMethodsScreen = () => {
  const navigation = useNavigation();
  const [nickname, setNickname] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [CVC, setCVC] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [name, setName] = useState('');
  const [ZIP, setZIP] = useState('');
  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const { theme } = useTheme();
  const styles = getStyles(theme);

  // Functions to accept only valid inputs
  const handleCreditCardChange = (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
    if (numericInput.length <= 16) {
      setCreditCard(numericInput);
    }
  };

  const handleCVCChange = (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
    if (numericInput.length <= 3) {
      setCVC(numericInput);
    }
  };

  const handleMonthChange = (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
    if (numericInput.length <= 2) {
      setExpMonth(numericInput);
    }
  };

  const handleYearChange = (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
    if (numericInput.length <= 4) {
      setExpYear(numericInput);
    }
  };

  const handleZipChange = (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
    if (numericInput.length <= 5) {
      setZIP(numericInput);
    }
  };

  const handleSavePaymentMethod = async () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const monthNum = parseInt(expMonth, 10);
    const yearNum = parseInt(expYear, 10);
  
    if (!nickname || nickname.trim() === '') {
      Alert.alert("Nickname is empty");
      return;
    }
    if (creditCard.length !== 16) {
      Alert.alert("Invalid credit card");
      return;
    }
    if (CVC.length !== 3) {
      Alert.alert("Invalid CVC number");
      return;
    }
    if (yearNum < currentYear || yearNum > 2099 || (yearNum === currentYear && monthNum < currentMonth)) {
      Alert.alert("Invalid Expiration Date");
      return;
    }
    if (!name || name.trim() === '') {
      Alert.alert("Name on card is empty");
      return;
    }
    if (ZIP.length !== 5) {
      Alert.alert("Invalid ZIP code");
      return;
    }
  
    // Fetch existing payment methods and check for duplicates
    try {
      const paymentMethods = await fetchAllPaymentMethodsForUser(userId);
      const isDuplicate = paymentMethods.some(method => 
        method.creditCard === creditCard &&
        method.CVC === CVC &&
        method.expMonth === expMonth &&
        method.expYear === expYear &&
        method.name === name &&
        method.ZIP === ZIP
      );
  
      if (isDuplicate) {
        Alert.alert("Duplicate Error", "A payment method with these details has already been added.");
        return;
      }
  
      await savePaymentMethodForUser(userId, { nickname, creditCard, CVC, expMonth, expYear, name, ZIP });
      Alert.alert(
        "Success", 
        "Your payment method was saved successfully!", 
        [{ text: "OK", onPress: () => navigation.navigate('PaymentMethods') }]
      );
  
      const updatedPaymentMethods = await fetchAllPaymentMethodsForUser(userId);
      navigation.navigate('PaymentMethods', { paymentMethods: updatedPaymentMethods });
    } catch (error) {
      console.error("Failed to save payment method", error);
      Alert.alert("Error", "Failed to save payment method.");
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
              testID='input-nickname'
              onChangeText={setNickname} 
              value={nickname} 
              placeholder="My Card"
              placeholderTextColor={'grey'}
              keyboardType="default"
              secureTextEntry={false}/>
            </View> 
            
            <View>
              <Text style={styles.label} testID='safe-area'>Credit Card:</Text>
              <TextInput style={[styles.input, {width: '43%'}]} 
              testID='input-credit-card'
              onChangeText={handleCreditCardChange} 
              value={creditCard} 
              placeholder="1234567890123456"
              placeholderTextColor={'grey'}
              keyboardType="number-pad"
              secureTextEntry={false}/>
            </View> 

            <View>
              <Text style={styles.label}>CVC:</Text>
              <TextInput style={[styles.input, {width: '13%'}]} 
              testID='input-cvc'
              onChangeText={handleCVCChange} 
              value={CVC} 
              placeholder="123"
              placeholderTextColor={'grey'}
              keyboardType="number-pad"
              secureTextEntry={false}/>
            </View> 

            <View style={{ flexDirection: 'row' }}>
              <View>
                <Text style={styles.label}>EXP Month:</Text>
                <TextInput 
                  testID='input-exp-month'
                  style={[styles.input, {width: '50%'}]}
                  onChangeText={handleMonthChange}
                  value={expMonth}
                  placeholder="MM"
                  placeholderTextColor={'grey'}
                  keyboardType="number-pad"
                  maxLength={2}
                />
              </View>
              <View>
                <Text style={styles.label}>EXP Year:</Text>
                <TextInput 
                  style={[styles.input, {width: '75%'}]}
                  testID='input-exp-year'
                  onChangeText={handleYearChange}
                  value={expYear}
                  placeholder="YYYY"
                  placeholderTextColor={'grey'}
                  keyboardType="number-pad"
                  maxLength={4}
                />
              </View>
            </View>

            <View>
              <Text style={styles.label}>Name on card:</Text>
              <TextInput style={styles.input} 
              testID='input-name'
              onChangeText={setName} 
              value={name} 
              placeholder="John Appleseed"
              placeholderTextColor={'grey'}
              keyboardType="default"
              secureTextEntry={false}/>
            </View>

            <View>
              <Text style={styles.label}>ZIP:</Text>
              <TextInput style={[styles.input, {width: '17%'}]} 
              testID='input-zip'
              onChangeText={handleZipChange} 
              value={ZIP} 
              placeholder="12345"
              placeholderTextColor={'grey'}
              keyboardType="number-pad"
              secureTextEntry={false}/>
            </View> 

          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}> 
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity 
            onPress={handleSavePaymentMethod}
            style={styles.saveButton}
            testID='button-save-payment-method'>
            <Text style={styles.saveButtonText}>Save Payment Method</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

export default AddPaymentMethodsScreen;