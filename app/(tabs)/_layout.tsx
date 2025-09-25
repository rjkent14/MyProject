import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform, Text, TouchableOpacity, View, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Note: In a real app, you'd dispatch an action to change the theme globally
    Alert.alert('Theme Changed', `Switched to ${!isDarkMode ? 'Dark' : 'Light'} mode`);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => props.navigation.closeDrawer(),
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            props.navigation.closeDrawer();
            router.replace('/(tabs)/SpotifyLogin');
          },
        },
      ]
    );
  };

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: '#191414' }}>
      {/* Profile Section */}
      <View style={{ padding: 20, alignItems: 'center', marginBottom: 20 }}>
        <View style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: '#333',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 12,
          borderWidth: 2,
          borderColor: '#1DB954'
        }}>
          <IconSymbol size={40} name="person.circle.fill" color="#1DB954" />
        </View>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>
          Welcome!
        </Text>
        <Text style={{ color: '#888', fontSize: 14 }}>
          Spotify User
        </Text>
      </View>

      {/* Navigation Items */}
      <DrawerItem
        label="Home"
        onPress={() => {
          props.navigation.closeDrawer();
          props.navigation.navigate('index');
        }}
        labelStyle={{ color: '#fff' }}
        style={{ backgroundColor: 'transparent' }}
        icon={() => <IconSymbol size={20} name="house.fill" color="#fff" />}
      />

      <DrawerItem
        label="Explore"
        onPress={() => {
          props.navigation.closeDrawer();
          props.navigation.navigate('explore');
        }}
        labelStyle={{ color: '#fff' }}
        style={{ backgroundColor: 'transparent' }}
        icon={() => <IconSymbol size={20} name="paperplane.fill" color="#fff" />}
      />

      <DrawerItem
        label="Playlists"
        onPress={() => {
          props.navigation.closeDrawer();
          props.navigation.navigate('SpotifyLogin');
        }}
        labelStyle={{ color: '#fff' }}
        style={{ backgroundColor: 'transparent' }}
        icon={() => <IconSymbol size={20} name="music.note" color="#fff" />}
      />

      {/* Settings Section */}
      <View style={{
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#222',
        marginHorizontal: 10,
        borderRadius: 8
      }}>
        <Text style={{ color: '#1DB954', fontSize: 16, fontWeight: 'bold', marginBottom: 15 }}>
          Settings
        </Text>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 8
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconSymbol size={20} name="moon.fill" color="#fff" style={{ marginRight: 10 }} />
            <Text style={{ color: '#fff', fontSize: 14 }}>Dark Mode</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: '#1DB954' }}
            thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Logout Button */}
      <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#dc3545',
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
          onPress={handleLogout}
        >
          <IconSymbol size={18} name="arrow.right.square" color="#fff" style={{ marginRight: 8 }} />
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

export default function TabLayout() {
  return (
    <Drawer.Navigator
      initialRouteName="SpotifyLogin"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#191414',
          width: 300,
        },
        drawerActiveTintColor: '#1DB954',
        drawerInactiveTintColor: '#fff',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '500',
        },
        drawerType: 'slide', // Enables swipe-to-open
        swipeEnabled: true, // Enables swipe gestures
        swipeEdgeWidth: 50, // Width of swipe area from screen edge
        swipeMinDistance: 20, // Minimum distance to trigger swipe
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: 'Home',
          drawerIcon: ({ color }) => <IconSymbol size={20} name="house.fill" color={color} />,
        }}
        component={() => (
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: '#1DB954',
              headerShown: false,
              tabBarButton: HapticTab,
              tabBarBackground: TabBarBackground,
              tabBarStyle: Platform.select({
                ios: { position: 'absolute' },
                default: {},
              }),
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
              }}
            />
            <Tabs.Screen
              name="explore"
              options={{
                title: 'Explore',
                tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
              }}
            />
            <Tabs.Screen
              name="SpotifyLogin"
              options={{
                title: 'Spotify',
                tabBarIcon: ({ color }) => <IconSymbol size={28} name="music.note" color={color} />,
              }}
            />
          </Tabs>
        )}
      />

      <Drawer.Screen
        name="explore"
        options={{
          title: 'Explore',
          drawerIcon: ({ color }) => <IconSymbol size={20} name="paperplane.fill" color={color} />,
        }}
        component={() => (
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: '#1DB954',
              headerShown: false,
              tabBarButton: HapticTab,
              tabBarBackground: TabBarBackground,
              tabBarStyle: Platform.select({
                ios: { position: 'absolute' },
                default: {},
              }),
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
              }}
            />
            <Tabs.Screen
              name="explore"
              options={{
                title: 'Explore',
                tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
              }}
            />
            <Tabs.Screen
              name="SpotifyLogin"
              options={{
                title: 'Spotify',
                tabBarIcon: ({ color }) => <IconSymbol size={28} name="music.note" color={color} />,
              }}
            />
          </Tabs>
        )}
      />

      <Drawer.Screen
        name="SpotifyLogin"
        options={{
          title: 'Playlists',
          drawerIcon: ({ color }) => <IconSymbol size={20} name="music.note" color={color} />,
        }}
        component={() => (
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: '#1DB954',
              headerShown: false,
              tabBarButton: HapticTab,
              tabBarBackground: TabBarBackground,
              tabBarStyle: Platform.select({
                ios: { position: 'absolute' },
                default: {},
              }),
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
              }}
            />
            <Tabs.Screen
              name="explore"
              options={{
                title: 'Explore',
                tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
              }}
            />
            <Tabs.Screen
              name="SpotifyLogin"
              options={{
                title: 'Spotify',
                tabBarIcon: ({ color }) => <IconSymbol size={28} name="music.note" color={color} />,
              }}
            />
          </Tabs>
        )}
      />
    </Drawer.Navigator>
  );
}
