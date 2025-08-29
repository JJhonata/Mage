import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

interface LoginScreenProps {
  navigation: any;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  // Estados para campos controlados
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tentativasLogin, setTentativasLogin] = useState(0);

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

  // Função de login
  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
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

    setIsLoading(true);
    
    // Simulação de login
    setTimeout(() => {
      setIsLoading(false);
      
      // Simula sucesso no login
      if (email === 'teste@teste.com' && senha === '123456') {
        setTentativasLogin(0);
        console.log('Login bem-sucedido, navegando para Tabs...');
        nav.navigate('Tabs' as never);
      } else {
        const novasTentativas = tentativasLogin + 1;
        setTentativasLogin(novasTentativas);
        
        if (novasTentativas >= 3) {
          Alert.alert('Bloqueado', 'Muitas tentativas. Tente novamente em 5 minutos.');
          setEmail('');
          setSenha('');
        } else {
          Alert.alert('Erro', `Credenciais inválidas. Tentativa ${novasTentativas}/3`);
        }
      }
    }, 1500);
  };

  // Função para limpar campos
  const limparCampos = () => {
    setEmail('');
    setSenha('');
    setTentativasLogin(0);
  };

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      justifyContent: 'center' as const,
      paddingHorizontal: 24,
    },
    header: {
      alignItems: 'center' as const,
      marginBottom: 48,
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
      marginBottom: 24,
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
    loginButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      height: 50,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      marginBottom: 16,
      opacity: isLoading ? 0.7 : 1,
    },
    loginButtonText: {
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
    },
    clearButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600' as const,
    },
    demoInfo: {
      backgroundColor: colors.surface,
      padding: 16,
      borderRadius: 12,
      marginTop: 24,
    },
    demoTitle: {
      fontSize: 14,
      fontWeight: '600' as const,
      color: colors.text,
      marginBottom: 8,
    },
    demoText: {
      fontSize: 12,
      color: colors.textSecondary,
      lineHeight: 18,
    },
    tentativasInfo: {
      textAlign: 'center' as const,
      fontSize: 12,
      color: tentativasLogin > 0 ? '#EF4444' : colors.textSecondary,
      marginTop: 8,
    },
  };

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
        <View style={styles.content}>
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
              Faça login para acessar sua conta
            </Text>
          </View>

          {/* Formulário */}
          <View style={styles.form}>
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
            </View>

            {/* Botões */}
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.clearButton}
              onPress={limparCampos}
            >
              <Text style={styles.clearButtonText}>Limpar Campos</Text>
            </TouchableOpacity>

            {tentativasLogin > 0 && (
              <Text style={styles.tentativasInfo}>
                Tentativas de login: {tentativasLogin}/3
              </Text>
            )}
          </View>

          {/* Informações de demonstração */}
          <View style={styles.demoInfo}>
            <Text style={styles.demoTitle}>Dados para teste:</Text>
            <Text style={styles.demoText}>
              Email: teste@teste.com{'\n'}
              Senha: 123456
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}