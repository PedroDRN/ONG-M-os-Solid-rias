// Sistema de templates: cada função recebe dados e devolve HTML
import { imagens, projetos, contatos, areasVoluntariado, passosVoluntario, formasDoacao, estados, areasInteresse } from './data.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
const lista = (itens, fn) => itens.map(fn).join('');

/* ---------- Componentes reutilizáveis ---------- */
const cabecalhoPagina = (titulo, sub) => `
  <div class="pagina-header"><h1>${titulo}</h1><p>${sub}</p></div>`;

const campo = ({ id, rotulo, tipo = 'text', obrig = false, dica = '', attrs = '' }) => `
  <div class="campo">
    <label for="${id}">${rotulo}${obrig ? '<span class="obrigatorio" aria-hidden="true">*</span>' : ''}</label>
    <input type="${tipo}" id="${id}" name="${id}" ${obrig ? 'required aria-required="true"' : ''} ${attrs}
           aria-describedby="${dica ? `dica-${id} ` : ''}erro-${id}">
    ${dica ? `<p class="dica" id="dica-${id}">${dica}</p>` : ''}
    <p class="erro" id="erro-${id}" role="alert"></p>
  </div>`;

const seletor = ({ id, rotulo, opcoes, placeholder, obrig = false, attrs = '' }) => `
  <div class="campo">
    <label for="${id}">${rotulo}${obrig ? '<span class="obrigatorio" aria-hidden="true">*</span>' : ''}</label>
    <select id="${id}" name="${id}" ${obrig ? 'required aria-required="true"' : ''} ${attrs} aria-describedby="erro-${id}">
      <option value="" selected disabled>${placeholder}</option>
      ${lista(opcoes, ([v, t]) => `<option value="${v}">${t}</option>`)}
    </select>
    <p class="erro" id="erro-${id}" role="alert"></p>
  </div>`;

