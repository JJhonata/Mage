import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors } from '../theme/colors';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

// Dados mockados de eventos próximos
const eventosProximos = [
  {
    id: '1',
    nome: 'Festival de Cultura Local',
    data: '15 Dez 2024',
    horario: '18:00',
    local: 'Centro Cultural',
    tipo: 'Cultural',
  },
  {
    id: '2',
    nome: 'Feira Gastronômica',
    data: '20 Dez 2024',
    horario: '12:00',
    local: 'Praça Central',
    tipo: 'Gastronomia',
  },
  {
    id: '3',
    nome: 'Show ao Pôr do Sol',
    data: '25 Dez 2024',
    horario: '17:30',
    local: 'Beira-Mar',
    tipo: 'Música',
  },
];

export default function DetailsScreen({ route }: any) {
  const { id, nome, descricao, imagem, nivelSeguranca, distancia, tipo } = route.params;
  const navigation = useNavigation<any>();
  const { favoritos, adicionarFavorito, removerFavorito } = useFavorites();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  
  const estaFavoritado = favoritos.some(item => item.nome === nome);
  
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function animarFavorito() {
    scale.value = withTiming(1.1, { duration: 150 }, (finished) => {
      if (finished) {
        scale.value = withTiming(1, { duration: 150 });
      }
    });
  }

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

  const corSeguranca = getSecurityColor(nivelSeguranca);
  const iconeSeguranca = getSecurityIcon(nivelSeguranca);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'} 
        backgroundColor={colors.background} 
      />
      
      {/* Header com imagem e overlay */}
      <View style={styles.headerContainer}>
        <Image 
          source={{ uri: imagem }} 
          style={styles.headerImage}
          resizeMode="cover"
        />
        <View style={styles.headerOverlay}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => {
              if (estaFavoritado) {
                removerFavorito({ nome, descricao, imagem, nivelSeguranca });
              } else {
                adicionarFavorito({ nome, descricao, imagem, nivelSeguranca });
              }
              animarFavorito();
            }}
          >
            <Animated.View style={animatedStyle}>
              <Ionicons
                name={estaFavoritado ? 'heart' : 'heart-outline'}
                size={24}
                color={estaFavoritado ? colors.danger : '#FFFFFF'}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Informações principais */}
        <View style={styles.mainInfo}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, { color: colors.text }]}>{nome}</Text>
            <View style={styles.securityBadge}>
              <MaterialCommunityIcons
                name={iconeSeguranca as any}
                size={20}
                color={corSeguranca}
              />
              <Text style={[styles.securityText, { color: corSeguranca }]}>
                {nivelSeguranca}
              </Text>
            </View>
          </View>

          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="map-marker" size={16} color={colors.textSecondary} />
              <Text style={[styles.metaText, { color: colors.textSecondary }]}>{distancia}</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="tag" size={16} color={colors.textSecondary} />
              <Text style={[styles.metaText, { color: colors.textSecondary }]}>{tipo}</Text>
            </View>
          </View>

          <Text style={[styles.description, { color: colors.textSecondary }]}>{descricao}</Text>
        </View>

        {/* Informações detalhadas */}
        <View style={styles.detailsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Informações do Local</Text>
          
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="clock-outline" size={20} color={colors.primary} />
              <View style={styles.detailContent}>
                <Text style={[styles.detailLabel, { color: colors.text }]}>Horário</Text>
                <Text style={[styles.detailValue, { color: colors.textSecondary }]}>08:00 - 18:00</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="currency-usd-off" size={20} color={colors.success} />
              <View style={styles.detailContent}>
                <Text style={[styles.detailLabel, { color: colors.text }]}>Entrada</Text>
                <Text style={[styles.detailValue, { color: colors.textSecondary }]}>Gratuita</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="car" size={20} color={colors.warning} />
              <View style={styles.detailContent}>
                <Text style={[styles.detailLabel, { color: colors.text }]}>Estacionamento</Text>
                <Text style={[styles.detailValue, { color: colors.textSecondary }]}>Disponível</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="wifi" size={20} color={colors.primary} />
              <View style={styles.detailContent}>
                <Text style={[styles.detailLabel, { color: colors.text }]}>Wi-Fi</Text>
                <Text style={[styles.detailValue, { color: colors.textSecondary }]}>Gratuito</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Eventos próximos */}
        <View style={styles.eventsSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Eventos Próximos</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Events')}>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.eventsScroll}
          >
            {eventosProximos.map((evento) => (
              <TouchableOpacity
                key={evento.id}
                style={[styles.eventCard, { backgroundColor: colors.card }]}
                onPress={() => navigation.navigate('Events', { evento })}
              >
                <View style={styles.eventHeader}>
                  <Text style={[styles.eventDate, { color: colors.textSecondary }]}>{evento.data}</Text>
                  <Text style={[styles.eventTime, { color: colors.textSecondary }]}>{evento.horario}</Text>
                </View>
                <Text style={[styles.eventTitle, { color: colors.text }]} numberOfLines={2}>
                  {evento.nome}
                </Text>
                <View style={styles.eventMeta}>
                  <MaterialCommunityIcons name="map-marker" size={12} color={colors.textSecondary} />
                  <Text style={[styles.eventLocation, { color: colors.textSecondary }]} numberOfLines={1}>
                    {evento.local}
                  </Text>
                </View>
                <View style={styles.eventType}>
                  <Text style={[styles.eventTypeText, { color: colors.textSecondary }]}>{evento.tipo}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  
  // Header com imagem e overlay
  headerContainer: {
    position: 'relative',
    height: 300,
  },
  
  headerImage: {
    width: '100%',
    height: '100%',
  },
  
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Conteúdo principal
  content: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  
  mainInfo: {
    padding: 20,
    paddingBottom: 0,
  },
  
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
    marginRight: 12,
  },
  
  securityBadge: {
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
    marginLeft: 4,
  },
  
  metaInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  
  metaText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 24,
  },
  
  // Seção de detalhes
  detailsSection: {
    padding: 20,
    paddingTop: 0,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    width: '48%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  
  detailContent: {
    marginLeft: 12,
    flex: 1,
  },
  
  detailLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  
  // Seção de eventos
  eventsSection: {
    padding: 20,
    paddingTop: 0,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  
  seeAllText: {
    fontSize: 14,
    color: '#1E40AF',
    fontWeight: '600',
  },
  
  eventsScroll: {
    paddingRight: 20,
  },
  
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 200,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  
  eventDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  
  eventTime: {
    fontSize: 12,
    color: '#1E40AF',
    fontWeight: '600',
  },
  
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 18,
  },
  
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  eventLocation: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    flex: 1,
  },
  
  eventType: {
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