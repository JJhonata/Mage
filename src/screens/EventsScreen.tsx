import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  Image, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getThemeColors } from '../theme/colors';
import { StateDisplay } from '../components/StateDisplay';

type Evento = {
  id: string;
  nome: string;
  descricao: string;
  data: string;
  horario: string;
  local: string;
  tipo: string;
  imagem: string;
  nivelSeguranca: 'Alto' | 'Médio' | 'Baixo';
  preco: string;
};

// Dados mockados de eventos
const eventos: Evento[] = [
  {
    id: '1',
    nome: 'Festival de Cultura Local',
    descricao: 'Uma celebração da rica cultura de Fortaleza com música, dança e gastronomia local.',
    data: '15 Dez 2024',
    horario: '18:00',
    local: 'Centro Cultural Dragão do Mar',
    tipo: 'Cultural',
    imagem: 'https://source.unsplash.com/random/400x250?festival',
    nivelSeguranca: 'Alto',
    preco: 'Gratuito',
  },
  {
    id: '2',
    nome: 'Feira Gastronômica da Praia',
    descricao: 'Experimente os melhores sabores da culinária cearense à beira-mar.',
    data: '20 Dez 2024',
    horario: '12:00',
    local: 'Praia do Futuro',
    tipo: 'Gastronomia',
    imagem: 'https://source.unsplash.com/random/400x250?food',
    nivelSeguranca: 'Alto',
    preco: 'A partir de R$ 15',
  },
  {
    id: '3',
    nome: 'Show ao Pôr do Sol',
    descricao: 'Música ao vivo com vista para o mar no melhor horário do dia.',
    data: '25 Dez 2024',
    horario: '17:30',
    local: 'Beira-Mar',
    tipo: 'Música',
    imagem: 'https://source.unsplash.com/random/400x250?sunset',
    nivelSeguranca: 'Alto',
    preco: 'R$ 25',
  },
  {
    id: '4',
    nome: 'Cine ao Ar Livre',
    descricao: 'Filmes clássicos e contemporâneos em ambiente ao ar livre.',
    data: '28 Dez 2024',
    horario: '19:00',
    local: 'Parque do Cocó',
    tipo: 'Cinema',
    imagem: 'https://source.unsplash.com/random/400x250?cinema',
    nivelSeguranca: 'Alto',
    preco: 'Gratuito',
  },
  {
    id: '5',
    nome: 'Feira de Artesanato',
    descricao: 'Produtos artesanais únicos feitos por artesãos locais.',
    data: '30 Dez 2024',
    horario: '14:00',
    local: 'Mercado Central',
    tipo: 'Artesanato',
    imagem: 'https://source.unsplash.com/random/400x250?craft',
    nivelSeguranca: 'Médio',
    preco: 'Entrada gratuita',
  },
];

