import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PlaylistDetailScreenProps {
  playlistId?: string;
  playlistName?: string;
}

export default function PlaylistDetailScreen({ playlistId, playlistName }: PlaylistDetailScreenProps) {
  const router = useRouter();

  // Mock playlist data - in a real app, this would come from props or API
  const mockSongs = [
    { id: '1', name: 'Song 1', artist: 'Artist 1', duration: '3:45' },
    { id: '2', name: 'Song 2', artist: 'Artist 2', duration: '4:12' },
    { id: '3', name: 'Song 3', artist: 'Artist 3', duration: '3:28' },
    { id: '4', name: 'Song 4', artist: 'Artist 4', duration: '5:01' },
    { id: '5', name: 'Song 5', artist: 'Artist 5', duration: '2:59' },
  ];

  const displayName = playlistName || 'Playlist';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{displayName}</Text>
        <Text style={styles.subtitle}>{mockSongs.length} songs</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {mockSongs.map((song) => (
          <TouchableOpacity
            key={song.id}
            style={styles.songItem}
            onPress={() => {
              console.log('Playing song:', song.name);
              // Handle song play functionality
            }}
            activeOpacity={0.7}
          >
            <View style={styles.songInfo}>
              <Text style={styles.songName} numberOfLines={1}>
                {song.name}
              </Text>
              <Text style={styles.songArtist} numberOfLines={1}>
                {song.artist}
              </Text>
            </View>
            <Text style={styles.songDuration}>{song.duration}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191414',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#191414',
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: '#1DB954',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#888',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  songItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  songInfo: {
    flex: 1,
  },
  songName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  songArtist: {
    color: '#888',
    fontSize: 14,
  },
  songDuration: {
    color: '#888',
    fontSize: 14,
    marginLeft: 16,
  },
});