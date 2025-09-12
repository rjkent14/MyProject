import { useColorScheme } from '@/hooks/useColorScheme';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import StackNavigator from './StackNavigator';

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
          <Drawer.Screen name="Home">
            {({ navigation }) => (
              <Animated.View
                style={[{ flex: 1 }, animatedStyle]}
                // @ts-ignore
                drawerProgress={navigation && navigation.getParent && navigation.getParent().progress}
              >
                <StackNavigator />
              </Animated.View>
            )}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
