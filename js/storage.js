// Camada de acesso ao localStorage (com tratamento de erros)
const PREFIXO = 'maos-solidarias:';

export const storage = {
  get(chave, padrao = null) {
    try {
      const valor = localStorage.getItem(PREFIXO + chave);
      return valor === null ? padrao : JSON.parse(valor);
    } catch { return padrao; }
  },
  set(chave, valor) {
    try { localStorage.setItem(PREFIXO + chave, JSON.stringify(valor)); return true; }
    catch { return false; } // storage cheio ou bloqueado
  },
  remove(chave) {
    try { localStorage.removeItem(PREFIXO + chave); } catch { /* ignora */ }
  },
};

export const CHAVES = { voluntarios: 'voluntarios', rascunho: 'rascunho-cadastro' };
