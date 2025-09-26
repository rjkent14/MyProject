import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#000',
  },
  logo: {
    width: 60,
    height: 100,
    marginBottom: 32,
    resizeMode: 'contain',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 6,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#1DB954',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 18,
  },
  buttonText: {
    color: '#191414',
    fontWeight: 'bold',
    fontSize: 18,
  },
  backText: {
    color: '#b3b3b3',
    fontSize: 15,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  genderContainer: {
    width: '100%',
    maxWidth: 340,
    marginBottom: 16,
  },
  genderLabel: {
    color: '#b3b3b3',
    fontSize: 15,
    marginBottom: 8,
  },
  genderOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    backgroundColor: '#222',
    paddingVertical: 12,
    marginHorizontal: 4,
    borderColor: '#1DB954',
    borderRadius: 6,
    alignItems: 'center',
  },
  genderButtonSelected: {
    borderWidth: 2,
    borderColor: '#1DB954',
  },
  genderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 12,
  },
  dobRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 340,
    marginBottom: 16,
    gap: 8,
  },
  dobCol: {
    flex: 1,
    alignItems: 'center',
  },
  dobLabel: {
    color: '#b3b3b3',
    fontSize: 13,
    marginBottom: 4,
  },
  dobScroll: {
    maxHeight: 38,
    marginBottom: 2,
  },
  dobToggle: {
    backgroundColor: '#222',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#444',
  },
  dobToggleSelected: {
    borderColor: '#1DB954',
    backgroundColor: '#1DB95433',
  },
  dobToggleText: {
    color: '#fff',
    fontSize: 13,
  },
  dobColContainer: {
    width: '100%',
    maxWidth: 340,
    marginBottom: 16,
  },
  dobCollapseHeader: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#191414',
    borderBottomWidth: 1,
    borderColor: '#222',
    marginBottom: 2,
  },
});

export default function SpotifySignUp() {
  const navigation = useNavigation() as any;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [gender, setGender] = useState('');
  const [day, setDay] = useState('1');
  const [month, setMonth] = useState('1');
  const [year, setYear] = useState('2000');

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={styles.logoRow}>
          <Image
            source={require('../../assets/images/spotify-logo.png')}
            style={styles.logo}
            accessibilityLabel="Spotify logo"
            accessibilityHint="Spotify logo at the top of the sign up screen"
          />
          <Text style={styles.title}>Sign up for Spotify</Text>
        </View>

        {/* Account Info */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#b3b3b3"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#b3b3b3"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Display name"
          placeholderTextColor="#b3b3b3"
          value={displayName}
          onChangeText={setDisplayName}
        />

        {/* Gender */}
        <View style={styles.genderContainer}>
          <Text style={styles.genderLabel}>Gender</Text>
          <View style={styles.genderOptions}>
            {['Female', 'Male', 'Non-binary'].map((g) => (
              <TouchableOpacity
                key={g}
                onPress={() => setGender(g)}
                style={[styles.genderButton, gender === g && styles.genderButtonSelected]}
              >
                <Text style={styles.genderButtonText}>{g}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Date of birth */}
        <View style={styles.dobColContainer}>
          <Text style={styles.genderLabel}>Date of birth</Text>
          <View style={styles.dobRow}>
            <View style={styles.dobCol}>
              <Text style={styles.dobLabel}>Month</Text>
              <TextInput
                style={styles.input}
                value={month}
                onChangeText={setMonth}
                keyboardType="number-pad"
                placeholder="MM"
                placeholderTextColor="#888"
              />
            </View>
            <View style={styles.dobCol}>
              <Text style={styles.dobLabel}>Day</Text>
              <TextInput
                style={styles.input}
                value={day}
                onChangeText={setDay}
                keyboardType="number-pad"
                placeholder="DD"
                placeholderTextColor="#888"
              />
            </View>
            <View style={styles.dobCol}>
              <Text style={styles.dobLabel}>Year</Text>
              <TextInput
                style={styles.input}
                value={year}
                onChangeText={setYear}
                keyboardType="number-pad"
                placeholder="YYYY"
                placeholderTextColor="#888"
              />
            </View>
          </View>
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Alert.alert('Sign Up', 'Account creation would be implemented here');
          }}
          accessibilityRole="button"
          accessibilityLabel="Create account"
        >
          <Text style={styles.buttonText}>Create account</Text>
        </TouchableOpacity>

        <Text onPress={() => navigation.goBack()} style={styles.backText}>Back to login</Text>
      </View>
    </ScrollView>
  );
}
