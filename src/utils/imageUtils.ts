// Utilitário para gerenciar imagens locais
export const localImages = {
  'praia_futuro': require('../../assets/images/praia_futuro.jpg'),
  'centro_dragao': require('../../assets/images/centro_dragao.jpg'),
  'default': require('../../assets/images/default.png'),
  'mercado_central': require('../../assets/images/mercado_central.jpg'),
  'parque_coco': require('../../assets/images/parque_coco.jpg'),
  'beira_mar': require('../../assets/images/beira_mar.jpg'),
};

// Função para obter a imagem correta (local ou URL)
export const getImageSource = (imageKey: string) => {
  // Se for uma chave de imagem local, retorna o require
  if (localImages[imageKey as keyof typeof localImages]) {
    return localImages[imageKey as keyof typeof localImages];
  }
  
  // Se for uma URL, retorna como URI
  return { uri: imageKey };
};

// Função para verificar se é uma imagem local
export const isLocalImage = (imageKey: string) => {
  return imageKey in localImages;
};