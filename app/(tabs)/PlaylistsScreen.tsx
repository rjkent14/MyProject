import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

const playlists = [
  {
    id: '1',
    title: 'Chill Hits',
    cover: require('../../assets/images/spotify-logo.png'),
  },
  {
    id: '2',
    title: 'Workout Mix',
    cover: require('../../assets/images/partial-react-logo.png'),
  },
  {
    id: '3',
    title: 'Top 50 Global',
    cover: require('../../assets/images/react-logo.png'),
  },
  {
    id: '4',
    title: 'Indie Essentials',
    cover: require('../../assets/images/splash-icon.png'),
  },
  {
    id: '5',
    title: 'Throwback Vibes',
    cover: require('../../assets/images/icon.png'),
  },
];

export default function PlaylistsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="spotify" size={28} color="#1DB954" style={{ marginRight: 8 }} />
        <Text style={styles.headerTitle}>Playlists</Text>
      </View>
      <FlatList
        data={playlists}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.playlistItem}>
            <Image source={item.cover} style={styles.cover} />
            <Text style={styles.playlistTitle}>{item.title}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
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
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232323',
    borderRadius: 12,
    marginBottom: 18,
    padding: 12,
    width: 300,
  },
  cover: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 18,
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});
