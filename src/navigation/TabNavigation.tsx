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
      initialRouteName="Início"
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ color, size }) => {
          let iconName: any;
          if (route.name === 'Início') {
            iconName = 'home';
          } else if (route.name === 'Favoritos') {
            iconName = 'star';
          } else if (route.name === 'Eventos') {
            iconName = 'calendar';
          } else if (route.name === 'Roteiros') {
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
        // Estilo do conteúdo da tela
        contentStyle: {
          backgroundColor: colors.background,
        },
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Favoritos" component={FavoritesScreen} />
      <Tab.Screen name="Eventos" component={EventsScreen} />
      <Tab.Screen name="Roteiros" component={RoutesScreen} />
    </Tab.Navigator>
  );
}