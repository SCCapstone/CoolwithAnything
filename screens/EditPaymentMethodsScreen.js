import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core'; // useRoute to receive parameters
import { deletePaymentMethodForUser, updatePaymentMethodForUser, fetchAllPaymentMethodsForUser } from "../services/AuthAPI"; 
import { getAuth } from 'firebase/auth';
import { useTheme } from '../services/ThemeContext';
import getStyles from "../styles/AddPaymentMethodsStyle"; 

const EditPaymentMethodsScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const auth = getAuth();
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  const [nickname, setNickname] = useState(params?.nickname || '');
  const [creditCard, setCreditCard] = useState(params?.creditCard || '');
  const [CVC, setCVC] = useState(params?.CVC || '');
  const [expMonth, setExpMonth] = useState(params?.expMonth || '');
  const [expYear, setExpYear] = useState(params?.expYear || '');
  const [name, setName] = useState(params?.name || '');
  const [ZIP, setZIP] = useState(params?.ZIP || '');

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

  const handleUpdatePaymentMethod = async () => {
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
  
    try {
      const paymentMethods = await fetchAllPaymentMethodsForUser(userId);
      const isDuplicate = paymentMethods.some(method =>
        method.creditCard === creditCard &&
        method.CVC === CVC &&
        method.nickname === nickname &&
        method.expMonth === expMonth &&
        method.expYear === expYear &&
        method.name === name &&
        method.ZIP === ZIP
      );
  
      if (isDuplicate) {
        Alert.alert("Duplicate Error", "A payment method with these details has already been added.");
        return;
      }
  
      // Assuming params?.id is the correct identifier for the payment method
      const paymentMethodId = params?.id;
      await updatePaymentMethodForUser(userId, paymentMethodId, { nickname, creditCard, CVC, expMonth, expYear, name, ZIP });
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

  const handleDeletePaymentMethod = () => {
    // Use Alert to confirm deletion
    Alert.alert(
      "Confirm Deletion", // Alert Title
      "Are you sure you want to delete this payment method?", // Alert Message
      [
        // Button: No, do not delete
        {
          text: "Cancel",
          onPress: () => console.log("Deletion cancelled"),
          style: "cancel"
        },
        // Button: Yes, proceed with deletion
        {
          text: "Yes",
          onPress: async () => {
            try {
              await deletePaymentMethodForUser(userId, params?.id);
              console.log("Payment method deleted successfully");
              
              // Notify the user of success
              Alert.alert(
                "Success",
                "Your payment method was deleted successfully!",
                [{ text: "OK", onPress: () => navigation.navigate('PaymentMethods') }]
              );
              
              // Optionally, fetch the updated list of payment methods
              const updatedPaymentMethods = await fetchAllPaymentMethodsForUser(userId);
              navigation.navigate('PaymentMethods', { paymentMethods: updatedPaymentMethods });
              
            } catch (error) {
              console.error("Failed to delete payment method", error);
              // Optionally, inform the user of the error
              Alert.alert("Error", "Failed to delete the payment method.");
            }
          }
        }
      ],
      { cancelable: true } // This allows the alert to be dismissed by tapping outside of it
    );
  };
  

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.title}>Edit Payment Method</Text>
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
              placeholder={nickname ? nickname : 'My Card'}
              placeholderTextColor={'grey'}
              keyboardType="default"
              secureTextEntry={false}/>
            </View> 
            
            <View>
              <Text style={styles.label}>Credit Card:</Text>
              <TextInput style={[styles.input, {width: '43%'}]}
              onChangeText={handleCreditCardChange} 
              value={creditCard}
              placeholder={creditCard ? creditCard : "1234567890123456"}
              placeholderTextColor={'grey'}
              keyboardType="number-pad"
              secureTextEntry={true}/>
            </View> 

            <View>
              <Text style={styles.label}>CVC:</Text>
              <TextInput style={[styles.input, {width: '13%'}]} 
              onChangeText={handleCVCChange} 
              value={CVC} 
              placeholder={CVC ? CVC : '123'}
              placeholderTextColor={'grey'}
              keyboardType="number-pad"
              secureTextEntry={true}/>
            </View> 

            <View style={{ flexDirection: 'row' }}>
              <View>
                <Text style={styles.label}>EXP Month:</Text>
                <TextInput 
                  style={[styles.input, {width: '50%'}]}
                  onChangeText={handleMonthChange}
                  value={expMonth}
                  placeholder={expMonth ? expMonth : 'MM'}
                  placeholderTextColor={'grey'}
                  keyboardType="number-pad"
                  maxLength={2}
                />
              </View>
              <View>
                <Text style={styles.label}>EXP Year:</Text>
                <TextInput 
                  style={[styles.input, {width: '75%'}]}
                  onChangeText={handleYearChange}
                  value={expYear}
                  placeholder={expYear ? expYear : 'YYYY'}
                  placeholderTextColor={'grey'}
                  keyboardType="number-pad"
                  maxLength={4}
                />
              </View>
            </View>

            <View>
              <Text style={styles.label}>Name on card:</Text>
              <TextInput style={styles.input} 
              onChangeText={setName} 
              value={name} 
              placeholder={name ? name : 'John Appleseed'}
              placeholderTextColor={'grey'}
              keyboardType="default"
              secureTextEntry={false}/>
            </View>

            <View>
              <Text style={styles.label}>ZIP:</Text>
              <TextInput style={[styles.input, {width: '17%'}]} 
              onChangeText={handleZipChange} 
              value={ZIP} 
              placeholder={ZIP ? ZIP : '12345'}
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
                onPress={handleUpdatePaymentMethod} // Update this to handleUpdatePaymentMethod
                style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Update Payment Method</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.deleteButtonContainer}>
              <TouchableOpacity 
                onPress={handleDeletePaymentMethod}
                style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete Payment Method</Text>
              </TouchableOpacity>
            </View>
          </View>
    </View>
  );
};

export default EditPaymentMethodsScreen;