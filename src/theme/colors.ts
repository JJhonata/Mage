export const lightColors = {
  // Cores principais
  background: '#F8FAFC',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#1F2937',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  
  // Cores de destaque
  primary: '#3B82F6',
  primaryLight: '#60A5FA',
  primaryDark: '#2563EB',
  
  // Cores de segurança
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  
  // Cores de interface
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  shadow: 'rgba(0, 0, 0, 0.1)',
  
  // Cores de estado
  disabled: '#D1D5DB',
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Cores específicas do app
  searchBackground: '#F9FAFB',
  filterActive: '#3B82F6',
  filterInactive: '#E5E7EB',
};

export const darkColors = {
  // Cores principais
  background: '#0F172A',
  surface: '#1E293B',
  card: '#334155',
  text: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textTertiary: '#94A3B8',
  
  // Cores de destaque
  primary: '#60A5FA',
  primaryLight: '#93C5FD',
  primaryDark: '#3B82F6',
  
  // Cores de segurança
  success: '#34D399',
  warning: '#FBBF24',
  danger: '#F87171',
  
  // Cores de interface
  border: '#475569',
  borderLight: '#334155',
  shadow: 'rgba(0, 0, 0, 0.3)',
  
  // Cores de estado
  disabled: '#475569',
  overlay: 'rgba(0, 0, 0, 0.7)',
  
  // Cores específicas do app
  searchBackground: '#1E293B',
  filterActive: '#60A5FA',
  filterInactive: '#475569',
};

// Função para obter cores baseada no tema
export const getThemeColors = (theme: 'light' | 'dark') => {
  return theme === 'light' ? lightColors : darkColors;
};