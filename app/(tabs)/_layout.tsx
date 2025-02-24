import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF69B4', // Hot pink untuk ikon aktif
        tabBarInactiveTintColor: '#FFFFFF', // Putih untuk ikon tidak aktif
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'rgba(255, 192, 203, 0.9)', // Transparan pastel pink
            borderRadius: 25,
            marginHorizontal: 20,
            marginBottom: 15,
            elevation: 5,
            shadowColor: '#FF69B4', // Soft pink shadow
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          },
          default: {
            backgroundColor: 'rgba(255, 192, 203, 0.9)',
            borderRadius: 25,
            marginHorizontal: 20,
            marginBottom: 15,
            elevation: 5,
            shadowColor: '#FF69B4',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          },
        }),
      }}>
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
        name="[detail]"
        options={{
          href: null,
        }}
      />
        <Tabs.Screen
          name="Profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="person" color={color} />, // Pastikan nama "person" valid
          }}
        />
      </Tabs>
  );
}
