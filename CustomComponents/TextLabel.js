import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const TextLabel = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8, 
    flexDirection:'row'
  },
  label: {
    fontSize: 14,
   // fontWeight: 'bold',
    //color: '#FFFFFF',
    color:'black'
  },
  value: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight:'bold'
  },
});

export default TextLabel;
