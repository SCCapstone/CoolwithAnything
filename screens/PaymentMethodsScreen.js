import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

const PaymentMethodsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const paymentMethods = route.params?.paymentMethods || []; // Array of payment methods

  const renderPaymentMethod = ({ item }) => (
    <Text style={styles.paymentMethod}>Nickname: {item.nickname}</Text>
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
            keyExtractor={item => item.id} // Each payment method has a unique id
          />
        ) : (
          <Text style={styles.text}>You have no saved payment methods</Text>
        )}
        
        <Pressable onPress={() => navigation.navigate('AddPaymentMethods')}>
          <Text style={styles.addPayment}>
            Add a payment method
            <Text style={styles.plusStyle}> +</Text>
          </Text>
          
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
  content: {
    flex: 1,
    marginTop: 85,

    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
  addPayment: {
    marginTop: 15,
  },
  plusStyle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  paymentMethod: {
    fontSize: 16,
    marginVertical: 8,
  },
});

export default PaymentMethodsScreen;
