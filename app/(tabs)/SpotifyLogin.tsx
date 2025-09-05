import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Animated, Image, TouchableOpacity, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const spotifyGreen = '#1DB954';
const darkBg = '#191414';

export default function SpotifyLogin() {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Animated.Image
          source={require('../../assets/images/spotify-logo.png')}
          style={[styles.logo, { opacity: logoOpacity }]}
          accessibilityLabel="Spotify logo"
          accessibilityHint="Fades in when the screen loads"
        />
        <Text style={styles.title} accessibilityRole="header">Spotify</Text>
      </View>
  <View style={{ height: 24 }} />
      <TextInput
        style={styles.input}
        placeholder="Email or username"
        placeholderTextColor="#b3b3b3"
        autoCapitalize="none"
        keyboardType="email-address"
        accessibilityLabel="Email or username"
        accessibilityHint="Enter your Spotify email or username"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#b3b3b3"
        secureTextEntry
        accessibilityLabel="Password"
        accessibilityHint="Enter your Spotify password"
      />
      <View style={{ width: '100%', alignItems: 'flex-end' }}>
        <TouchableOpacity
          onPress={() => { /* handle forgot password navigation */ }}
          accessibilityRole="link"
          accessibilityLabel="Forgot password?"
          accessibilityHint="Navigate to password recovery screen">
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        accessibilityRole="button"
        accessibilityLabel="Log in"
        accessibilityHint="Double tap to log in to your Spotify account"
        onPress={() => {}}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

  {/* Social login options removed as requested */}

      <Text style={styles.connectText}>Be connected with</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity
          style={[styles.socialCircle, styles.socialDark]}
          accessibilityRole="button"
          accessibilityLabel="Login with Facebook"
          accessibilityHint="Log in using your Facebook account"
          onPress={() => {}}>
          <FontAwesome name="facebook" size={32} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialCircle, styles.socialDark]}
          accessibilityRole="button"
          accessibilityLabel="Login with Google"
          accessibilityHint="Log in using your Google account"
          onPress={() => {}}>
          <FontAwesome name="google" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => router.push('/(tabs)/SpotifySignUp')}
        accessibilityRole="link"
        accessibilityLabel="Sign up"
        accessibilityHint="Navigate to sign up screen">
        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logoRow: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    gap: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#191414', // Spotify black
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 32,
    resizeMode: 'contain',
  },
  title: {
    color: '#fff',
    fontSize: 28,
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
    backgroundColor: spotifyGreen,
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
  signupText: {
    color: '#b3b3b3',
    fontSize: 15,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  forgotText: {
    color: '#1DB954',
    fontSize: 15,
    marginBottom: 10,
    textAlign: 'right',
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
  },
  connectText: {
    color: spotifyGreen,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    marginVertical: 18,
  },
  socialCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    elevation: 2,
  },
  socialDark: {
    backgroundColor: '#232323',
  },
});
