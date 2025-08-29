import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors } from '../theme/colors';

type StateType = 'empty' | 'error' | 'success' | 'loading';

interface StateDisplayProps {
  type: StateType;
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
  showAction?: boolean;
}

export function StateDisplay({ 
  type, 
  title, 
  message, 
  actionText, 
  onAction, 
  showAction = false 
}: StateDisplayProps) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const getIconName = () => {
    switch (type) {
      case 'empty':
        return 'inbox-outline';
      case 'error':
        return 'alert-circle';
      case 'success':
        return 'check-circle';
      case 'loading':
        return 'refresh';
      default:
        return 'information';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'empty':
        return colors.textTertiary;
      case 'error':
        return colors.danger;
      case 'success':
        return colors.success;
      case 'loading':
        return colors.primary;
      default:
        return colors.primary;
    }
  };

  const getActionButtonColor = () => {
    switch (type) {
      case 'empty':
        return colors.primary;
      case 'error':
        return colors.primary;
      case 'success':
        return colors.success;
      case 'loading':
        return colors.primary;
      default:
        return colors.primary;
    }
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={getIconName() as any}
        size={80}
        color={getIconColor()}
      />
      <Text style={[styles.title, { color: colors.text }]}>
        {title}
      </Text>
      <Text style={[styles.message, { color: colors.textSecondary }]}>
        {message}
      </Text>
      
      {showAction && actionText && onAction && (
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: getActionButtonColor() }]}
          onPress={onAction}
        >
          <MaterialCommunityIcons 
            name="arrow-right" 
            size={20} 
            color={colors.surface} 
          />
          <Text style={[styles.actionButtonText, { color: colors.surface }]}>
            {actionText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});