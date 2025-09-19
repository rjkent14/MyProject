import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1DB954',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#191414',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ComponentShowcase"
        options={{
          title: 'Showcase',
          tabBarIcon: ({ color, size }) => <Ionicons name="code" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="SpotifyLogin"
        options={{
          title: 'Login',
          tabBarIcon: ({ color, size }) => <Ionicons name="log-in" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
