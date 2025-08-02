# 🧙‍♂️ Mage App

**Seu guia turístico inteligente e seguro, feito com React Native, Expo e TypeScript.**

---

## ✨ Visão Geral

O Mage é um aplicativo que ajuda turistas a explorar pontos turísticos, eventos e montar roteiros com foco em **segurança** e **acessibilidade**.  
Inclui suporte a tema escuro/claro e botão de Libras para acessibilidade! 🌙🌞🤟

---

## 🚀 Funcionalidades

- 🌐 Lista pontos turísticos próximos ao usuário
- 🚦 Indica o nível de segurança dos locais (semáforo)
- 💚 Favoritar/desfavoritar lugares
- 🗓️ Listagem de eventos locais e por data
- 🗺️ Criação de roteiros personalizados (mock)
- 🌑🌞 Suporte a tema escuro e claro (switch)
- 🦻 Botão para ativar recurso de Libras (VLibrasButton)
- 100% front-end (dados mockados)

---

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- TypeScript
- Flexbox (`StyleSheet.create`)
- Context API (Theme, Favorites)
- Navegação com Stacks e Tabs
- Acessibilidade (VLibras/LibrasButton)

---

## 📦 Como rodar o projeto

```bash
# 1. Clone o repositório
git clone https://github.com/JJhonata/Mage.git

# 2. Entre na pasta do projeto
cd Mage

# 3. Instale as dependências
npm install

# 4. Rode o app com Expo
npx expo start
```

Abra no Expo Go (app do celular) ou no emulador Android/iOS.

---

## 🗂️ Estrutura de Pastas

```
/src
  /components
    BotaoTema.tsx
    CardLugar.tsx
    LibrasButton.tsx
  /context
    FavoritesContext.tsx
    ThemeContext.tsx
  /screens
    HomeScreen.tsx
    DetailsScreen.tsx
    EventsScreen.tsx
    FavoritesScreen.tsx
    RoutesScreen.tsx
  /navigation
    MainStack.tsx
    TabNavigation.tsx
  /styles
    homeStyles.ts
    cardStyles.ts
    defaultStyles.ts
  /theme
    colors.ts
```

---

## 🌙 Tema Escuro e Claro

- Ative o modo escuro ou claro com o componente `BotaoTema`.
- Cores são centralizadas em `/src/theme/colors.ts`.

---

## 🦻 Acessibilidade

- Use o botão de Libras (`LibrasButton`) para facilitar acessibilidade a usuários surdos ou com deficiência auditiva.
- Componentes e telas seguem boas práticas de contraste e navegação por leitor de tela.

---

## 🤝 Contribua!

Pull requests são bem-vindos!  
Sinta-se à vontade para abrir issues, sugerir melhorias ou reportar bugs.

---

## 📄 Licença

[MIT](./LICENSE)

---

> Desenvolvido com 💚 por [Jhonata e Larissa]
