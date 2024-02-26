import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/core'; 
import { fetchAllPaymentMethodsForUser } from "../services/AuthAPI";
import { getAuth } from 'firebase/auth';
import styles from "../styles/PaymentMethodsStyle";

const PaymentMethodsScreen = () => {
  const navigation = useNavigation();
  const [paymentMethods, setPaymentMethods] = useState([]); // Initialize paymentMethods state
  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const fetchPaymentMethods = async () => {
        const methods = await fetchAllPaymentMethodsForUser(userId);
        setPaymentMethods(methods);
      };

      fetchPaymentMethods();
    }
  }, [isFocused, userId]);

  const renderPaymentMethod = ({ item }) => (
    <Pressable onPress={() => navigation.navigate('EditPaymentMethods', {
      id: item.id,
      nickname: item.nickname,
      creditCard: item.creditCard,
      CVC: item.CVC,
      expDate: item.expDate,
      name: item.name,
      ZIP: item.ZIP
    })}>
      <View style={styles.paymentsContainer}>
        <Text style={styles.paymentMethod}>{item.nickname}</Text>
      </View>
    </Pressable>
  );
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        {paymentMethods.length > 0 ? (
          <FlatList
          data={paymentMethods}
          renderItem={renderPaymentMethod}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ alignItems: 'center' }}
          ListFooterComponent={
            <Pressable onPress={() => navigation.navigate('AddPaymentMethods')} style={{ marginVertical: 20 }}>
              <Text style={styles.addPayment}>
                Add a payment method<Text style={styles.plusStyle}> +</Text>
              </Text>
            </Pressable>
          }
        />
        ) : (
          <View>
            <Text style={styles.text}>You have no saved payment methods</Text>
            <Pressable onPress={() => navigation.navigate('AddPaymentMethods')}>
          <Text style={styles.addPayment}>
            Add a payment method
            <Text style={styles.plusStyle}> +</Text>
          </Text>
        </Pressable>
          </View>
        )}
      </View>

    </View>
  );
};

export default PaymentMethodsScreen;