export default function EventsScreen() {
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string>('Todos');
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  // Filtra eventos baseado na busca e tipo
  const eventosFiltrados = useMemo(() => {
    return eventos.filter((evento) => {
      const nomeCorresponde = evento.nome
        .toLowerCase()
        .includes(busca.toLowerCase());
      
      const tipoCorresponde = filtroTipo === 'Todos' || evento.tipo === filtroTipo;

      return nomeCorresponde && tipoCorresponde;
    });
  }, [busca, filtroTipo]);

  // Função para obter cor do indicador de segurança
  const getSecurityColor = (nivel: string) => {
    switch (nivel) {
      case 'Alto':
        return colors.success;
      case 'Médio':
        return colors.warning;
      case 'Baixo':
        return colors.danger;
      default:
        return colors.textSecondary;
    }
  };

  // Função para obter ícone de segurança
  const getSecurityIcon = (nivel: string) => {
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

  // Tipos únicos de eventos
  const tiposUnicos = ['Todos', ...Array.from(new Set(eventos.map(e => e.tipo)))];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'} 
        backgroundColor={colors.background} 
      />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <MaterialCommunityIcons 
            name="calendar-star" 
            size={28} 
            color={colors.primary} 
          />
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Eventos Locais
          </Text>
        </View>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          Descubra eventos seguros próximos
        </Text>
      </View>

      {/* Campo de busca */}
      <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Ionicons 
          name="search" 
          size={20} 
          color={colors.textSecondary} 
          style={styles.searchIcon} 
        />
        <TextInput
          placeholder="Buscar eventos..."
          placeholderTextColor={colors.textTertiary}
          value={busca}
          onChangeText={setBusca}
          style={[styles.searchInput, { color: colors.text }]}
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

      {/* Filtros por tipo */}
      <View style={styles.filterContainer}>
        <Text style={[styles.filterTitle, { color: colors.text }]}>
          Filtrar por tipo:
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {tiposUnicos.map((tipo) => (
            <TouchableOpacity
              key={tipo}
              onPress={() => setFiltroTipo(tipo)}
              style={[
                styles.filterButton,
                { backgroundColor: colors.card, borderColor: colors.border },
                filtroTipo === tipo && { backgroundColor: colors.primary, borderColor: colors.primary }
              ]}
            >
              <Text style={[
                styles.filterText,
                { color: colors.text },
                filtroTipo === tipo && styles.filterTextActive
              ]}>
                {tipo}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Lista de eventos */}
      <View style={styles.contentContainer}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Eventos Encontrados
          </Text>
          <Text style={[styles.resultsCount, { color: colors.textSecondary }]}>
            {eventosFiltrados.length} {eventosFiltrados.length === 1 ? 'evento' : 'eventos'}
          </Text>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {eventosFiltrados.length === 0 ? (
            <StateDisplay
              type="empty"
              title="Nenhum evento encontrado"
              message="Tente ajustar os filtros ou a busca"
            />
          ) : (
            eventosFiltrados.map((evento) => (
              <View 
                key={evento.id} 
                style={[styles.eventCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <Image 
                  source={{ uri: evento.imagem }} 
                  style={styles.eventImage}
                  resizeMode="cover"
                />
                
                <View style={styles.eventContent}>
                  {/* Header do evento */}
                  <View style={styles.eventHeader}>
                    <View style={styles.eventTitleContainer}>
                      <Text style={[styles.eventTitle, { color: colors.text }]} numberOfLines={2}>
                        {evento.nome}
                      </Text>
                      <View style={styles.eventMeta}>
                        <MaterialCommunityIcons name="map-marker" size={14} color={colors.textSecondary} />
                        <Text style={[styles.eventLocation, { color: colors.textSecondary }]} numberOfLines={1}>
                          {evento.local}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={[styles.securityIndicator, { backgroundColor: colors.borderLight, borderColor: colors.border }]}>
                      <MaterialCommunityIcons
                        name={getSecurityIcon(evento.nivelSeguranca) as any}
                        size={16}
                        color={getSecurityColor(evento.nivelSeguranca)}
                      />
                      <Text style={[styles.securityText, { color: getSecurityColor(evento.nivelSeguranca) }]}>
                        {evento.nivelSeguranca}
                      </Text>
                    </View>
                  </View>

                  {/* Descrição */}
                  <Text style={[styles.eventDescription, { color: colors.textSecondary }]} numberOfLines={2}>
                    {evento.descricao}
                  </Text>

                  {/* Informações do evento */}
                  <View style={styles.eventInfo}>
                    <View style={styles.eventInfoItem}>
                      <MaterialCommunityIcons name="calendar" size={16} color={colors.primary} />
                      <Text style={[styles.eventInfoText, { color: colors.text }]}>
                        {evento.data}
                      </Text>
                    </View>
                    
                    <View style={styles.eventInfoItem}>
                      <MaterialCommunityIcons name="clock" size={16} color={colors.success} />
                      <Text style={[styles.eventInfoText, { color: colors.text }]}>
                        {evento.horario}
                      </Text>
                    </View>
                    
                    <View style={styles.eventInfoItem}>
                      <MaterialCommunityIcons name="currency-usd" size={16} color={colors.warning} />
                      <Text style={[styles.eventInfoText, { color: colors.text }]}>
                        {evento.preco}
                      </Text>
                    </View>
                  </View>

                  {/* Tipo do evento */}
                  <View style={[styles.eventTypeContainer, { backgroundColor: colors.borderLight }]}>
                    <Text style={[styles.eventTypeText, { color: colors.primary }]}>{evento.tipo}</Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // Header
  header: {
    paddingVertical: 20,
    paddingTop: 10,
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  headerSubtitle: {
    fontSize: 14,
    marginLeft: 36,
  },

  // Campo de busca
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  searchIcon: {
    marginRight: 12,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },

  clearButton: {
    padding: 4,
  },

  // Filtros
  filterContainer: {
    marginBottom: 24,
  },

  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },

  filterScroll: {
    paddingRight: 16,
  },

  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  filterButtonActive: {
    backgroundColor: '#1E40AF',
    borderColor: '#1E40AF',
  },

  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },

  filterTextActive: {
    color: '#FFFFFF',
  },

  // Conteúdo principal
  contentContainer: {
    flex: 1,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  resultsCount: {
    fontSize: 14,
  },

  scrollContent: {
    paddingBottom: 20,
  },

  // Estado vazio
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },

  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },

  // Card de evento
  eventCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },

  eventImage: {
    width: '100%',
    height: 160,
  },

  eventContent: {
    padding: 16,
  },

  eventHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  eventTitleContainer: {
    flex: 1,
    marginRight: 12,
  },

  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    lineHeight: 24,
  },

  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  eventLocation: {
    fontSize: 13,
    marginLeft: 4,
    flex: 1,
  },

  securityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  securityText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },

  eventDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },

  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  eventInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },

  eventInfoText: {
    fontSize: 13,
    marginLeft: 4,
  },

  eventTypeContainer: {
    alignSelf: 'flex-start',
  },

  eventTypeText: {
    fontSize: 10,
    color: '#1E40AF',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    fontWeight: '500',
  },
});