import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Lugar {
  nome: string;
  descricao: string;
  imagem: string;
  nivelSeguranca: 'Alto' | 'Médio' | 'Baixo';
}

interface FavoritesContextProps {
  favoritos: Lugar[];
  adicionarFavorito: (lugar: Lugar) => void;
  removerFavorito: (lugar: Lugar) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoritos, setFavoritos] = useState<Lugar[]>([]);

  const adicionarFavorito = (lugar: Lugar) => {
    setFavoritos((prev) => [...prev, lugar]);
  };

  const removerFavorito = (lugar: Lugar) => {
    setFavoritos((prev) => prev.filter((f) => f.nome !== lugar.nome));
  };

  return (
    <FavoritesContext.Provider value={{ favoritos, adicionarFavorito, removerFavorito }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextProps => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de FavoritesProvider');
  }
  return context;
};