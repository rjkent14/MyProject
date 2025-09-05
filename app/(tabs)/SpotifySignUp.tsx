import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';


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
});

export default function SpotifySignUp() {
  const router = useRouter();
  const [gender, setGender] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Image
          source={require('../../assets/images/spotify-logo.png')}
          style={styles.logo}
          accessibilityLabel="Spotify logo"
          accessibilityHint="Spotify logo at the top of the sign up screen"
        />
        <Text style={styles.title}>Sign Up for Spotify</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#b3b3b3"
        autoCapitalize="none"
        keyboardType="email-address"
        accessibilityLabel="Email"
        accessibilityHint="Enter your email address"
      />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#b3b3b3"
        autoCapitalize="words"
        accessibilityLabel="Full Name"
        accessibilityHint="Enter your full name"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#b3b3b3"
        secureTextEntry
        accessibilityLabel="Password"
        accessibilityHint="Enter your password"
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth (YYYY-MM-DD)"
        placeholderTextColor="#b3b3b3"
        autoCapitalize="none"
        keyboardType="default"
        accessibilityLabel="Date of Birth"
        accessibilityHint="Enter your date of birth in YYYY-MM-DD format"
      />

      <View style={styles.genderContainer}>
        <Text style={styles.genderLabel}>Gender</Text>
        <View style={styles.genderOptions}>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'male' && styles.genderButtonSelected]}
            onPress={() => setGender('male')}
            accessibilityRole="button"
            accessibilityLabel="Male"
            accessibilityState={{ selected: gender === 'male' }}
          >
            <Text style={styles.genderButtonText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'female' && styles.genderButtonSelected]}
            onPress={() => setGender('female')}
            accessibilityRole="button"
            accessibilityLabel="Female"
            accessibilityState={{ selected: gender === 'female' }}
          >
            <Text style={styles.genderButtonText}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'other' && styles.genderButtonSelected]}
            onPress={() => setGender('other')}
            accessibilityRole="button"
            accessibilityLabel="Other"
            accessibilityState={{ selected: gender === 'other' }}
          >
            <Text style={styles.genderButtonText}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        accessibilityRole="button"
        accessibilityLabel="Sign up"
        accessibilityHint="Double tap to create your Spotify account"
        onPress={() => {}}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 10 }}>
        <Text style={styles.backText}>
          Already have an account?{' '}
          <Text
            style={{ color: '#1DB954', textDecorationLine: 'underline' }}
            onPress={() => router.replace('/(tabs)/SpotifyLogin')}
            accessibilityRole="button"
            accessibilityLabel="Sign in"
            accessibilityHint="Go back to the login screen"
          >
            Sign in
          </Text>
        </Text>
      </View>
  </View>
  );
}
