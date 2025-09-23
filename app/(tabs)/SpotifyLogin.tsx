
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated as RNAnimated, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const spotifyGreen = '#1DB954';
const darkBg = '#191414';

export default function SpotifyLogin() {
  const router = useRouter();

  // Fade-in for logo
  const logoOpacity = useRef(new RNAnimated.Value(0)).current;
  useEffect(() => {
    RNAnimated.timing(logoOpacity, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  // Bounce animation demo
  const bounce = useSharedValue(0);
  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: bounce.value },
    ],
  }));
  const triggerBounce = () => {
    bounce.value = withSpring(-30, { damping: 2, stiffness: 80 }, () => {
      bounce.value = withSpring(0);
    });
  };

  return (
    <RNAnimated.ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.logoRow}>
          <Animated.View style={animatedLogoStyle}>
            <RNAnimated.Image
              source={require('../../assets/images/spotify-logo.png')}
              style={[styles.logo, { opacity: logoOpacity }]}
              accessibilityLabel="Spotify logo"
              accessibilityHint="Fades in when the screen loads"
            />
          </Animated.View>
          <Text style={styles.title} accessibilityRole="header">Spotify</Text>
          <TouchableOpacity
            style={styles.demoButton}
            onPress={triggerBounce}
            accessibilityRole="button"
            accessibilityLabel="Show animation demo"
          >
            <Text style={styles.demoButtonText}>Show Animation Demo</Text>
          </TouchableOpacity>
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
          onPress={() => router.push('/playlist')}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <Text style={styles.connectText}>Be connected with</Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={[styles.socialCircle, styles.socialDark]}
            accessibilityRole="button"
            accessibilityLabel="Login with Facebook"
            accessibilityHint="Log in using your Facebook account"
            onPress={() => { }}>
            <FontAwesome name="facebook" size={32} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialCircle, styles.socialDark]}
            accessibilityRole="button"
            accessibilityLabel="Login with Google"
            accessibilityHint="Log in using your Google account"
            onPress={() => { }}>
            <FontAwesome name="google" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/screens/SpotifySignUp')}
          accessibilityRole="link"
          accessibilityLabel="Sign up"
          accessibilityHint="Navigate to sign up screen">
          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <Text style={{ color: spotifyGreen, textDecorationLine: 'underline' }}>
              Sign up
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </RNAnimated.ScrollView>
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
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 29,
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
    color: '#404341ff',
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
