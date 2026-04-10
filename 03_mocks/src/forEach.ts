// Função com callback — caso de uso perfeito para jest.fn()
// Queremos testar SE o callback foi chamado e COM QUAIS argumentos,
// sem nos preocupar com o que o callback faz internamente.

export const forEach = <T>(items: T[], callback: (item: T) => void): void => {
  for (let i = 0; i < items.length; i++) {
    callback(items[i]);
  }
};
