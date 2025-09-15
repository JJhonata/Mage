# 🧙‍♂️ Mage App

**Seu guia turístico inteligente e seguro, desenvolvido com React Native, Expo e TypeScript.**

---

## ✨ Sobre o Projeto

O **Mage** é um aplicativo móvel que revoluciona a experiência turística, oferecendo um guia completo e seguro para explorar qualquer cidade. Com foco em **segurança**, **acessibilidade** e **experiência do usuário**, o app ajuda turistas e moradores a descobrirem os melhores pontos turísticos, eventos e roteiros.

### 🎯 Principais Diferenciais

- **🚦 Sistema de Segurança**: Classificação de locais por nível de segurança (Alto/Médio/Baixo)
- **📸 Imagens Locais**: Sistema híbrido com imagens locais e URLs online
- **🌙 Tema Adaptativo**: Suporte completo a modo claro e escuro
- **🔐 Autenticação Real**: Integração com Firebase Auth
- **♿ Acessibilidade**: Interface inclusiva e responsiva
- **💚 Sistema de Favoritos**: Salve seus lugares preferidos

---

## 🚀 Funcionalidades Principais

### 🏠 **Tela Inicial (Home)**
- Lista de pontos turísticos próximos
- Busca inteligente por nome
- Filtros por nível de segurança
- Cards interativos com animações
- Sistema de favoritos integrado

### 📍 **Detalhes do Local**
- Informações completas do ponto turístico
- Galeria de imagens em alta resolução
- Informações práticas (horários, preços, estacionamento)
- Eventos próximos ao local
- Integração com sistema de favoritos

### 🗓️ **Eventos**
- Lista de eventos culturais e turísticos
- Filtros por data, tipo e localização
- Informações detalhadas (preços, horários, segurança)
- Integração com pontos turísticos

### 🗺️ **Roteiros Personalizados**
- Roteiros pré-definidos por categoria
- Duração e distância estimadas
- Nível de segurança do roteiro
- Sistema de favoritos para roteiros

### 💚 **Favoritos**
- Lista personalizada de lugares favoritos
- Sincronização entre dispositivos
- Interface otimizada para gerenciamento

### 👤 **Perfil do Usuário**
- Informações pessoais
- Preferências de tema
- Configurações de notificações
- Edição de perfil completa

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **React Native** 0.81.4 - Framework principal
- **Expo** ~54.0.0 - Plataforma de desenvolvimento
- **TypeScript** ~5.8.3 - Tipagem estática
- **React Navigation** - Navegação (Stack + Tab)

### **Backend & Serviços**
- **Firebase Auth** - Autenticação de usuários
- **Firestore** - Banco de dados em tempo real
- **AsyncStorage** - Armazenamento local

### **UI/UX**
- **React Native Reanimated** - Animações fluidas
- **Expo Vector Icons** - Ícones personalizados
- **React Native Safe Area Context** - Área segura
- **Linear Gradient** - Gradientes visuais

### **Desenvolvimento**
- **Metro Bundler** - Bundling otimizado
- **Babel** - Transpilação de código
- **ESLint/TypeScript** - Qualidade de código

---

## 📦 Instalação e Execução

### **Pré-requisitos**
- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app (para teste em dispositivo)

### **Passos para Execução**

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/Mage.git
cd Mage

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npx expo start

