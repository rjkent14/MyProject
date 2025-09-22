import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#1DB95422', dark: '#0f2919' }}
      headerImage={
        <Image
          source={require('@/assets/images/spotify-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Good evening</ThemedText>
        <HelloWave />
      </ThemedView>
      <View style={styles.cardGrid}>
        <View style={[styles.card, { backgroundColor: '#2a2a2a' }]}>
          <ThemedText type="defaultSemiBold">Liked Songs</ThemedText>
        </View>
        <View style={[styles.card, { backgroundColor: '#233b2e' }]}>
          <ThemedText type="defaultSemiBold">Daily Mix</ThemedText>
        </View>
        <View style={[styles.card, { backgroundColor: '#2d2633' }]}>
          <ThemedText type="defaultSemiBold">Focus</ThemedText>
        </View>
        <View style={[styles.card, { backgroundColor: '#2a2a2a' }]}>
          <ThemedText type="defaultSemiBold">Chill</ThemedText>
        </View>
        <View style={[styles.card, { backgroundColor: '#233b2e' }]}>
          <ThemedText type="defaultSemiBold">Workout</ThemedText>
        </View>
        <View style={[styles.card, { backgroundColor: '#2d2633' }]}>
          <ThemedText type="defaultSemiBold">Party</ThemedText>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  card: {
    width: '47%'
    ,
    padding: 14,
    borderRadius: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
