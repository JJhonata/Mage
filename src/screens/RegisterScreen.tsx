import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebaseService';

interface RegisterScreenProps {
  navigation: any;
}

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  // Estados para campos controlados
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const nav = useNavigation();

  // Validação de email
  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validação de senha
  const validarSenha = (senha: string) => {
    return senha.length >= 6;
  };

  // Validação de nome
  const validarNome = (nome: string) => {
    return nome.trim().length >= 2;
  };

  // Função de cadastro
  const handleRegister = async () => {
    // Validações básicas
    if (!nome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (!validarNome(nome)) {
      Alert.alert('Erro', 'O nome deve ter pelo menos 2 caracteres');
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }

    if (!validarSenha(senha)) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    setIsLoading(true);

    try {
      // Criar usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Atualizar perfil do usuário
      await updateProfile(user, {
        displayName: nome.trim(),
      });

      // Salvar dados adicionais no Firestore
      await setDoc(doc(db, 'users', user.uid), {
        nome: nome.trim(),
        email: email,
        dataCriacao: new Date(),
        preferencias: {
          tema: theme,
          notificacoes: true,
        },
      });

      Alert.alert(
        'Sucesso!',
        'Conta criada com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navegação para Tabs
              nav.navigate('Tabs' as never);
            },
          },
        ]
      );

    } catch (error: any) {
      
      let mensagemErro = 'Erro ao criar conta. Tente novamente.';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          mensagemErro = 'Este email já está sendo usado.';
          break;
        case 'auth/invalid-email':
          mensagemErro = 'Email inválido.';
          break;
        case 'auth/weak-password':
          mensagemErro = 'A senha é muito fraca.';
          break;
        case 'auth/network-request-failed':
          mensagemErro = 'Erro de conexão. Verifique sua internet.';
          break;
      }
      
      Alert.alert('Erro', mensagemErro);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para limpar campos
  const limparCampos = () => {
    setNome('');
    setEmail('');
    setSenha('');
    setConfirmarSenha('');
  };

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
    },
    header: {
      alignItems: 'center' as const,
      marginTop: 40,
      marginBottom: 32,
    },
    logoContainer: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      marginBottom: 16,
    },
    logoText: {
      fontSize: 32,
      fontWeight: 'bold' as const,
      color: colors.primary,
      marginLeft: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center' as const,
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
    passwordToggle: {
      padding: 8,
    },
    registerButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      height: 50,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      marginBottom: 16,
      opacity: isLoading ? 0.7 : 1,
    },
    registerButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600' as const,
    },
    clearButton: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      height: 50,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      marginBottom: 24,
    },
    clearButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600' as const,
    },
    loginLink: {
      alignItems: 'center' as const,
      marginTop: 16,
    },
    loginLinkText: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    loginLinkButton: {
      marginTop: 8,
    },
    loginLinkButtonText: {
      fontSize: 16,
      color: colors.primary,
      fontWeight: '600' as const,
    },
    passwordStrength: {
      marginTop: 8,
    },
    strengthText: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    strengthBar: {
      height: 4,
      backgroundColor: colors.border,
      borderRadius: 2,
      marginTop: 4,
    },
    strengthFill: {
      height: '100%' as any,
      borderRadius: 2,
    },
  };

  // Calcular força da senha
  const calcularForcaSenha = (senha: string) => {
    let score = 0;
    if (senha.length >= 6) score += 1;
    if (senha.length >= 8) score += 1;
    if (/[A-Z]/.test(senha)) score += 1;
    if (/[a-z]/.test(senha)) score += 1;
    if (/[0-9]/.test(senha)) score += 1;
    if (/[^A-Za-z0-9]/.test(senha)) score += 1;
    return score;
  };

  const forcaSenha = calcularForcaSenha(senha);
  const coresForca = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'} 
        backgroundColor={colors.background} 
      />
      
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Header com logo */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <MaterialCommunityIcons 
                name="shield" 
                size={40} 
                color={colors.primary} 
              />
              <Text style={styles.logoText}>Mage</Text>
            </View>
            <Text style={styles.subtitle}>
              Crie sua conta para começar
            </Text>
          </View>

          {/* Formulário */}
          <View style={styles.form}>
            {/* Campo de nome */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome completo</Text>
              <View style={styles.inputWrapper}>
                <Ionicons 
                  name="person-outline" 
                  size={20} 
                  color={colors.textSecondary} 
                  style={{ marginRight: 12 }}
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
                {nome.length > 0 && (
                  <TouchableOpacity onPress={() => setNome('')}>
                    <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Campo de email */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <Ionicons 
                  name="mail-outline" 
                  size={20} 
                  color={colors.textSecondary} 
                  style={{ marginRight: 12 }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Digite seu email"
                  placeholderTextColor={colors.textTertiary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {email.length > 0 && (
                  <TouchableOpacity onPress={() => setEmail('')}>
                    <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Campo de senha */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Senha</Text>
              <View style={styles.inputWrapper}>
                <Ionicons 
                  name="lock-closed-outline" 
                  size={20} 
                  color={colors.textSecondary} 
                  style={{ marginRight: 12 }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Digite sua senha"
                  placeholderTextColor={colors.textTertiary}
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry={!mostrarSenha}
                  autoCapitalize="none"
                />
                <TouchableOpacity 
                  style={styles.passwordToggle}
                  onPress={() => setMostrarSenha(!mostrarSenha)}
                >
                  <Ionicons 
                    name={mostrarSenha ? "eye-off" : "eye"} 
                    size={20} 
                    color={colors.textSecondary} 
                  />
                </TouchableOpacity>
              </View>
              
              {/* Indicador de força da senha */}
              {senha.length > 0 && (
                <View style={styles.passwordStrength}>
                  <Text style={styles.strengthText}>
                    Força da senha: {forcaSenha === 0 ? 'Muito fraca' : 
                                   forcaSenha <= 2 ? 'Fraca' : 
                                   forcaSenha <= 4 ? 'Média' : 'Forte'}
                  </Text>
                  <View style={styles.strengthBar}>
                    <View 
                      style={[
                        styles.strengthFill, 
                        { 
                          width: `${(forcaSenha / 6) * 100}%`,
                          backgroundColor: coresForca[forcaSenha] || colors.border
                        }
                      ]} 
                    />
                  </View>
                </View>
              )}
            </View>

            {/* Campo de confirmar senha */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirmar senha</Text>
              <View style={styles.inputWrapper}>
                <Ionicons 
                  name="lock-closed-outline" 
                  size={20} 
                  color={colors.textSecondary} 
                  style={{ marginRight: 12 }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirme sua senha"
                  placeholderTextColor={colors.textTertiary}
                  value={confirmarSenha}
                  onChangeText={setConfirmarSenha}
                  secureTextEntry={!mostrarConfirmarSenha}
                  autoCapitalize="none"
                />
                <TouchableOpacity 
                  style={styles.passwordToggle}
                  onPress={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                >
                  <Ionicons 
                    name={mostrarConfirmarSenha ? "eye-off" : "eye"} 
                    size={20} 
                    color={colors.textSecondary} 
                  />
                </TouchableOpacity>
              </View>
              
              {/* Validação de confirmação de senha */}
              {confirmarSenha.length > 0 && (
                <Text style={[
                  styles.strengthText, 
                  { color: senha === confirmarSenha ? '#10B981' : '#EF4444' }
                ]}>
                  {senha === confirmarSenha ? '✓ Senhas coincidem' : '✗ Senhas não coincidem'}
                </Text>
              )}
            </View>

            {/* Botões */}
            <TouchableOpacity 
              style={styles.registerButton}
              onPress={handleRegister}
              disabled={isLoading}
            >
              <Text style={styles.registerButtonText}>
                {isLoading ? 'Criando conta...' : 'Criar conta'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.clearButton}
              onPress={limparCampos}
            >
              <Text style={styles.clearButtonText}>Limpar Campos</Text>
            </TouchableOpacity>

            {/* Link para login */}
            <View style={styles.loginLink}>
              <Text style={styles.loginLinkText}>Já tem uma conta?</Text>
              <TouchableOpacity 
                style={styles.loginLinkButton}
                onPress={() => nav.goBack()}
              >
                <Text style={styles.loginLinkButtonText}>Fazer login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}