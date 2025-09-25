import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Song {
  id: string;
  name: string;
}

export default function PlaylistsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedSongs = await AsyncStorage.getItem('songs');
        const savedHistory = await AsyncStorage.getItem('songHistory');
        if (savedSongs) {
          setSongs(JSON.parse(savedSongs));
        }
        if (savedHistory) {
          setHistory(JSON.parse(savedHistory));
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('songs', JSON.stringify(songs));
        await AsyncStorage.setItem('songHistory', JSON.stringify(history));
      } catch (error) {
        console.error('Failed to save data:', error);
      }
    };
    saveData();
  }, [songs, history]);

  const filteredSongs = songs.filter((song) =>
    song.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const SongRow = ({ item }: { item: Song }) => (
    <View style={styles.songItem}>
      <Text style={styles.songName} numberOfLines={1}>
        {item.name}
      </Text>
    </View>
  );

  const HistoryRow = ({ text }: { text: string }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyText} numberOfLines={1}>
        {text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top navigation bar: search + profile menu */}
      <View style={styles.topBar} pointerEvents="box-none">
        <TextInput
          style={styles.searchInput}
          placeholder="Search songs"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.profileContainer}>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => setMenuOpen((v) => !v)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
          >
            <View style={styles.avatarInner} />
          </TouchableOpacity>
          {menuOpen && (
            <View style={styles.dropdownMenu} pointerEvents="auto">
              <TouchableOpacity
                style={[styles.menuItem, styles.logoutItem]}
                onPress={() => {
                  setMenuOpen(false);
                  router.replace('/(tabs)/SpotifyLogin');
                }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                activeOpacity={0.7}
              >
                <Text style={[styles.menuItemText, { color: '#dc3545' }]}>Log out</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/spotify-logo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Spotify</Text>
        </View>

        <FlatList
          data={filteredSongs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SongRow item={item} />}
          style={styles.list}
          scrollEnabled={false}
        />

        <Text style={styles.sectionTitle}>Browse by category</Text>
        <View style={styles.categoriesGrid}>
          {['Pop', 'Hip-Hop', 'Rock', 'Chill', 'Focus', 'Workout'].map((category, idx) => (
            <View
              key={category}
              style={[
                styles.categoryTile,
                { backgroundColor: ['#2d2633', '#233b2e', '#2a2a2a', '#1e3264', '#477D95', '#503750'][idx % 6] },
              ]}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Song History ({history.length})</Text>
        <FlatList
          data={history}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <HistoryRow text={item} />}
          style={styles.historyList}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191414',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#222',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 12,
    fontSize: 14,
  },
  profileContainer: {
    position: 'relative',
    zIndex: 999,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#444',
  },
  avatarInner: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    backgroundColor: '#444',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#232323',
    borderRadius: 12,
    paddingVertical: 6,
    width: 160,
    elevation: 10,
    zIndex: 1001,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuItemText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryTile: {
    width: '47%',
    height: 100,
    borderRadius: 8,
    padding: 12,
    justifyContent: 'flex-end',
  },
  categoryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    maxHeight: 200,
  },
  songItem: {
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  songName: {
    color: '#fff',
    fontSize: 16,
  },
  historyList: {
    maxHeight: 200,
  },
  historyItem: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  historyText: {
    color: '#fff',
    fontSize: 14,
  },
});
