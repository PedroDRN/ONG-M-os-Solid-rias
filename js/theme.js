// Alternância de tema claro/escuro (preferência salva no localStorage)
import { storage } from './storage.js';

const CHAVE = 'tema';
const raiz = document.documentElement;
const botao = document.getElementById('tema-toggle');
const icone = botao?.querySelector('.tema-icone');

const temaAtual = () => (raiz.dataset.theme === 'dark' ? 'dark' : 'light');

function aplicar(tema) {
  raiz.dataset.theme = tema;
  botao?.setAttribute('aria-pressed', String(tema === 'dark'));
  if (icone) icone.textContent = tema === 'dark' ? '☀️' : '🌙';
  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', tema === 'dark' ? '#17584a' : '#1b6f5c');
}

export function iniciarTema() {
  aplicar(temaAtual()); // o script no <head> já definiu o tema inicial

  botao?.addEventListener('click', () => {
    const novo = temaAtual() === 'dark' ? 'light' : 'dark';
    aplicar(novo);
    storage.set(CHAVE, novo);
  });

}
