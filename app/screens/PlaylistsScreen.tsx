import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { memo, useCallback, useEffect, useReducer, useState } from 'react';
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
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
} from 'react-native-reanimated';

interface Song {
  id: string;
  name: string;
}

interface PlaylistState {
  current: Song[];
  past: Song[][];
  future: Song[][];
}

type Action =
  | { type: 'ADD_SONG'; song: string }
  | { type: 'REMOVE_SONG'; id: string }
  | { type: 'CLEAR_PLAYLIST' }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'LOAD'; state: PlaylistState };

const playlistReducer = (state: PlaylistState, action: Action): PlaylistState => {
  switch (action.type) {
    case 'LOAD':
      return action.state;
    case 'ADD_SONG': {
      const newCurrent = [...state.current, { id: Date.now().toString(), name: action.song }];
      return {
        current: newCurrent,
        past: [...state.past, state.current],
        future: [],
      };
    }
    case 'REMOVE_SONG': {
      const newCurrent = state.current.filter((song: Song) => song.id !== action.id);
      return {
        current: newCurrent,
        past: [...state.past, state.current],
        future: [],
      };
    }
    case 'CLEAR_PLAYLIST': {
      return {
        current: [],
        past: [...state.past, state.current],
        future: [],
      };
    }
    case 'UNDO': {
      if (state.past.length === 0) return state;
      const newPast = [...state.past];
      const previous = newPast.pop()!;
      return {
        current: previous,
        past: newPast,
        future: [state.current, ...state.future],
      };
    }
    case 'REDO': {
      if (state.future.length === 0) return state;
      const newFuture = [...state.future];
      const next = newFuture.shift()!;
      return {
        current: next,
        past: [...state.past, state.current],
        future: newFuture,
      };
    }
    default:
      return state;
  }
};

export default function PlaylistsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [state, dispatch] = useReducer(playlistReducer, {
    current: [],
    past: [],
    future: [],
  });
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedState = await AsyncStorage.getItem('playlistState');
        const savedHistory = await AsyncStorage.getItem('songHistory');
        if (savedState) {
          const parsedState = JSON.parse(savedState) as PlaylistState;
          dispatch({ type: 'LOAD', state: parsedState });
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
        await AsyncStorage.setItem('playlistState', JSON.stringify(state));
        await AsyncStorage.setItem('songHistory', JSON.stringify(history));
      } catch (error) {
        console.error('Failed to save data:', error);
      }
    };
    saveData();
  }, [state, history]);

  // Add song via UI removed per request

  const removeSong = (id: string) => {
    dispatch({ type: 'REMOVE_SONG', id });
  };

  const clearPlaylist = () => {
    dispatch({ type: 'CLEAR_PLAYLIST' });
  };

  const undo = () => {
    dispatch({ type: 'UNDO' });
  };

  const redo = () => {
    dispatch({ type: 'REDO' });
  };

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  const filteredCurrent = state.current.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const PlaylistRow = memo(({ item, onRemove }: { item: Song; onRemove: (id: string) => void }) => (
    <Animated.View entering={FadeIn} exiting={FadeOut} layout={Layout} style={styles.songItem}>
      <Text style={styles.songName} numberOfLines={1}>
        {item.name}
      </Text>
      <TouchableOpacity style={styles.removeButton} onPress={() => onRemove(item.id)}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </Animated.View>
  ));
  PlaylistRow.displayName = 'PlaylistRow';

  const renderPlaylistItem = useCallback(
    ({ item }: { item: Song }) => <PlaylistRow item={item} onRemove={removeSong} />,
    [removeSong]
  );

  const HistoryRow = memo(({ text }: { text: string }) => (
    <Animated.View entering={FadeIn} layout={Layout} style={styles.historyItem}>
      <Text style={styles.historyText} numberOfLines={1}>
        {text}
      </Text>
    </Animated.View>
  ));
  HistoryRow.displayName = 'HistoryRow';

  const renderHistoryItem = useCallback(
    ({ item }: { item: string; index: number }) => <HistoryRow text={item} />,
    []
  );

  return (
    <View style={styles.container}>
      {/* Top navigation bar: search + profile menu */}
      <View style={styles.topBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search songs"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.profileContainer}>
          <TouchableOpacity style={styles.avatar} onPress={() => setMenuOpen((v) => !v)} />
          {menuOpen && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuOpen(false); router.push('/settings'); }}>
                <Text style={styles.menuItemText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={() => { setMenuOpen(false); router.replace('/(tabs)/SpotifyLogin'); }}>
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
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <Image
            source={require('../../assets/images/spotify-logo.png')}
            style={{ width: 80, height: 80, resizeMode: 'contain', marginBottom: 6 }}
          />
          <Text style={styles.title}>Spotify</Text>
        </View>


        <FlatList
          data={filteredCurrent}
          keyExtractor={(item) => item.id}
          renderItem={renderPlaylistItem}
          style={styles.list}
          scrollEnabled={false}
        />

        <Text style={styles.sectionTitle}>Browse by category</Text>
        <View style={styles.categoriesGrid}>
          {['Pop', 'Hip-Hop', 'Rock', 'Chill', 'Focus', 'Workout'].map((c, idx) => (
            <View
              key={c}
              style={[
                styles.categoryTile,
                { backgroundColor: ['#2d2633', '#233b2e', '#2a2a2a', '#1e3264', '#477D95', '#503750'][idx % 6] },
              ]}
            >
              <Text style={styles.categoryText}>{c}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Song History ({history.length})</Text>
        <FlatList
          data={history}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderHistoryItem}
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
    zIndex: 1000,
  },
  avatar: {
    width: 32,
    height: 32,
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
    elevation: 4,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
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
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  // removed input and addButton styles
  // removed undo/redo/clear styles
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  songName: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    marginRight: 12,
  },
  removeButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  removeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
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
