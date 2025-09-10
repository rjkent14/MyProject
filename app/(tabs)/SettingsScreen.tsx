import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="spotify" size={28} color="#1DB954" style={{ marginRight: 8 }} />
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Notifications</Text>
        <Switch value={notifications} onValueChange={setNotifications} trackColor={{ true: '#1DB954' }} />
      </View>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ true: '#1DB954' }} />
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/(tabs)/SpotifyLogin')}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 24,
    backgroundColor: '#232323',
    borderRadius: 12,
    padding: 16,
  },
  settingLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: '#1DB954',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  logoutButtonText: {
    color: '#191414',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
