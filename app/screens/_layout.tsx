import { Stack } from 'expo-router';

export default function ScreensLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" />
      <Stack.Screen name="PlaylistsScreen" />
      <Stack.Screen name="ProfileScreen" />
      <Stack.Screen name="SettingsScreen" />
      <Stack.Screen name="SpotifyLoginScreen" />
      <Stack.Screen name="SpotifySignUp" />
      <Stack.Screen name="ComponentShowcaseScreen" />
      <Stack.Screen name="ExploreScreen" />
    </Stack>
  );
}