import { useColorScheme } from '@/hooks/useColorScheme';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PlaylistsScreen from './(tabs)/PlaylistsScreen';
import ProfileScreen from './(tabs)/ProfileScreen';
import SettingsScreen from './(tabs)/SettingsScreen';
import SpotifyLogin from './(tabs)/SpotifyLogin';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const colorScheme = useColorScheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Drawer.Navigator
          screenOptions={{
            swipeEdgeWidth: 40,
            drawerType: 'front',
            swipeMinDistance: 20,
            headerShown: false,
            drawerActiveTintColor: '#1DB954',
            drawerInactiveTintColor: '#fff',
            drawerStyle: { backgroundColor: '#191414' },
          }}
          drawerContent={props => (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
          )}
        >
          <Drawer.Screen name="Home" component={SpotifyLogin} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Playlists" component={PlaylistsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
