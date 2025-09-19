import { useReducer, useState } from 'react';
import {
  FlatList,
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
  | { type: 'REDO' };

const playlistReducer = (state: PlaylistState, action: Action): PlaylistState => {
  switch (action.type) {
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
  const [songInput, setSongInput] = useState('');
  const [state, dispatch] = useReducer(playlistReducer, {
    current: [],
    past: [],
    future: [],
  });
  const [history, setHistory] = useState<string[]>([]);

  const addSong = () => {
    const trimmedSong = songInput.trim();
    if (trimmedSong) {
      dispatch({ type: 'ADD_SONG', song: trimmedSong });
      setHistory((prev) => [...prev, trimmedSong]);
      setSongInput('');
    }
  };

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

  const renderPlaylistItem = ({ item }: { item: Song }) => (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={Layout}
      style={styles.songItem}
    >
      <Text style={styles.songName} numberOfLines={1}>
        {item.name}
      </Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeSong(item.id)}
      >
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderHistoryItem = ({ item, index }: { item: string; index: number }) => (
    <Animated.View
      entering={FadeIn}
      layout={Layout}
      style={styles.historyItem}
    >
      <Text style={styles.historyText} numberOfLines={1}>
        {item}
      </Text>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>My Playlist</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={songInput}
            onChangeText={setSongInput}
            placeholder="Enter song name"
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.addButton} onPress={addSong}>
            <Text style={styles.buttonText}>Add Song</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.undoRedoContainer}>
          <TouchableOpacity
            style={[styles.undoButton, !canUndo && styles.disabledButton]}
            onPress={undo}
            disabled={!canUndo}
          >
            <Text style={[styles.buttonText, !canUndo && styles.disabledText]}>Undo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.redoButton, !canRedo && styles.disabledButton]}
            onPress={redo}
            disabled={!canRedo}
          >
            <Text style={[styles.buttonText, !canRedo && styles.disabledText]}>Redo</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.clearButton} onPress={clearPlaylist}>
          <Text style={styles.clearButtonText}>Clear Playlist</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>
          Playlist ({state.current.length})
        </Text>
        <FlatList
          data={state.current}
          keyExtractor={(item) => item.id}
          renderItem={renderPlaylistItem}
          style={styles.list}
          scrollEnabled={false}
        />

        <Text style={styles.sectionTitle}>
          Song History ({history.length})
        </Text>
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
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#222',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 12,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#1DB954',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    minWidth: 100,
  },
  undoRedoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  undoButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    flex: 1,
    marginRight: 10,
  },
  redoButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
  },
  disabledButton: {
    backgroundColor: '#444',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabledText: {
    color: '#888',
  },
  clearButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 20,
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
