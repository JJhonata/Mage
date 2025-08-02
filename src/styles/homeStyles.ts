import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  // Container principal com flexbox responsivo
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: width > 768 ? 24 : width < 375 ? 12 : 16,
  },

  // Header com logo e saudação - uso consciente de Flexbox
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: width > 768 ? 24 : width < 375 ? 16 : 20,
    paddingTop: 10,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  logoText: {
    fontSize: width > 768 ? 32 : width < 375 ? 24 : 28,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginLeft: 8,
    fontFamily: 'System',
  },

  greetingContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },

  greetingText: {
    fontSize: width > 768 ? 20 : width < 375 ? 16 : 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },

  subtitleText: {
    fontSize: width > 768 ? 16 : width < 375 ? 12 : 14,
    color: '#6B7280',
    textAlign: 'right',
  },

  // Campo de busca com flexbox
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
    color: '#1F2937',
    paddingVertical: 0,
  },

  clearButton: {
    padding: 4,
  },

  // Seção de filtros com scroll horizontal
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

  // Container do conteúdo principal
  contentContainer: {
    flex: 1,
  },

  // Header da seção com contador
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  resultsCount: {
    fontSize: 14,
    color: '#6B7280',
  },

  // Scroll do conteúdo
  scrollContent: {
    paddingBottom: 20,
  },

  // Estado vazio com flexbox centralizado
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

  // Estilos responsivos baseados no tamanho da tela
  card: {
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
});