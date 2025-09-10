import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
  const router = useRouter();
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

      {/* Date of Birth Picker */}
      <Text style={{ color: '#6b7280', fontSize: 13, fontWeight: '500', alignSelf: 'flex-start', marginBottom: 4, marginLeft: 2 }}>
        Birthday <Text style={{ color: '#9ca3af', fontSize: 13 }}>ⓘ</Text>
      </Text>
      <View style={{ flexDirection: 'row', width: '100%', maxWidth: 340, marginBottom: 16, gap: 8 }}>
        {/* Month Dropdown */}
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 6, backgroundColor: '#fff', height: 40, justifyContent: 'space-between', paddingHorizontal: 8 }}
            onPress={() => setShowMonth(!showMonth)}
          >
            <Text style={{ color: '#111827', fontSize: 15, fontWeight: '500' }}>{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month-1]}</Text>
            <Text style={{ color: '#9ca3af', fontSize: 18, marginLeft: 8 }}>▼</Text>
          </TouchableOpacity>
          {showMonth && (
            <View style={{ position: 'absolute', top: 44, left: 0, right: 0, backgroundColor: '#fff', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 6, zIndex: 10, maxHeight: 200 }}>
              <ScrollView>
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => (
                  <TouchableOpacity key={i+1} onPress={() => { setMonth(i+1); setShowMonth(false); }} style={{ padding: 10 }}>
                    <Text style={{ color: '#111827', fontSize: 15 }}>{m}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        {/* Day Dropdown */}
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 6, backgroundColor: '#fff', height: 40, justifyContent: 'space-between', paddingHorizontal: 8 }}
            onPress={() => setShowDay(!showDay)}
          >
            <Text style={{ color: '#111827', fontSize: 15, fontWeight: '500' }}>{day}</Text>
            <Text style={{ color: '#9ca3af', fontSize: 18, marginLeft: 8 }}>▼</Text>
          </TouchableOpacity>
          {showDay && (
            <View style={{ position: 'absolute', top: 44, left: 0, right: 0, backgroundColor: '#fff', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 6, zIndex: 10, maxHeight: 200 }}>
              <ScrollView>
                {[...Array(31)].map((_, i) => (
                  <TouchableOpacity key={i+1} onPress={() => { setDay(i+1); setShowDay(false); }} style={{ padding: 10 }}>
                    <Text style={{ color: '#111827', fontSize: 15 }}>{i+1}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        {/* Year Dropdown */}
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 6, backgroundColor: '#fff', height: 40, justifyContent: 'space-between', paddingHorizontal: 8 }}
            onPress={() => setShowYear(!showYear)}
          >
            <Text style={{ color: '#111827', fontSize: 15, fontWeight: '500' }}>{year}</Text>
            <Text style={{ color: '#9ca3af', fontSize: 18, marginLeft: 8 }}>▼</Text>
          </TouchableOpacity>
          {showYear && (
            <View style={{ position: 'absolute', top: 44, left: 0, right: 0, backgroundColor: '#fff', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 6, zIndex: 10, maxHeight: 200 }}>
              <ScrollView>
                {[...Array(100)].map((_, i) => {
                  const y = 2025 - i;
                  return (
                    <TouchableOpacity key={y} onPress={() => { setYear(y); setShowYear(false); }} style={{ padding: 10 }}>
                      <Text style={{ color: '#111827', fontSize: 15 }}>{y}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </View>
      </View>

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
