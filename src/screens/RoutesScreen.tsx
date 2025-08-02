import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';

type Roteiro = {
  id: string;
  nome: string;
  descricao: string;
  lugares: number;
  duracao: string;
  distancia: string;
  nivelSeguranca: 'Alto' | 'Médio' | 'Baixo';
  imagem: string;
  favorito: boolean;
};

// Dados mockados de roteiros
const roteirosMockados: Roteiro[] = [
  {
    id: '1',
    nome: 'Roteiro Cultural',
    descricao: 'Explore a rica cultura de Fortaleza visitando museus, centros culturais e pontos históricos.',
    lugares: 4,
    duracao: '4 horas',
    distancia: '8.5 km',
    nivelSeguranca: 'Alto',
    imagem: 'https://source.unsplash.com/random/400x250?museum',
    favorito: true,
  },
  {
    id: '2',
    nome: 'Roteiro Praia e Sol',
    descricao: 'Disfrute das melhores praias de Fortaleza com segurança e conforto.',
    lugares: 3,
    duracao: '6 horas',
    distancia: '12.2 km',
    nivelSeguranca: 'Alto',
    imagem: 'https://source.unsplash.com/random/400x250?beach',
    favorito: false,
  },
  {
    id: '3',
    nome: 'Roteiro Gastronômico',
    descricao: 'Descubra os sabores autênticos da culinária cearense em locais seguros.',
    lugares: 5,
    duracao: '3 horas',
    distancia: '6.8 km',
    nivelSeguranca: 'Alto',
    imagem: 'https://source.unsplash.com/random/400x250?food',
    favorito: true,
  },
  {
    id: '4',
    nome: 'Roteiro Noturno',
    descricao: 'Viva a noite de Fortaleza com segurança em locais selecionados.',
    lugares: 3,
    duracao: '4 horas',
    distancia: '5.4 km',
    nivelSeguranca: 'Médio',
    imagem: 'https://source.unsplash.com/random/400x250?night',
    favorito: false,
  },
];

