// Máscaras de entrada e utilitários de feedback visual
const digitos = (v) => v.replace(/\D/g, '');

export const mascaras = {
  cpf(v) {
    return digitos(v).slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  },
  telefone(v) {
    const d = digitos(v).slice(0, 11);
    if (d.length > 10) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    if (d.length > 6)  return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    if (d.length > 2)  return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return d ? `(${d}` : '';
  },
  cep(v) {
    const d = digitos(v).slice(0, 8);
    return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
  },
};

export function mostrarErro(campo, mensagem) {
  const msg = document.getElementById(`erro-${campo.name}`);
  if (msg) msg.textContent = mensagem;
  campo.classList.toggle('invalido', !!mensagem);
  campo.classList.toggle('valido', !mensagem && campo.value !== '');
  campo.setAttribute('aria-invalid', mensagem ? 'true' : 'false');
}

export function mostrarAviso(el, html) {
  el.innerHTML = html;
  el.hidden = false;
  el.focus();
}
export const esconderAviso = (el) => { el.hidden = true; el.innerHTML = ''; };