/* ---------- Páginas ---------- */
export const templates = {
  inicio: () => `
    <section class="hero" aria-label="Apresentação">
      <img src="${imagens.hero}" alt="Voluntários da ONG Mãos Solidárias distribuindo doações para famílias em uma comunidade">
      <div class="hero-texto">
        <h1>Transformando vidas através da solidariedade</h1>
        <p>Levamos educação, alimento e esperança para quem mais precisa.</p>
        <a href="#/inicio?s=contato" class="botao">Fale conosco</a>
      </div>
    </section>

    <section id="sobre" class="secao">
      <h2>Quem somos</h2>
      <p>A ONG Mãos Solidárias atua há mais de 10 anos promovendo ações sociais, educacionais e ambientais
         em comunidades vulneráveis. Acreditamos que pequenas ações, quando somadas, geram grandes transformações.</p>
    </section>

    <section id="projetos" class="secao">
      <h2>Nossos projetos</h2>
      <div class="cards">
        ${lista(projetos, (p) => `
          <article class="card">
            <img src="${p.img}" alt="${esc(p.alt)}" loading="lazy">
            <div class="card-conteudo"><h3>${p.titulo}</h3><p>${p.texto}</p></div>
          </article>`)}
      </div>
      <a href="#/projetos" class="botao-secundario">Ver todas as frentes</a>
    </section>

    <section id="contato" class="secao faixa-contato">
      <h2>Contato</h2>
      <p>Entre em contato com a nossa equipe pelos canais abaixo:</p>
      <div class="contato-grid">
        ${lista(contatos, (c) => `<div class="contato-item"><strong>${c.titulo}</strong><p>${c.html}</p></div>`)}
      </div>
    </section>`,

  projetos: () => `
    ${cabecalhoPagina('Nossas Frentes de Atuação', 'Conheça como você pode se envolver: como voluntário ou como doador.')}
    <div class="conteudo">
      <nav class="indice" aria-label="Navegação entre seções da página">
        <a href="#/projetos?s=voluntariado">Voluntariado</a>
        <a href="#/projetos?s=doacoes">Doações</a>
      </nav>

      <section id="voluntariado" class="frente" aria-labelledby="titulo-voluntariado">
        <div class="frente-titulo"><span class="icone" aria-hidden="true">V</span><h2 id="titulo-voluntariado">Voluntariado</h2></div>
        <p class="frente-intro">Ser voluntário na ONG Mãos Solidárias é dedicar algumas horas do seu mês para gerar impacto
           direto na vida de famílias e comunidades. Existem frentes para diferentes perfis, disponibilidades e habilidades.</p>
        <div class="grid-2">
          <div>
            <div class="subtopico"><h3>Áreas de atuação</h3><ul>${lista(areasVoluntariado, (a) => `<li>${a}</li>`)}</ul></div>
            <div class="subtopico"><h3>Como se tornar voluntário</h3><ul>${lista(passosVoluntario, (a) => `<li>${a}</li>`)}</ul></div>
            <div class="caixa-cta"><strong>Disponibilidade mínima:</strong> 4 horas mensais.<br>
              <a href="#/cadastro" class="botao">Quero ser voluntário</a></div>
          </div>
          <div class="imagem-frente"><img src="${imagens.voluntariado}" alt="Voluntários reunidos antes de uma ação social da ONG" loading="lazy"></div>
        </div>
      </section>

      <section id="doacoes" class="frente" aria-labelledby="titulo-doacoes">
        <div class="frente-titulo"><span class="icone" aria-hidden="true">D</span><h2 id="titulo-doacoes">Doações</h2></div>
        <p class="frente-intro">As campanhas de doação sustentam nossos projetos ao longo do ano. Toda contribuição,
           financeira ou em itens, é direcionada a uma das frentes de atuação da organização.</p>
        <div class="grid-2">
          <div class="imagem-frente"><img src="${imagens.doacoes}" alt="Cestas de doação organizadas para distribuição" loading="lazy"></div>
          <div>
            <div class="subtopico"><h3>Formas de doação</h3>
              <table>
                <caption>Modalidades de doação aceitas</caption>
                <thead><tr><th scope="col">Tipo</th><th scope="col">Como contribuir</th></tr></thead>
                <tbody>${lista(formasDoacao, ([t, c]) => `<tr><td>${t}</td><td>${c}</td></tr>`)}</tbody>
              </table>
            </div>
            <div class="caixa-cta"><strong>Transparência:</strong> todo valor arrecadado é destinado às frentes ativas
              e detalhado no relatório anual da ONG.<br>
              <a href="#/inicio?s=contato" class="botao-secundario">Fazer uma doação</a></div>
          </div>
        </div>
      </section>
    </div>`,

  cadastro: () => `
    ${cabecalhoPagina('Cadastro de Voluntário', 'Preencha seus dados para participar das nossas frentes de atuação.')}
    <div class="conteudo estreito">
      <div id="aviso-sucesso" class="aviso sucesso" role="status" tabindex="-1" hidden></div>
      <div id="aviso-erros" class="aviso erro-geral" role="alert" tabindex="-1" hidden></div>

      <form id="form-cadastro" novalidate>
        <fieldset>
          <legend>Dados pessoais</legend>
          ${campo({ id: 'nome', rotulo: 'Nome completo', obrig: true, attrs: 'autocomplete="name"' })}
          <div class="linha-dupla">
            ${campo({ id: 'nascimento', rotulo: 'Data de nascimento', tipo: 'date', obrig: true, attrs: 'autocomplete="bday"' })}
            ${campo({ id: 'cpf', rotulo: 'CPF', obrig: true, attrs: 'inputmode="numeric" placeholder="000.000.000-00" maxlength="14"' })}
          </div>
          <fieldset class="radios">
            <legend>Gênero</legend>
            <div class="opcoes">
              ${lista([['feminino','Feminino'],['masculino','Masculino'],['outro','Prefiro não informar']], ([v, t]) => `
                <span class="opcao"><input type="radio" id="genero-${v}" name="genero" value="${v}"><label for="genero-${v}">${t}</label></span>`)}
            </div>
          </fieldset>
        </fieldset>

        <fieldset>
          <legend>Contato</legend>
          ${campo({ id: 'email', rotulo: 'E-mail', tipo: 'email', obrig: true, attrs: 'autocomplete="email"' })}
          <div class="linha-dupla">
            ${campo({ id: 'telefone', rotulo: 'Telefone / WhatsApp', tipo: 'tel', obrig: true, attrs: 'autocomplete="tel" placeholder="(14) 90000-0000" maxlength="15"' })}
            ${campo({ id: 'cep', rotulo: 'CEP', attrs: 'inputmode="numeric" placeholder="18600-000" maxlength="9" autocomplete="postal-code"' })}
          </div>
        </fieldset>

        <fieldset>
          <legend>Endereço</legend>
          ${campo({ id: 'endereco', rotulo: 'Endereço (rua e número)', obrig: true, attrs: 'autocomplete="street-address"' })}
          <div class="linha-dupla">
            ${campo({ id: 'cidade', rotulo: 'Cidade', obrig: true, attrs: 'autocomplete="address-level2"' })}
            ${seletor({ id: 'estado', rotulo: 'Estado', opcoes: estados, placeholder: 'Selecione', obrig: true, attrs: 'autocomplete="address-level1"' })}
          </div>
        </fieldset>

        <fieldset>
          <legend>Disponibilidade para voluntariado</legend>
          ${seletor({ id: 'area', rotulo: 'Área de interesse', opcoes: areasInteresse, placeholder: 'Selecione uma área' })}
          ${campo({ id: 'horas', rotulo: 'Horas disponíveis por mês', tipo: 'number', dica: 'Disponibilidade mínima recomendada: 4 horas mensais.', attrs: 'min="4" max="160" step="1"' })}
          <div class="campo">
            <label for="mensagem">Mensagem (opcional)</label>
            <textarea id="mensagem" name="mensagem" rows="4" placeholder="Conte um pouco sobre sua motivação ou experiência prévia."></textarea>
          </div>
        </fieldset>

        <fieldset>
          <legend>Consentimento</legend>
          <div class="checkbox-linha">
            <input type="checkbox" id="termos" name="termos" required aria-required="true" aria-describedby="erro-termos">
            <label for="termos">Li e concordo com os termos de uso e a política de privacidade da ONG Mãos Solidárias.<span class="obrigatorio" aria-hidden="true">*</span></label>
          </div>
          <p class="erro" id="erro-termos" role="alert"></p>
        </fieldset>

        <button type="submit" class="botao botao-enviar">Enviar cadastro</button>
      </form>
    </div>`,

  naoEncontrada: () => `
    ${cabecalhoPagina('Página não encontrada', 'O endereço acessado não existe.')}
    <div class="conteudo estreito"><a href="#/inicio" class="botao">Voltar ao início</a></div>`,
};
