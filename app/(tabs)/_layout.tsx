import TabBarBackground from '@/components/ui/TabBarBackground';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#1DB954',
                headerShown: false,
                tabBarBackground: () =>
                    Platform.OS === 'ios' ? (
                        <BlurView tint="default" intensity={50} style={{ flex: 1 }} />
                    ) : (
                        <TabBarBackground />
                    ),
            }}
        >
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    tabBarIconStyle: { display: 'none' },
                    href: null,
                }}
            />
            <Tabs.Screen
                name="playlist"
                options={{
                    title: 'Playlist',
                    tabBarIconStyle: { display: 'none' },
                    href: null,
                }}
            />
            <Tabs.Screen
                name="SpotifyLogin"
                options={{
                    title: 'Login',
                    tabBarIconStyle: { display: 'none' },
                }}
            />
        </Tabs>
    );
}