# 4. Execute em plataforma específica
npx expo start --android  # Android
npx expo start --ios      # iOS
npx expo start --web      # Web
```

### **Configuração do Firebase**

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative Authentication (Email/Password)
3. Ative Firestore Database
4. Substitua as configurações em `src/services/firebaseService.ts`

---

## 🗂️ Arquitetura do Projeto

```
Mage/
├── 📱 App.tsx                    # Componente raiz e navegação
├── 📦 package.json               # Dependências e scripts
├── 🎨 assets/
│   └── images/                   # Imagens locais dos pontos turísticos
│       ├── praia_futuro.jpg
│       ├── centro_dragao.jpg
│       ├── mercado_central.jpg
│       ├── parque_coco.jpg
│       ├── beira_mar.jpg
│       └── default.png
└── 📁 src/
    ├── 🧩 components/            # Componentes reutilizáveis
    │   ├── BotaoTema.tsx         # Alternador de tema
    │   ├── CardLugar.tsx         # Card de ponto turístico
    │   └── StateDisplay.tsx      # Estados vazios/erro
    ├── 🌐 context/               # Gerenciamento de estado global
    │   ├── AuthContext.tsx       # Autenticação
    │   ├── FavoritesContext.tsx  # Favoritos
    │   └── ThemeContext.tsx      # Tema
    ├── 🧭 navigation/            # Configuração de navegação
    │   └── TabNavigation.tsx     # Navegação por abas
    ├── 📱 screens/               # Telas da aplicação
    │   ├── HomeScreen.tsx        # Tela principal
    │   ├── DetailsScreen.tsx     # Detalhes do local
    │   ├── EventsScreen.tsx      # Lista de eventos
    │   ├── FavoritesScreen.tsx   # Favoritos
    │   ├── RoutesScreen.tsx      # Roteiros
    │   ├── ProfileScreen.tsx     # Perfil do usuário
    │   ├── LoginScreen.tsx       # Login
    │   ├── RegisterScreen.tsx    # Cadastro
    │   ├── EditProfileScreen.tsx # Edição de perfil
    │   └── LoadingScreen.tsx     # Tela de carregamento
    ├── 🔧 services/              # Serviços externos
    │   └── firebaseService.ts    # Configuração Firebase
    ├── 🎨 styles/                # Estilos globais
    │   └── homeStyles.ts         # Estilos da tela inicial
    ├── 🌈 theme/                 # Sistema de temas
    │   └── colors.ts             # Paleta de cores
    └── 🛠️ utils/                 # Utilitários
        └── imageUtils.ts         # Gerenciamento de imagens
```

---

## 📸 Sistema de Imagens

### **Características**
- **Híbrido**: Suporte a imagens locais e URLs online
- **Otimizado**: Carregamento instantâneo para imagens locais
- **Flexível**: Fácil adição de novas imagens
- **Responsivo**: Adaptação automática a diferentes tamanhos

### **Como Adicionar Novas Imagens**

1. **Adicione a imagem** em `assets/images/`
2. **Registre no sistema** em `src/utils/imageUtils.ts`:
   ```typescript
   'nome_da_imagem': require('../../assets/images/nome_da_imagem.jpg'),
   ```
3. **Use nos dados** em `src/screens/HomeScreen.tsx`:
   ```typescript
   imagem: 'nome_da_imagem',
   ```

### **Imagens Atuais**
- 🏖️ **Praia do Futuro** - Praia famosa com excelente infraestrutura
- 🏛️ **Centro Dragão do Mar** - Complexo cultural
- 🛒 **Mercado Central** - Tradicional mercado local
- 🌳 **Parque do Cocó** - Maior parque urbano da América Latina
- 🌊 **Beira-Mar** - Avenida à beira-mar com ciclovia

---

## 🔐 Sistema de Autenticação

### **Funcionalidades**
- **Cadastro de usuários** com validação completa
- **Login seguro** com Firebase Auth
- **Recuperação de senha** (implementação futura)
- **Persistência de sessão** automática
- **Logout** com limpeza de dados

### **Validações**
- Email válido
- Senha com mínimo 6 caracteres
- Nome com mínimo 2 caracteres
- Confirmação de senha
- Limite de tentativas de login

---

## 🌙 Sistema de Temas

### **Modo Claro**
- Cores vibrantes e contrastantes
- Foco na legibilidade
- Ideal para uso diurno

### **Modo Escuro**
- Cores suaves e confortáveis
- Redução de fadiga visual
- Ideal para uso noturno

### **Características**
- **Persistência**: Tema salvo entre sessões
- **Transições suaves**: Animações entre temas
- **Consistência**: Aplicado em toda a interface
- **Acessibilidade**: Contraste adequado em ambos os modos

---

## 🚦 Sistema de Segurança

### **Classificação de Locais**
- 🟢 **Alto**: Locais muito seguros, ideais para turistas
- 🟡 **Médio**: Locais seguros com algumas precauções
- 🔴 **Baixo**: Locais que requerem atenção extra

### **Critérios de Avaliação**
- Presença policial
- Iluminação
- Movimentação de pessoas
- Histórico de segurança
- Infraestrutura turística

---

## 📱 Pontos Turísticos Disponíveis

### **🏖️ Praia do Futuro**
- **Tipo**: Praia
- **Segurança**: Alto
- **Distância**: 2.5 km
- **Descrição**: Uma das praias mais famosas, com excelente infraestrutura turística.

### **🏛️ Centro Dragão do Mar**
- **Tipo**: Cultural
- **Segurança**: Alto
- **Distância**: 1.8 km
- **Descrição**: Complexo cultural com museus, teatro e espaços de lazer.

### **🛒 Mercado Central**
- **Tipo**: Comércio
- **Segurança**: Médio
- **Distância**: 3.2 km
- **Descrição**: Tradicional mercado com artesanato local e gastronomia regional.

### **🌳 Parque do Cocó**
- **Tipo**: Natureza
- **Segurança**: Alto
- **Distância**: 4.1 km
- **Descrição**: Maior parque urbano da América Latina, ideal para caminhadas.

### **🌊 Beira-Mar**
- **Tipo**: Lazer
- **Segurança**: Alto
- **Distância**: 1.2 km
- **Descrição**: Avenida à beira-mar com ciclovia e área de lazer.

---

## 🗓️ Eventos Disponíveis

### **🎭 Festival de Cultura Local**
- **Data**: 15 Dez 2024
- **Local**: Centro Cultural Dragão do Mar
- **Tipo**: Cultural
- **Preço**: Gratuito

### **🍽️ Feira Gastronômica da Praia**
- **Data**: 20 Dez 2024
- **Local**: Praia do Futuro
- **Tipo**: Gastronomia
- **Preço**: A partir de R$ 15

### **🎵 Show ao Pôr do Sol**
- **Data**: 25 Dez 2024
- **Local**: Beira-Mar
- **Tipo**: Música
- **Preço**: R$ 25

### **🎬 Cine ao Ar Livre**
- **Data**: 28 Dez 2024
- **Local**: Parque do Cocó
- **Tipo**: Cinema
- **Preço**: Gratuito

### **🎨 Feira de Artesanato**
- **Data**: 30 Dez 2024
- **Local**: Mercado Central
- **Tipo**: Artesanato
- **Preço**: Entrada gratuita

---

## 🗺️ Roteiros Disponíveis

### **🎭 Roteiro Cultural**
- **Duração**: 4 horas
- **Distância**: 8.5 km
- **Lugares**: 4
- **Segurança**: Alto

### **🏖️ Roteiro Praia e Sol**
- **Duração**: 6 horas
- **Distância**: 12.2 km
- **Lugares**: 3
- **Segurança**: Alto

### **🍽️ Roteiro Gastronômico**
- **Duração**: 3 horas
- **Distância**: 6.8 km
- **Lugares**: 5
- **Segurança**: Alto

### **🌙 Roteiro Noturno**
- **Duração**: 4 horas
- **Distância**: 5.4 km
- **Lugares**: 3
- **Segurança**: Médio

---

## 🎨 Design e UX

### **Princípios de Design**
- **Simplicidade**: Interface limpa e intuitiva
- **Consistência**: Padrões visuais uniformes
- **Acessibilidade**: Suporte a diferentes necessidades
- **Responsividade**: Adaptação a diferentes telas

### **Componentes Principais**
- **Cards interativos** com animações
- **Filtros dinâmicos** para busca
- **Indicadores visuais** de segurança
- **Navegação intuitiva** por abas

---

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm start              # Inicia o servidor Expo
npm run android        # Executa no Android
npm run ios           # Executa no iOS
npm run web           # Executa no navegador

# Build
expo build:android    # Build para Android
expo build:ios        # Build para iOS
```

