import React, { useState } from 'react';
import { 
  SafeAreaView, 
  Text, 
  ScrollView, 
  View, 
  TouchableOpacity, 
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';
import CardLugar from '../components/CardLugar';

export default function FavoritesScreen() {
  const { favoritos, removerFavorito } = useFavorites();
  const { theme } = useTheme();
  const [showCreateRoute, setShowCreateRoute] = useState(false);

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

  const handleCreateRoute = () => {
    setShowCreateRoute(true);
    // Simular criação de roteiro
    setTimeout(() => {
      setShowCreateRoute(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <MaterialCommunityIcons 
            name="heart" 
            size={28} 
            color="#EF4444" 
          />
          <Text style={styles.headerTitle}>Meus Favoritos</Text>
        </View>
        
        {favoritos.length > 0 && (
          <TouchableOpacity
            style={styles.createRouteButton}
            onPress={handleCreateRoute}
            disabled={showCreateRoute}
          >
            <MaterialCommunityIcons 
              name="map-marker-path" 
              size={20} 
              color="#FFFFFF" 
            />
            <Text style={styles.createRouteText}>
              {showCreateRoute ? 'Criando...' : 'Criar Roteiro'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Conteúdo principal */}
      <View style={styles.content}>
        {favoritos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="heart-outline"
              size={80}
              color="#D1D5DB"
            />
            <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
            <Text style={styles.emptySubtitle}>
              Adicione lugares aos seus favoritos para criar roteiros personalizados
            </Text>
            
            <View style={styles.emptyActions}>
              <TouchableOpacity style={styles.exploreButton}>
                <MaterialCommunityIcons 
                  name="map-search" 
                  size={20} 
                  color="#1E40AF" 
                />
                <Text style={styles.exploreButtonText}>Explorar Lugares</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            {/* Estatísticas */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{favoritos.length}</Text>
                <Text style={styles.statLabel}>Lugares</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {favoritos.filter(f => f.nivelSeguranca === 'Alto').length}
                </Text>
                <Text style={styles.statLabel}>Seguros</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {favoritos.filter(f => f.nivelSeguranca === 'Médio').length}
                </Text>
                <Text style={styles.statLabel}>Atenção</Text>
              </View>
            </View>

            {/* Lista de favoritos */}
            <View style={styles.favoritesSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Lugares Favoritos</Text>
                <Text style={styles.sectionSubtitle}>
                  {favoritos.length} {favoritos.length === 1 ? 'lugar' : 'lugares'} salvos
                </Text>
              </View>

              <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                {favoritos.map((lugar, index) => (
                  <View key={`${lugar.nome}-${index}`} style={styles.favoriteItem}>
                    <CardLugar 
                      {...lugar}
                      id={index.toString()}
                      distancia="Favorito"
                      tipo="Favorito"
                      securityColor={getSecurityColor(lugar.nivelSeguranca)}
                      securityIcon={getSecurityIcon(lugar.nivelSeguranca)}
                    />
                    
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removerFavorito(lugar)}
                    >
                      <Ionicons name="trash-outline" size={20} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* Sugestão de roteiro */}
            {favoritos.length >= 2 && (
              <View style={styles.routeSuggestion}>
                <View style={styles.suggestionContent}>
                  <MaterialCommunityIcons 
                    name="lightbulb-outline" 
                    size={24} 
                    color="#F59E0B" 
                  />
                  <View style={styles.suggestionText}>
                    <Text style={styles.suggestionTitle}>Dica de Roteiro</Text>
                    <Text style={styles.suggestionSubtitle}>
                      Você tem {favoritos.length} lugares favoritos. Que tal criar um roteiro personalizado?
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.suggestionButton}>
                  <Text style={styles.suggestionButtonText}>Criar Roteiro</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // Header com flexbox
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 12,
  },

  createRouteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E40AF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  createRouteText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },

  // Conteúdo principal
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // Estado vazio
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },

  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 20,
  },

  emptyActions: {
    alignItems: 'center',
  },

  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },

  exploreButtonText: {
    color: '#1E40AF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },

  // Estatísticas
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  statItem: {
    alignItems: 'center',
    flex: 1,
  },

  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },

  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
  },

  // Seção de favoritos
  favoritesSection: {
    flex: 1,
  },

  sectionHeader: {
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },

  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },

  scrollContent: {
    paddingBottom: 20,
  },

  favoriteItem: {
    position: 'relative',
    marginBottom: 16,
  },

  removeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  // Sugestão de roteiro
  routeSuggestion: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  suggestionContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  suggestionText: {
    flex: 1,
    marginLeft: 12,
  },

  suggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },

  suggestionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  suggestionButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  suggestionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});