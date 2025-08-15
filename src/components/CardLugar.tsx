import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { getThemeColors } from '../theme/colors';

interface Props {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  nivelSeguranca: 'Alto' | 'Médio' | 'Baixo';
  distancia: string;
  tipo: string;
  securityColor?: string;
  securityIcon?: string;
}

export default function CardLugar({
  id,
  nome,
  descricao,
  imagem,
  nivelSeguranca,
  distancia,
  tipo,
  securityColor,
  securityIcon,
}: Props) {
  const navigation = useNavigation<any>();
  const { favoritos, adicionarFavorito, removerFavorito } = useFavorites();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const estaFavoritado = favoritos.some(item => item.nome === nome);

  const scale = useSharedValue(1);
  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function animarFavorito() {
    scale.value = withTiming(1.05, { duration: 150 }, (finished) => {
      if (finished) {
        scale.value = withTiming(1, { duration: 150 });
      }
    });
  }

  // Usa as props passadas ou calcula baseado no nível de segurança
  const corSeguranca = securityColor || (() => {
    switch (nivelSeguranca) {
      case 'Alto': return colors.success;
      case 'Médio': return colors.warning;
      case 'Baixo': return colors.danger;
      default: return colors.textSecondary;
    }
  })();

  const iconeSeguranca = securityIcon || (() => {
    switch (nivelSeguranca) {
      case 'Alto': return 'shield-check';
      case 'Médio': return 'shield-half-full';
      case 'Baixo': return 'shield-alert';
      default: return 'shield';
    }
  })();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Details', { 
        id, 
        nome, 
        descricao, 
        imagem, 
        nivelSeguranca, 
        distancia, 
        tipo 
      })}
    >
      <Animated.View style={[styles.cardContent, animatedCardStyle]}>
        {/* Imagem do local */}
        <Image
          source={{ uri: imagem }}
          style={styles.imagem}
          resizeMode="cover"
        />

        {/* Informações do local */}
        <View style={styles.infoContainer}>
          {/* Header com nome e botão de favorito */}
          <View style={styles.headerRow}>
            <View style={styles.titleContainer}>
              <Text style={[styles.nome, { color: colors.text }]} numberOfLines={1}>
                {nome}
              </Text>
              <View style={styles.metaInfo}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={14}
                  color={colors.textSecondary}
                />
                <Text style={[styles.distancia, { color: colors.textSecondary }]}>
                  {distancia}
                </Text>
                <View style={[styles.dot, { backgroundColor: colors.textSecondary }]} />
                <Text style={[styles.tipo, { color: colors.textSecondary }]}>
                  {tipo}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                if (estaFavoritado) {
                  removerFavorito({ nome, descricao, imagem, nivelSeguranca });
                } else {
                  adicionarFavorito({ nome, descricao, imagem, nivelSeguranca });
                }
                animarFavorito();
              }}
              style={[styles.favoritoBtn, { backgroundColor: colors.borderLight }]}
            >
              <Ionicons
                name={estaFavoritado ? 'heart' : 'heart-outline'}
                size={24}
                color={estaFavoritado ? colors.danger : colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          {/* Descrição */}
          <Text style={[styles.descricao, { color: colors.textSecondary }]} numberOfLines={2}>
            {descricao}
          </Text>

          {/* Indicador de segurança */}
          <View style={styles.securityContainer}>
            <View style={[styles.securityIndicator, { backgroundColor: colors.borderLight, borderColor: colors.border }]}>
              <MaterialCommunityIcons
                name={iconeSeguranca as any}
                size={18}
                color={corSeguranca}
              />
              <Text style={[styles.securityText, { color: corSeguranca }]}>
                Segurança {nivelSeguranca}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardContent: {
    padding: 0,
  },
  imagem: {
    width: '100%',
    height: 160,
  },
  infoContainer: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    lineHeight: 24,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distancia: {
    fontSize: 13,
    marginLeft: 4,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 6,
  },
  tipo: {
    fontSize: 13,
    textTransform: 'capitalize',
  },
  descricao: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  securityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  favoritoBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
});