import { CardStyleInterpolators, createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import React from 'react';
import SpotifyLogin from './(tabs)/SpotifyLogin';
import PlaylistsScreen from './screens/PlaylistsScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import SpotifySignUp from './screens/SpotifySignUp';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="SpotifyLogin">
      <Stack.Screen name="SpotifyLogin" component={SpotifyLogin} options={{ headerShown: false }} />
      <Stack.Screen
        name="SpotifySignUp"
        component={SpotifySignUp}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          transitionSpec: {
            open: TransitionSpecs.FadeInFromBottomAndroidSpec,
            close: TransitionSpecs.FadeOutToBottomAndroidSpec,
          },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: { duration: 300 },
            },
            close: {
              animation: 'timing',
              config: { duration: 300 },
            },
          },
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: { duration: 300 },
            },
            close: {
              animation: 'timing',
              config: { duration: 300 },
            },
          },
        }}
      />
      <Stack.Screen name="Playlists" component={PlaylistsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
