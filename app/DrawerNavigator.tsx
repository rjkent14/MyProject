import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import PlaylistsScreen from './screens/PlaylistsScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const colorScheme = useColorScheme();
  // Drawer scale animation using react-native-reanimated
  // Use drawer progress for animation
  const [drawerProgress, setDrawerProgress] = React.useState(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(drawerProgress, [0, 1], [1, 0.9]) },
    ],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
  <Drawer.Navigator
          screenOptions={({ route }) => ({
            swipeEdgeWidth: 40,
            drawerType: 'front',
            swipeMinDistance: 20,
            headerShown: false,
            drawerActiveTintColor: '#1DB954',
            drawerInactiveTintColor: '#fff',
            drawerStyle: { backgroundColor: '#191414' },
            drawerIcon: ({ color, size }) => {
              if (route.name === 'Profile') {
                return <Ionicons name="person-circle" size={size} color={color} />;
              } else if (route.name === 'Settings') {
                return <Ionicons name="settings" size={size} color={color} />;
              } else if (route.name === 'Playlists') {
                return <Ionicons name="musical-notes" size={size} color={color} />;
              }
              return null;
            },
          })}
          drawerContent={props => (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
          )}
        >
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Playlists" component={PlaylistsScreen} />
        </Drawer.Navigator>
      
    </GestureHandlerRootView>
  );
}
