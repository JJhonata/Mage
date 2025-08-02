import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { BotaoTema } from '../components/BotaoTema';
import { getThemeColors } from '../theme/colors';

// Importando as telas
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import EventsScreen from '../screens/EventsScreen';
import RoutesScreen from '../screens/RoutesScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ color, size }) => {
          let iconName: any;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Favorites') {
            iconName = 'star';
          } else if (route.name === 'Events') {
            iconName = 'calendar';
          } else if (route.name === 'Routes') {
            iconName = 'map';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerRight: () => <BotaoTema />,
        // Estilo de header de acordo com o tema atual
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        // Estilo da tab bar
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Routes" component={RoutesScreen} />
    </Tab.Navigator>
  );
}