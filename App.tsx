import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './src/navigation/TabNavigation';
import DetailsScreen from './src/screens/DetailsScreen';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { ThemeProvider } from './src/context/ThemeContext';
import EventsScreen from './src/screens/EventsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Tabs"
              component={TabNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={{ title: 'Detalhes do Local' }}
            />
            <Stack.Screen
              name="Events"
              component={EventsScreen}
              options={{ title: 'Detalhes do evento' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </ThemeProvider>
  );
}