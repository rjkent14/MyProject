import React from 'react';
import { View, Text, Button, Image, ScrollView, StyleSheet } from 'react-native';

export default function ComponentShowcase() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Component Showcase</Text>
      <Text style={styles.paragraph}>
        This screen demonstrates basic React Native components:
      </Text>
      <Button title="Press Me" onPress={() => alert('Button pressed!')} />
      <Image
        source={require('../../assets/images/react-logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.paragraph}>
        Scroll down to see more content. This is a sample image and button.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    marginVertical: 12,
    color: '#555',
    textAlign: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginVertical: 20,
  },
});
