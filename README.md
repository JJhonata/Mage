# 🧙‍♂️ Mage App

**Seu guia turístico inteligente e seguro, feito com React Native, Expo e TypeScript.**

---

## ✨ Visão Geral

O Mage é um aplicativo que ajuda turistas a explorar pontos turísticos, eventos e montar roteiros com foco em **segurança** e **acessibilidade**.  
Inclui suporte a tema escuro/claro, tela de login e botão de Libras para acessibilidade! 🌙🌞🤟

---

## 🚀 Funcionalidades

- 🔐 **Tela de Login** - Autenticação de usuários (front-end)
- 🌐 Lista pontos turísticos próximos ao usuário
- 🔍 Busca e filtros por tipo de local
- 🚦 Indica o nível de segurança dos locais (semáforo)
- 💚 Favoritar/desfavoritar lugares
- 🗓️ Listagem de eventos locais e por data
- 🗺️ Criação de roteiros personalizados (mock)
- 🌑🌞 Suporte a tema escuro e claro (switch)
- 🦻 Botão para ativar recurso de Libras (LibrasButton)
- 📱 Interface responsiva e moderna
- 100% front-end (dados mockados)

---

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- TypeScript
- React Navigation (Stack + Tab Navigator)
- Context API (Theme, Favorites)
- React Native Reanimated (animações)
- Flexbox (`StyleSheet.create`)
- Acessibilidade (LibrasButton)

---

## 📦 Como rodar o projeto

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/Mage.git

# 2. Entre na pasta do projeto
cd Mage

# 3. Instale as dependências
npm install

# 4. Rode o app com Expo
npx expo start
```

**Nota:** Se encontrar problemas com políticas de execução do PowerShell no Windows, execute:
```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Abra no Expo Go (app do celular) ou no emulador Android/iOS.

---

## 🗂️ Estrutura de Pastas

```
/src
  /components
    BotaoTema.tsx          # Botão de alternar tema
    CardLugar.tsx          # Card de local turístico
    LibrasButton.tsx       # Botão de acessibilidade Libras
    StateDisplay.tsx       # Componente de estados vazios/erro
  /context
    FavoritesContext.tsx   # Context para favoritos
    ThemeContext.tsx       # Context para tema
  /screens
    LoginScreen.tsx        # Tela de login
    HomeScreen.tsx         # Tela principal
    DetailsScreen.tsx      # Detalhes do local
    EventsScreen.tsx       # Lista de eventos
    FavoritesScreen.tsx    # Favoritos do usuário
    RoutesScreen.tsx       # Roteiros
  /navigation
    TabNavigation.tsx      # Navegação por abas
  /theme
    colors.ts             # Cores do tema
```

---

## 🔐 Tela de Login

- **Email e senha** com validação
- **Mostrar/ocultar senha** com ícone
- **Limite de tentativas** de login
- **Navegação automática** para a tela principal após login bem-sucedido
- **Estados de loading** e feedback visual

---

## 🌙 Tema Escuro e Claro

- Ative o modo escuro ou claro com o componente `BotaoTema`
- Cores são centralizadas em `/src/theme/colors.ts`
- Transições suaves entre temas
- Persistência do tema escolhido

---

## 🦻 Acessibilidade

- **Botão de Libras** (`LibrasButton`) para facilitar acessibilidade
- **Suporte a leitores de tela** com labels apropriados
- **Contraste adequado** entre temas claro e escuro
- **Navegação por teclado** em componentes interativos

---

## 🎨 Estados e Animações

- **useState** para gerenciamento de estado local
- **useMemo** para otimização de performance
- **React Native Reanimated** para animações suaves
- **Componentes controlados** (TextInput, Switch)
- **Feedback visual** em interações

---

## 🔧 Correções Recentes

- ✅ Removidas importações desnecessárias do React
- ✅ Corrigidos erros de TypeScript
- ✅ Ajustada configuração do tsconfig.json
- ✅ Resolvidos problemas de navegação
- ✅ Corrigidos erros de estilo com `as const`

---

## 🤝 Contribua!

Pull requests são bem-vindos!  
Sinta-se à vontade para abrir issues, sugerir melhorias ou reportar bugs.

---

## 📄 Licença

[MIT](./LICENSE)

---

> Desenvolvido com 💚 por [Jhonata e Larissa](https://github.com/seu-usuario)