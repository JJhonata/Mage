import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './src/navigation/TabNavigation';
import DetailsScreen from './src/screens/DetailsScreen';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';
import EventsScreen from './src/screens/EventsScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import { useAuth } from './src/context/AuthContext';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator 
      initialRouteName={user ? "Tabs" : "Login"}
      screenOptions={{
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
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
        name="Eventos"
        component={EventsScreen}
        options={{ title: 'Detalhes do evento' }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}