export default function RoutesScreen() {
  const [roteiros, setRoteiros] = useState<Roteiro[]>(roteirosMockados);
  const [filtroSeguranca, setFiltroSeguranca] = useState<'Todos' | 'Alto' | 'Médio' | 'Baixo'>('Todos');
  const { favoritos } = useFavorites();
  const { theme } = useTheme();

  // Filtra roteiros baseado no nível de segurança
  const roteirosFiltrados = roteiros.filter(roteiro => 
    filtroSeguranca === 'Todos' || roteiro.nivelSeguranca === filtroSeguranca
  );

  // Função para obter cor do indicador de segurança
  const getSecurityColor = (nivel: string) => {
    switch (nivel) {
      case 'Alto':
        return '#10B981';
      case 'Médio':
        return '#F59E0B';
      case 'Baixo':
        return '#EF4444';
      default:
        return '#6B7280';
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

  const toggleFavorito = (id: string) => {
    setRoteiros(prev => 
      prev.map(roteiro => 
        roteiro.id === id 
          ? { ...roteiro, favorito: !roteiro.favorito }
          : roteiro
      )
    );
  };

  const criarRoteiroPersonalizado = () => {
    // Simular criação de roteiro personalizado
    const novoRoteiro: Roteiro = {
      id: Date.now().toString(),
      nome: 'Meu Roteiro Personalizado',
      descricao: `Roteiro criado com ${favoritos.length} lugares dos seus favoritos.`,
      lugares: favoritos.length,
      duracao: '3 horas',
      distancia: '5.2 km',
      nivelSeguranca: 'Alto',
      imagem: 'https://source.unsplash.com/random/400x250?route',
      favorito: false,
    };
    setRoteiros(prev => [novoRoteiro, ...prev]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <MaterialCommunityIcons 
            name="map-marker-path" 
            size={28} 
            color="#1E40AF" 
          />
          <Text style={styles.headerTitle}>Roteiros</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Descubra roteiros seguros e personalizados
        </Text>
      </View>

      {/* Botão criar roteiro personalizado */}
      {favoritos.length > 0 && (
        <TouchableOpacity
          style={styles.createRouteButton}
          onPress={criarRoteiroPersonalizado}
        >
          <MaterialCommunityIcons 
            name="plus-circle" 
            size={20} 
            color="#FFFFFF" 
          />
          <Text style={styles.createRouteText}>
            Criar Roteiro Personalizado
          </Text>
        </TouchableOpacity>
      )}

      {/* Filtros de segurança */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filtrar por segurança:</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {['Todos', 'Alto', 'Médio', 'Baixo'].map((nivel) => (
            <TouchableOpacity
              key={nivel}
              onPress={() => setFiltroSeguranca(nivel as any)}
              style={[
                styles.filterButton,
                filtroSeguranca === nivel && styles.filterButtonActive
              ]}
            >
              <MaterialCommunityIcons
                name={getSecurityIcon(nivel as any)}
                size={16}
                color={filtroSeguranca === nivel ? '#FFFFFF' : getSecurityColor(nivel as any)}
                style={styles.filterIcon}
              />
              <Text style={[
                styles.filterText,
                filtroSeguranca === nivel && styles.filterTextActive
              ]}>
                {nivel}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Lista de roteiros */}
      <View style={styles.contentContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Roteiros Disponíveis</Text>
          <Text style={styles.resultsCount}>
            {roteirosFiltrados.length} {roteirosFiltrados.length === 1 ? 'roteiro' : 'roteiros'} encontrado{roteirosFiltrados.length === 1 ? '' : 's'}
          </Text>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {roteirosFiltrados.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons
                name="map-marker-off"
                size={64}
                color="#9CA3AF"
              />
              <Text style={styles.emptyTitle}>Nenhum roteiro encontrado</Text>
              <Text style={styles.emptySubtitle}>
                Tente ajustar os filtros ou criar um roteiro personalizado
              </Text>
            </View>
          ) : (
            roteirosFiltrados.map((roteiro) => (
              <TouchableOpacity
                key={roteiro.id}
                style={styles.routeCard}
                activeOpacity={0.9}
              >
                <View style={styles.routeImageContainer}>
                  <MaterialCommunityIcons
                    name="map-marker-path"
                    size={24}
                    color="#FFFFFF"
                    style={styles.routeIcon}
                  />
                </View>
                
                <View style={styles.routeContent}>
                  {/* Header do roteiro */}
                  <View style={styles.routeHeader}>
                    <View style={styles.routeTitleContainer}>
                      <Text style={styles.routeTitle} numberOfLines={1}>
                        {roteiro.nome}
                      </Text>
                      <Text style={styles.routeDescription} numberOfLines={2}>
                        {roteiro.descricao}
                      </Text>
                    </View>
                    
                    <TouchableOpacity
                      onPress={() => toggleFavorito(roteiro.id)}
                      style={styles.favoriteButton}
                    >
                      <Ionicons
                        name={roteiro.favorito ? 'heart' : 'heart-outline'}
                        size={20}
                        color={roteiro.favorito ? '#EF4444' : '#6B7280'}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Informações do roteiro */}
                  <View style={styles.routeInfo}>
                    <View style={styles.routeInfoItem}>
                      <MaterialCommunityIcons name="map-marker" size={14} color="#1E40AF" />
                      <Text style={styles.routeInfoText}>{roteiro.lugares} lugares</Text>
                    </View>
                    
                    <View style={styles.routeInfoItem}>
                      <MaterialCommunityIcons name="clock" size={14} color="#10B981" />
                      <Text style={styles.routeInfoText}>{roteiro.duracao}</Text>
                    </View>
                    
                    <View style={styles.routeInfoItem}>
                      <MaterialCommunityIcons name="road" size={14} color="#F59E0B" />
                      <Text style={styles.routeInfoText}>{roteiro.distancia}</Text>
                    </View>
                  </View>

                  {/* Indicador de segurança */}
                  <View style={styles.securityContainer}>
                    <View style={styles.securityIndicator}>
                      <MaterialCommunityIcons
                        name={getSecurityIcon(roteiro.nivelSeguranca) as any}
                        size={16}
                        color={getSecurityColor(roteiro.nivelSeguranca)}
                      />
                      <Text style={[styles.securityText, { color: getSecurityColor(roteiro.nivelSeguranca) }]}>
                        Segurança {roteiro.nivelSeguranca}
                      </Text>
                    </View>
                    
                    <TouchableOpacity style={styles.startRouteButton}>
                      <Text style={styles.startRouteText}>Iniciar Roteiro</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
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
    backgroundColor: '#F8FAFC',
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
    color: '#1F2937',
    marginLeft: 8,
  },

  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 36,
  },

  // Botão criar roteiro
  createRouteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E40AF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
    justifyContent: 'center',
  },

  createRouteText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },

  // Filtros
  filterContainer: {
    marginBottom: 24,
  },

  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },

  filterScroll: {
    paddingRight: 16,
  },

  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
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

  filterIcon: {
    marginRight: 6,
  },

  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
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
    color: '#1F2937',
  },

  resultsCount: {
    fontSize: 14,
    color: '#6B7280',
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
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },

  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },

  // Card de roteiro
  routeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },

  routeImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  routeIcon: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  routeContent: {
    flex: 1,
  },

  routeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  routeTitleContainer: {
    flex: 1,
    marginRight: 12,
  },

  routeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },

  routeDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  favoriteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },

  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  routeInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },

  routeInfoText: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 4,
  },

  securityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  securityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  securityText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },

  startRouteButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },

  startRouteText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});