---

## 🚀 Próximas Funcionalidades

### **Versão 2.0**
- [ ] **Mapas integrados** com Google Maps
- [ ] **Navegação GPS** para roteiros
- [ ] **Notificações push** para eventos
- [ ] **Sistema de avaliações** de usuários
- [ ] **Chat de suporte** integrado

### **Versão 2.1**
- [ ] **Reconhecimento de voz** para busca
- [ ] **Realidade aumentada** para pontos turísticos
- [ ] **Integração com redes sociais**
- [ ] **Sistema de recompensas**

---

## 🤝 Contribuição

### **Como Contribuir**
1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### **Padrões de Código**
- Use **TypeScript** para tipagem
- Siga as **convenções** do React Native
- Mantenha **componentes** pequenos e reutilizáveis
- Adicione **comentários** em código complexo

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Desenvolvedores

**Desenvolvido com 💚 por:**
- **Jhonata Vieira**
- **Larissa**

---

## 🙏 Agradecimentos

- **Comunidade React Native** pela documentação excelente
- **Expo Team** pela plataforma incrível
- **Firebase** pelos serviços robustos
- **Cidades brasileiras** pela inspiração e beleza

---

> **"Explorar qualquer cidade nunca foi tão seguro e fácil!"** 🧙‍♂️✨

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela! ⭐**

[![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/seu-usuario/Mage)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.4-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0.0-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.2.1-orange.svg)](https://firebase.google.com/)

</div>
