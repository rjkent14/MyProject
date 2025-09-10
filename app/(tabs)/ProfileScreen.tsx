import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="spotify" size={28} color="#1DB954" style={{ marginRight: 8 }} />
        <Text style={styles.headerTitle}>Profile</Text>
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
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#232323',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  name: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  email: {
    color: '#b3b3b3',
    fontSize: 16,
    marginBottom: 18,
  },
  editButton: {
    backgroundColor: '#1DB954',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  editButtonText: {
    color: '#191414',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
