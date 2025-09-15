import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors } from '../theme/colors';

export default function LoadingScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    text: {
      marginTop: 16,
      fontSize: 16,
      color: colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>Carregando...</Text>
    </View>
  );
}