import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function ProfileScreen() {
  // Animation demo
  const bounce = useSharedValue(0);
  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: -bounce.value * 40 },
      { scale: 1 + bounce.value * 0.2 },
    ],
  }));
  const triggerBounce = () => {
    bounce.value = 1;
    setTimeout(() => {
      bounce.value = withSpring(0, { damping: 4 });
    }, 200);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animated.View style={animatedLogoStyle}>
          <FontAwesome name="spotify" size={48} color="#1DB954" style={{ marginRight: 8 }} />
        </Animated.View>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.demoButton} onPress={triggerBounce}>
          <Text style={styles.demoButtonText}>Show Animation Demo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileSection}>
        <View style={styles.avatarPlaceholder}>
          <FontAwesome name="user" size={48} color="#b3b3b3" />
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@email.com</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  demoButton: {
    marginTop: 10,
    backgroundColor: '#1DB954',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: 'center',
  },
  demoButtonText: {
    color: '#191414',
    fontWeight: 'bold',
    fontSize: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#191414',
    alignItems: 'center',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  profileSection: {
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    color: '#b3b3b3',
    fontSize: 16,
    marginBottom: 12,
  },
  editButton: {
    backgroundColor: '#1DB954',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  editButtonText: {
    color: '#191414',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
