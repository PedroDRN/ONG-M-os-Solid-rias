// Roteador por hash: #/rota?s=id-da-secao
import { templates } from './templates.js';
import { initCadastro } from './validation.js';

const TITULO = 'ONG Mãos Solidárias';
const rotas = {
  '/inicio':   { titulo: 'Página Inicial',         view: templates.inicio },
  '/projetos': { titulo: 'Nossos Projetos',        view: templates.projetos },
  '/cadastro': { titulo: 'Cadastro de Voluntário', view: templates.cadastro, aoCarregar: initCadastro },
};

const app = document.getElementById('app');
let rotaAtual = null;

function lerHash() {
  const [caminho, query = ''] = location.hash.slice(1).split('?');
  return { caminho: caminho || '/inicio', secao: new URLSearchParams(query).get('s') };
}

function rolarParaSecao(id) {
  const el = id && document.getElementById(id);
  if (el) el.scrollIntoView();
}

function atualizarNavegacao(caminho) {
  document.querySelectorAll('#nav-principal a[data-rota]').forEach((a) => {
    if (a.dataset.rota === caminho) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

export function renderizar() {
  const { caminho, secao } = lerHash();

  // Mesma página, só mudou a seção: apenas rola
  if (caminho === rotaAtual && secao) return rolarParaSecao(secao);

  const rota = rotas[caminho];
  app.innerHTML = (rota ? rota.view : templates.naoEncontrada)();
  document.title = `${rota ? rota.titulo : 'Página não encontrada'} | ${TITULO}`;
  atualizarNavegacao(caminho);
  rotaAtual = caminho;

  rota?.aoCarregar?.(app);

  if (secao) rolarParaSecao(secao);
  else { window.scrollTo(0, 0); app.focus({ preventScroll: true }); }
}

export function iniciarRouter() {
  window.addEventListener('hashchange', renderizar);
  renderizar();
}
