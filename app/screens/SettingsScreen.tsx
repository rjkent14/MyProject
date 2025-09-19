import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
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
        <Text style={styles.headerTitle}>Settings</Text>
        <TouchableOpacity style={styles.demoButton} onPress={triggerBounce}>
          <Text style={styles.demoButtonText}>Show Animation Demo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Notifications</Text>
        <Switch value={notifications} onValueChange={setNotifications} trackColor={{ true: '#1DB954' }} />
      </View>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ true: '#1DB954' }} />
      </View>
      {/* Add navigation logic here if needed */}
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
    paddingTop: 60,
    alignItems: 'center',
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
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 320,
    marginBottom: 18,
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 12,
  },
  settingLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
