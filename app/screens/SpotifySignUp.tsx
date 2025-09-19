import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

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
  type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Main: undefined;
  };
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [gender, setGender] = useState('');
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2000);
  const [showMonth, setShowMonth] = useState(false);
  const [showDay, setShowDay] = useState(false);
  const [showYear, setShowYear] = useState(false);

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
      {/* ...existing code... */}
    </View>
  );
}
