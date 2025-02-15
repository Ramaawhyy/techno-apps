import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
  screenOptions={{
    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    headerShown: false,
    tabBarButton: HapticTab,
    tabBarBackground: TabBarBackground,
    tabBarStyle: Platform.select({
      ios: {
        position: 'absolute',
        backgroundColor: 'black', // Menambahkan warna hitam di iOS
      },
      default: {
        backgroundColor: 'black', // Menambahkan warna hitam di Android dan Web
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
