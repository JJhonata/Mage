import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../styles/homeStyles';
import CardLugar from '../components/CardLugar';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors } from '../theme/colors';
import { LibrasButton } from '../components/LibrasButton';
import { StateDisplay } from '../components/StateDisplay';

type NivelSeguranca = 'Alto' | 'Médio' | 'Baixo';

type Lugar = {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  nivelSeguranca: NivelSeguranca;
  distancia: string;
  tipo: string;
};

// Dados mockados de pontos turísticos próximos
const lugaresProximos: Lugar[] = [
  {
    id: '1',
    nome: 'Praia do Futuro',
    descricao: 'Uma das praias mais famosas de Fortaleza, com excelente infraestrutura turística.',
    imagem: 'https://source.unsplash.com/random/400x250?beach',
    nivelSeguranca: 'Alto',
    distancia: '2.5 km',
    tipo: 'Praia',
  },
  {
    id: '2',
    nome: 'Centro Dragão do Mar',
    descricao: 'Complexo cultural com museus, teatro e espaços de lazer.',
    imagem: 'https://source.unsplash.com/random/400x250?museum',
    nivelSeguranca: 'Alto',
    distancia: '1.8 km',
    tipo: 'Cultural',
  },
  {
    id: '3',
    nome: 'Mercado Central',
    descricao: 'Tradicional mercado com artesanato local e gastronomia regional.',
    imagem: 'https://source.unsplash.com/random/400x250?market',
    nivelSeguranca: 'Médio',
    distancia: '3.2 km',
    tipo: 'Comércio',
  },
  {
    id: '4',
    nome: 'Parque do Cocó',
    descricao: 'Maior parque urbano da América Latina, ideal para caminhadas.',
    imagem: 'https://source.unsplash.com/random/400x250?park',
    nivelSeguranca: 'Alto',
    distancia: '4.1 km',
    tipo: 'Natureza',
  },
  {
    id: '5',
    nome: 'Beira-Mar',
    descricao: 'Avenida à beira-mar com ciclovia e área de lazer.',
    imagem: 'https://source.unsplash.com/random/400x250?seaside',
    nivelSeguranca: 'Alto',
    distancia: '1.2 km',
    tipo: 'Lazer',
  },
];

export default function HomeScreen() {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState<'Todos' | NivelSeguranca>('Todos');
  const { width } = Dimensions.get('window');
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  // Filtra lugares baseado na busca e filtro de segurança
  const lugaresFiltrados = useMemo(() => {
    return lugaresProximos.filter((lugar) => {
      const nomeCorresponde = lugar.nome
        .toLowerCase()
        .includes(busca.toLowerCase());

      const nivelCorresponde =
        filtro === 'Todos' ? true : lugar.nivelSeguranca === filtro;

      return nomeCorresponde && nivelCorresponde;
    });
  }, [busca, filtro]);

  // Função para obter cor do indicador de segurança
  const getSecurityColor = (nivel: NivelSeguranca) => {
    switch (nivel) {
      case 'Alto':
        return '#10B981'; // Verde
      case 'Médio':
        return '#F59E0B'; // Amarelo
      case 'Baixo':
        return '#EF4444'; // Vermelho
      default:
        return '#6B7280';
    }
  };

  // Função para obter ícone de segurança
  const getSecurityIcon = (nivel: NivelSeguranca) => {
    switch (nivel) {
      case 'Alto':
        return 'shield-check';
      case 'Médio':
        return 'shield-half-full';
      case 'Baixo':
        return 'shield-alert';
      default:
        return 'shield';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'} 
        backgroundColor={colors.background} 
      />
      
      {/* Header com logo e saudação */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons 
            name="shield" 
            size={32} 
            color={colors.primary} 
          />
          <Text style={[styles.logoText, { color: colors.text }]}>Mage</Text>
        </View>
        <View style={styles.greetingContainer}>
          <Text style={[styles.greetingText, { color: colors.text }]}>Bem-vindo!</Text>
          <Text style={[styles.subtitleText, { color: colors.textSecondary }]}>
            Descubra lugares seguros para visitar
          </Text>
        </View>
        <LibrasButton />
      </View>

      {/* Campo de busca */}
      <View style={[styles.searchContainer, { backgroundColor: colors.searchBackground }]}>
        <Ionicons
          name="search"
          size={20}
          color={colors.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Buscar pontos turísticos..."
          placeholderTextColor={colors.textTertiary}
          value={busca}
          onChangeText={setBusca}
        />
        {busca.length > 0 && (
          <TouchableOpacity
            onPress={() => setBusca('')}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filtros de segurança */}
      <View style={styles.filterContainer}>
        <Text style={[styles.filterTitle, { color: colors.text }]}>Filtrar por segurança:</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {['Todos', 'Alto', 'Médio', 'Baixo'].map((nivel) => (
            <TouchableOpacity
              key={nivel}
              onPress={() => setFiltro(nivel as any)}
              style={[
                styles.filterButton,
                { backgroundColor: filtro === nivel ? colors.filterActive : colors.filterInactive },
                filtro === nivel && styles.filterButtonActive
              ]}
            >
              <MaterialCommunityIcons
                name={getSecurityIcon(nivel as NivelSeguranca)}
                size={16}
                color={filtro === nivel ? '#FFFFFF' : getSecurityColor(nivel as NivelSeguranca)}
                style={styles.filterIcon}
              />
              <Text style={[
                styles.filterText,
                { color: filtro === nivel ? '#FFFFFF' : colors.textSecondary },
                filtro === nivel && styles.filterTextActive
              ]}>
                {nivel}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Seção de pontos turísticos */}
      <View style={styles.contentContainer}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Pontos Turísticos Próximos</Text>
          <Text style={[styles.resultsCount, { color: colors.textSecondary }]}>
            {lugaresFiltrados.length} {lugaresFiltrados.length === 1 ? 'lugar' : 'lugares'} encontrado{lugaresFiltrados.length === 1 ? '' : 's'}
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {lugaresFiltrados.length === 0 ? (
            <StateDisplay
              type="empty"
              title="Nenhum lugar encontrado"
              message="Tente ajustar os filtros ou a busca"
            />
          ) : (
            lugaresFiltrados.map((lugar) => (
              <CardLugar 
                key={lugar.id} 
                {...lugar}
                securityColor={getSecurityColor(lugar.nivelSeguranca)}
                securityIcon={getSecurityIcon(lugar.nivelSeguranca)}
              />
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}