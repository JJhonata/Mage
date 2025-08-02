import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors } from '../theme/colors';

interface LibrasButtonProps {
  text?: string;
  onPress?: () => void;
}

export function LibrasButton({ text, onPress }: LibrasButtonProps) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const [showModal, setShowModal] = useState(false);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <TouchableOpacity 
        onPress={handlePress} 
        style={[
          styles.button, 
          { 
            backgroundColor: colors.primary,
            borderColor: colors.border,
          }
        ]}
      >
        <MaterialCommunityIcons
          name="hand-front"
          size={20}
          color={colors.text}
        />
        {text && (
          <Text style={[styles.buttonText, { color: colors.text }]}>
            {text}
          </Text>
        )}
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: colors.overlay }]}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <MaterialCommunityIcons
                name="hand-front"
                size={32}
                color={colors.primary}
              />
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Libras Ativado
              </Text>
            </View>
            
            <Text style={[styles.modalText, { color: colors.textSecondary }]}>
              O recurso de Libras está ativo. O app agora oferece suporte à Língua Brasileira de Sinais para melhor acessibilidade.
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.primary }]}
                onPress={() => setShowModal(false)}
              >
                <Text style={[styles.modalButtonText, { color: colors.text }]}>
                  Entendi
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  modalText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  modalActions: {
    width: '100%',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 