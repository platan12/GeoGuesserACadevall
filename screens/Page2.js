import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default function Page2({ navigation }) {

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Congratulations</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Page1")}> 
          <Text style={styles.buttonText }>Try Again </Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#44495E', // Fons fosc
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleContainer: {
      backgroundColor: '#242442', // Blau fosc
      padding: 20,
      borderRadius: 30, // Arrodonir les puntes
      marginBottom: 300,
    },
    titleText: {
      color: '#FFFFFF', // Lletra blanca
      fontSize: 36,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#D9D9D9', // Fons blanc
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 30, // Botó arrodonit
    },
    buttonText: {
      color: '#242442', // Color del text del botó (a joc amb el títol)
      fontSize: 24,
      fontWeight: 'bold',
    },
  });


