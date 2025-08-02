import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors } from '../theme/colors';

export function BotaoTema() {
  const { theme, toggleTheme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <TouchableOpacity 
      onPress={toggleTheme} 
      style={{ 
        padding: 10,
        backgroundColor: colors.borderLight,
        borderRadius: 8,
        marginRight: 8,
      }}
    >
      <Ionicons
        name={theme === 'light' ? 'moon' : 'sunny'}
        size={24}
        color={theme === 'light' ? colors.text : colors.warning}
      />
    </TouchableOpacity>
  );
}