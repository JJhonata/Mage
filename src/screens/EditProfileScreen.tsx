import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors } from '../theme/colors';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { db, auth } from '../services/firebaseService';
import { useNavigation } from '@react-navigation/native';

export default function EditProfileScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    if (!user) return;
    
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setNome(user.displayName || userData.nome || '');
        setEmail(user.email || '');
        setTelefone(userData.telefone || '');
        setBio(userData.bio || '');
      } else {
        // Se não existe documento, usar dados do auth
        setNome(user.displayName || '');
        setEmail(user.email || '');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados do usuário');
    } finally {
      setLoading(false);
    }
  };

  const validarNome = (nome: string) => {
    return nome.trim().length >= 2;
  };

  const validarTelefone = (telefone: string) => {
    if (!telefone.trim()) return true; // Telefone é opcional
    const regex = /^[0-9\s\(\)\-\+]+$/;
    return regex.test(telefone) && telefone.replace(/\D/g, '').length >= 10;
  };

  const handleSave = async () => {
    if (!user) return;

    // Validações
    if (!nome.trim()) {
      Alert.alert('Erro', 'O nome é obrigatório');
      return;
    }

    if (!validarNome(nome)) {
      Alert.alert('Erro', 'O nome deve ter pelo menos 2 caracteres');
      return;
    }

    if (telefone && !validarTelefone(telefone)) {
      Alert.alert('Erro', 'Telefone inválido');
      return;
    }

    setIsLoading(true);

    try {
      // Atualizar perfil no Firebase Auth
      await updateProfile(user, {
        displayName: nome.trim(),
      });

      // Atualizar dados adicionais no Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        nome: nome.trim(),
        telefone: telefone.trim() || null,
        bio: bio.trim() || null,
        dataAtualizacao: new Date(),
      });

      Alert.alert(
        'Sucesso!',
        'Perfil atualizado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o perfil. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
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
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      marginBottom: 20,
    },
    backButton: {
      padding: 8,
      marginRight: 12,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '600' as const,
      color: colors.text,
      flex: 1,
    },
    saveButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    saveButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600' as const,
    },
    form: {
      flex: 1,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '600' as const,
      color: colors.text,
      marginBottom: 8,
    },
    inputWrapper: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      backgroundColor: colors.surface,
      paddingHorizontal: 16,
    },
    input: {
      flex: 1,
      height: 50,
      fontSize: 16,
      color: colors.text,
    },
    textArea: {
      flex: 1,
      minHeight: 100,
      fontSize: 16,
      color: colors.text,
      textAlignVertical: 'top' as const,
      paddingVertical: 12,
    },
    icon: {
      marginRight: 12,
    },
    bioContainer: {
      marginBottom: 20,
    },
    bioLabel: {
      fontSize: 16,
      fontWeight: '600' as const,
      color: colors.text,
      marginBottom: 8,
    },
    bioWrapper: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      backgroundColor: colors.surface,
      paddingHorizontal: 16,
    },
    charCount: {
      fontSize: 12,
      color: colors.textSecondary,
      textAlign: 'right' as const,
      marginTop: 4,
    },
    infoContainer: {
      backgroundColor: colors.surface,
      padding: 16,
      borderRadius: 12,
      marginBottom: 20,
    },
    infoTitle: {
      fontSize: 16,
      fontWeight: '600' as const,
      color: colors.text,
      marginBottom: 8,
    },
    infoText: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
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
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Editar Perfil</Text>
        
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
          disabled={isLoading}
        >
          <Text style={styles.saveButtonText}>
            {isLoading ? 'Salvando...' : 'Salvar'}
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Informações */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Informações</Text>
            <Text style={styles.infoText}>
              Atualize suas informações pessoais. O nome será exibido em seu perfil.
            </Text>
          </View>

          {/* Formulário */}
          <View style={styles.form}>
            {/* Nome */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome completo *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons 
                  name="person-outline" 
                  size={20} 
                  color={colors.textSecondary} 
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Digite seu nome completo"
                  placeholderTextColor={colors.textTertiary}
                  value={nome}
                  onChangeText={setNome}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Email (somente leitura) */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <Ionicons 
                  name="mail-outline" 
                  size={20} 
                  color={colors.textSecondary} 
                  style={styles.icon}
                />
                <TextInput
                  style={[styles.input, { color: colors.textSecondary }]}
                  value={email}
                  editable={false}
                />
              </View>
              <Text style={styles.charCount}>
                O email não pode ser alterado
              </Text>
            </View>

            {/* Telefone */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Telefone</Text>
              <View style={styles.inputWrapper}>
                <Ionicons 
                  name="call-outline" 
                  size={20} 
                  color={colors.textSecondary} 
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="(11) 99999-9999"
                  placeholderTextColor={colors.textTertiary}
                  value={telefone}
                  onChangeText={setTelefone}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Bio */}
            <View style={styles.bioContainer}>
              <Text style={styles.bioLabel}>Sobre você</Text>
              <View style={styles.bioWrapper}>
                <TextInput
                  style={styles.textArea}
                  placeholder="Conte um pouco sobre você..."
                  placeholderTextColor={colors.textTertiary}
                  value={bio}
                  onChangeText={setBio}
                  multiline
                  maxLength={200}
                />
              </View>
              <Text style={styles.charCount}>
                {bio.length}/200 caracteres
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}