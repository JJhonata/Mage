import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './src/navigation/TabNavigation'; // Navegação das abas
import DetailsScreen from './src/screens/DetailsScreen'; // Tela de detalhes
import { FavoritesProvider } from './src/context/FavoritesContext'; // Contexto de favoritos
import { ThemeProvider } from './src/context/ThemeContext'; // Contexto de tema
import EventsScreen from './src/screens/EventsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider> {/* Provedor do tema */}
      <FavoritesProvider> {/* Provedor dos favoritos */}
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Tabs"
              component={TabNavigation} // Navegação com abas
              options={{ headerShown: false }} // Esconde o header da aba
            />
            <Stack.Screen
              name="Details"
              component={DetailsScreen} // Tela de detalhes
              options={{ title: 'Detalhes do Local' }} // Título da tela de detalhes
            />
            <Stack.Screen
              name="Events"
              component={EventsScreen} // Tela de eventos
              options={{ title: 'Detalhes do evento' }} // Título da tela de detalhes
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </ThemeProvider>
  );
}