import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ComponentShowcase() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Component Showcase</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191414',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
});
