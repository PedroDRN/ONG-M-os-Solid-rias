// Dados usados pelos templates
const img = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const imagens = {
  hero: img('1593113630400-ea4288922497', 1400),
  voluntariado: img('1593113630400-ea4288922497', 800),
  doacoes: img('1593113646773-028c64a8f1b8', 800),
};

export const projetos = [
  { titulo: 'Educação para Todos', texto: 'Reforço escolar gratuito para crianças e adolescentes.',
    img: img('1509062522246-3755977927d7', 600), alt: 'Crianças participando de aula de reforço escolar em sala comunitária' },
  { titulo: 'Alimento Solidário', texto: 'Distribuição mensal de cestas básicas para famílias carentes.',
    img: img('1593113646773-028c64a8f1b8', 600), alt: 'Voluntários organizando cestas básicas para doação' },
  { titulo: 'Meio Ambiente', texto: 'Mutirões de plantio e conscientização ambiental.',
    img: img('1466692476868-aef1dfb1e735', 600), alt: 'Grupo plantando mudas de árvores em área de reflorestamento' },
];

export const contatos = [
  { titulo: 'Telefone', html: '<a href="tel:+551430001234">(14) 3000-1234</a>' },
  { titulo: 'E-mail', html: '<a href="mailto:contato@maossolidarias.org.br">contato@maossolidarias.org.br</a>' },
  { titulo: 'Endereço', html: 'Rua das Flores, 123 – Botucatu, SP' },
  { titulo: 'Redes sociais', html: '<a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a> · <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>' },
];

export const areasVoluntariado = [
  'Reforço escolar e apoio pedagógico', 'Distribuição de alimentos e cestas básicas',
  'Mutirões de plantio e ações ambientais', 'Apoio administrativo e comunicação',
];
export const passosVoluntario = [
  'Preencha o formulário de inscrição on-line', 'Participe de uma reunião de boas-vindas',
  'Escolha a frente de atuação de seu interesse', 'Receba o cronograma de atividades do mês',
];
export const formasDoacao = [
  ['Financeira', 'PIX, transferência ou doação recorrente'],
  ['Alimentos', 'Itens não perecíveis, entregues nos pontos de coleta'],
  ['Roupas e calçados', 'Peças em bom estado de uso'],
  ['Materiais escolares', 'Cadernos, lápis e mochilas'],
];

export const estados = [['SP','São Paulo'],['RJ','Rio de Janeiro'],['MG','Minas Gerais'],['PR','Paraná'],['SC','Santa Catarina'],['RS','Rio Grande do Sul'],['outro','Outro']];
export const areasInteresse = [['educacao','Educação e reforço escolar'],['alimentos','Distribuição de alimentos'],['ambiental','Ações ambientais'],['administrativo','Apoio administrativo']];
