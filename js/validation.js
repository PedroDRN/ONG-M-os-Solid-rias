// Validação do formulário de cadastro, com feedback em tempo real
import { storage, CHAVES } from './storage.js';
import { mascaras, mostrarErro, mostrarAviso, esconderAviso } from './ui.js';

const IDADE_MINIMA = 18;
const HORAS_MINIMAS = 4;

function cpfValido(cpf) {
  const d = cpf.replace(/\D/g, '');
  if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false;
  const dv = (n) => {
    let soma = 0;
    for (let i = 0; i < n; i++) soma += +d[i] * (n + 1 - i);
    const r = (soma * 10) % 11;
    return r === 10 ? 0 : r;
  };
  return dv(9) === +d[9] && dv(10) === +d[10];
}

function idade(dataISO) {
  const n = new Date(dataISO), h = new Date();
  let anos = h.getFullYear() - n.getFullYear();
  if (h < new Date(h.getFullYear(), n.getMonth(), n.getDate())) anos--;
  return anos;
}

// Cada regra devolve uma mensagem de erro, ou '' se estiver válido
const regras = {
  nome: (v) => (v.trim().length < 3 ? 'Informe seu nome completo (mínimo 3 caracteres).' : ''),
  nascimento: (v) => {
    if (!v) return 'Informe sua data de nascimento.';
    if (new Date(v) > new Date()) return 'A data não pode estar no futuro.';
    return idade(v) < IDADE_MINIMA ? `É necessário ter ${IDADE_MINIMA} anos ou mais.` : '';
  },
  cpf: (v) => {
    if (!v.trim()) return 'Informe seu CPF.';
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v)) return 'Use o formato 000.000.000-00.';
    if (!cpfValido(v)) return 'CPF inválido. Confira os dígitos.';
    return storage.get(CHAVES.voluntarios, []).some((x) => x.cpf === v) ? 'Este CPF já está cadastrado.' : '';
  },
  email: (v) => {
    if (!v.trim()) return 'Informe seu e-mail.';
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Digite um e-mail válido (ex.: nome@dominio.com).';
  },
  telefone: (v) => {
    if (!v.trim()) return 'Informe seu telefone.';
    return /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(v) ? '' : 'Use o formato (00) 00000-0000, com DDD.';
  },
  cep: (v) => (v && !/^\d{5}-?\d{3}$/.test(v) ? 'CEP inválido. Use 00000-000.' : ''),
  endereco: (v) => (v.trim().length < 5 ? 'Informe rua e número.' : ''),
  cidade: (v) => (v.trim().length < 2 ? 'Informe sua cidade.' : ''),
  estado: (v) => (v ? '' : 'Selecione um estado.'),
  horas: (v) => {
    if (v === '') return '';
    const n = Number(v);
    if (!Number.isInteger(n) || n < HORAS_MINIMAS || n > 160) return `Informe um número inteiro entre ${HORAS_MINIMAS} e 160.`;
    return '';
  },
  termos: (_v, campo) => (campo.checked ? '' : 'É necessário aceitar os termos para continuar.'),
};

function validarCampo(campo) {
  const regra = regras[campo.name];
  if (!regra) return true;
  const erro = regra(campo.type === 'checkbox' ? '' : campo.value, campo);
  if (campo.type === 'checkbox') {
    document.getElementById(`erro-${campo.name}`).textContent = erro;
    campo.setAttribute('aria-invalid', erro ? 'true' : 'false');
  } else mostrarErro(campo, erro);
  return !erro;
}

// ----- Rascunho automático no localStorage -----
function salvarRascunho(form) {
  const dados = Object.fromEntries(new FormData(form));
  storage.set(CHAVES.rascunho, dados);
}
function restaurarRascunho(form) {
  const dados = storage.get(CHAVES.rascunho, {});
  Object.entries(dados).forEach(([nome, valor]) => {
    const els = form.elements[nome];
    if (!els) return;
    if (els instanceof RadioNodeList) els.value = valor;
    else if (els.type === 'checkbox') els.checked = true;
    else els.value = valor;
  });
}

export function initCadastro(raiz) {
  const form = raiz.querySelector('#form-cadastro');
  const avisoErros = raiz.querySelector('#aviso-erros');
  const avisoSucesso = raiz.querySelector('#aviso-sucesso');

  restaurarRascunho(form);

  // Máscaras
  Object.keys(mascaras).forEach((nome) => {
    form.elements[nome].addEventListener('input', (e) => { e.target.value = mascaras[nome](e.target.value); });
  });

  // Feedback ao sair do campo e correção ao digitar
  form.addEventListener('focusout', (e) => { if (e.target.name) validarCampo(e.target); });
  form.addEventListener('input', (e) => {
    if (e.target.classList.contains('invalido')) validarCampo(e.target);
    salvarRascunho(form);
  });
  form.addEventListener('change', (e) => {
    if (e.target.tagName === 'SELECT' || e.target.type === 'checkbox') validarCampo(e.target);
    salvarRascunho(form);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    esconderAviso(avisoSucesso);

    const invalidos = [...form.elements].filter((c) => c.name && regras[c.name] && !validarCampo(c));
    if (invalidos.length) {
      mostrarAviso(avisoErros, `<strong>Corrija ${invalidos.length} campo(s) antes de enviar:</strong>` +
        `<ul>${invalidos.map((c) => `<li>${document.getElementById(`erro-${c.name}`).textContent}</li>`).join('')}</ul>`);
      invalidos[0].focus();
      return;
    }

    esconderAviso(avisoErros);
    const registro = { ...Object.fromEntries(new FormData(form)), criadoEm: new Date().toISOString() };
    const voluntarios = storage.get(CHAVES.voluntarios, []);
    voluntarios.push(registro);

    if (!storage.set(CHAVES.voluntarios, voluntarios)) {
      mostrarAviso(avisoErros, 'Não foi possível salvar os dados neste navegador. Verifique se o armazenamento está habilitado.');
      return;
    }

    storage.remove(CHAVES.rascunho);
    form.reset();
    form.querySelectorAll('.valido, .invalido').forEach((c) => c.classList.remove('valido', 'invalido'));
    mostrarAviso(avisoSucesso, `<strong>Cadastro enviado com sucesso!</strong> Obrigado, ${registro.nome.split(' ')[0]}. ` +
      `Total de cadastros salvos neste navegador: ${voluntarios.length}.`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
