import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors } from '../theme/colors';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../services/firebaseService';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';

export default function ProfileScreen() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  // Recarregar dados quando voltar da tela de edição
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserData();
    });

    return unsubscribe;
  }, [navigation]);

  const loadUserData = async () => {
    if (!user) return;
    
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
        setNotificationsEnabled(userDoc.data().preferencias?.notificacoes || true);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            // Tentar logout do Firebase (sem aguardar)
            signOut(auth);
            
            // Múltiplas tentativas de navegação
            navigation.navigate('Login' as never);
            
            // Tentar reset também
            setTimeout(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' as never }],
              });
            }, 100);
            
            setTimeout(() => {
              navigation.navigate('Login' as never);
            }, 500);
            
            setTimeout(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' as never }],
              });
            }, 1000);
          },
        },
      ]
    );
  };

  const updateNotifications = async (enabled: boolean) => {
    if (!user) return;
    
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        'preferencias.notificacoes': enabled,
      });
      setNotificationsEnabled(enabled);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar as configurações');
    }
  };

  const updateTheme = async (newTheme: 'light' | 'dark') => {
    if (!user) return;
    
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        'preferencias.tema': newTheme,
      });
    } catch (error) {
    }
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    toggleTheme();
    updateTheme(newTheme);
  };

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    header: {
      alignItems: 'center' as const,
      paddingVertical: 30,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      marginBottom: 20,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      marginBottom: 16,
    },
    avatarText: {
      fontSize: 32,
      fontWeight: 'bold' as const,
      color: '#FFFFFF',
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold' as const,
      color: colors.text,
      marginBottom: 8,
    },
    email: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600' as const,
      color: colors.text,
      marginBottom: 16,
    },
    menuItem: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: colors.surface,
      borderRadius: 12,
      marginBottom: 12,
    },
    menuIcon: {
      marginRight: 16,
    },
    menuText: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
    },
    menuValue: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    switch: {
      marginLeft: 16,
    },
    logoutButton: {
      backgroundColor: '#EF4444',
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center' as const,
      marginTop: 20,
    },
    logoutText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600' as const,
    },
    statsContainer: {
      flexDirection: 'row' as const,
      justifyContent: 'space-around' as const,
      marginBottom: 24,
    },
    statItem: {
      alignItems: 'center' as const,
      backgroundColor: colors.surface,
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 12,
      flex: 1,
      marginHorizontal: 4,
    },
    statNumber: {
      fontSize: 24,
      fontWeight: 'bold' as const,
      color: colors.primary,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      textAlign: 'center' as const,
    },
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: colors.text }}>Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'} 
        backgroundColor={colors.background} 
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header com avatar e informações */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
          <Text style={styles.name}>
            {user?.displayName || 'Usuário'}
          </Text>
          <Text style={styles.email}>
            {user?.email}
          </Text>
        </View>

        {/* Estatísticas */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Locais Visitados</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Favoritos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Roteiros</Text>
          </View>
        </View>

        {/* Configurações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons 
              name="moon-outline" 
              size={24} 
              color={colors.textSecondary} 
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Tema Escuro</Text>
            <Switch
              value={theme === 'dark'}
              onValueChange={handleThemeToggle}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={theme === 'dark' ? '#FFFFFF' : '#FFFFFF'}
              style={styles.switch}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons 
              name="notifications-outline" 
              size={24} 
              color={colors.textSecondary} 
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Notificações</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={updateNotifications}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={notificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
              style={styles.switch}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('EditProfile' as never)}
          >
            <Ionicons 
              name="person-outline" 
              size={24} 
              color={colors.textSecondary} 
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Editar Perfil</Text>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={colors.textSecondary} 
            />
          </TouchableOpacity>
        </View>

        {/* Ajuda e Suporte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ajuda e Suporte</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons 
              name="help-circle-outline" 
              size={24} 
              color={colors.textSecondary} 
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Central de Ajuda</Text>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={colors.textSecondary} 
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons 
              name="mail-outline" 
              size={24} 
              color={colors.textSecondary} 
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Contatar Suporte</Text>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={colors.textSecondary} 
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons 
              name="information-circle-outline" 
              size={24} 
              color={colors.textSecondary} 
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Sobre o App</Text>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={colors.textSecondary} 
            />
          </TouchableOpacity>
        </View>

        {/* Botão de Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}