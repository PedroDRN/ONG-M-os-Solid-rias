ONG Mãos Solidárias
Site institucional da ONG Mãos Solidárias, desenvolvido como SPA (Single Page Application) em HTML, CSS e JavaScript puro. O projeto apresenta a organização, suas frentes de atuação (voluntariado e doações) e oferece um formulário de cadastro de voluntários com validação em tempo real.
![Status](https://img.shields.io/badge/vers%C3%A3o-1.0.0-1b6f5c)
![HTML5](https://img.shields.io/badge/HTML5-e34f26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572b6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-f7df1e?logo=javascript&logoColor=black)
---
Sumário
Sobre o projeto
Funcionalidades
Tecnologias utilizadas
Pré-requisitos
Instalação e execução
Testes
Estrutura do projeto
Fluxo de trabalho com Git
Autor e licença
---
Sobre o projeto
O site tem três páginas, carregadas sem recarregar o navegador:
Página	Rota	Conteúdo
Início	`#/inicio`	Apresentação, quem somos, projetos em destaque e contatos
Projetos	`#/projetos`	Frentes de atuação: Voluntariado e Doações
Cadastro	`#/cadastro`	Formulário de inscrição de voluntários
O projeto não usa frameworks nem bibliotecas externas. Todo o roteamento, os templates e a validação foram escritos em JavaScript com módulos ES.
---
Funcionalidades
Roteador por hash: navegação entre páginas sem recarregar, com atualização do título da aba, marcação do link ativo (`aria-current`) e rolagem para seções via `#/rota?s=id-da-secao` (ex.: `#/inicio?s=contato`).
Sistema de templates: cada página é uma função que recebe dados e devolve HTML, com componentes reutilizáveis (campos, seletores, cabeçalhos) e escape de texto.
Formulário de cadastro de voluntário com:
validação em tempo real (ao sair do campo e ao corrigir);
validação de CPF com cálculo dos dígitos verificadores e bloqueio de CPF duplicado;
validação de e-mail, telefone com DDD, CEP, idade mínima (18 anos) e horas mensais (4 a 160);
máscaras de entrada para CPF, telefone e CEP;
rascunho automático: o que foi digitado é salvo e restaurado caso a página seja recarregada;
resumo de erros ao tentar enviar e mensagem de sucesso após o envio.
Persistência local: os cadastros são armazenados no `localStorage` do navegador (não há servidor nem banco de dados).
Acessibilidade: link "Pular para o conteúdo", rótulos associados aos campos, `aria-live`, `aria-invalid`, `role="alert"`, foco gerenciado na troca de página e respeito a `prefers-reduced-motion`.
Design responsivo: layout adaptável a celulares, tablets e desktops com CSS Grid e Flexbox.
---
Tecnologias utilizadas
Tecnologia	Uso no projeto
HTML5	Estrutura semântica (`header`, `nav`, `main`, `section`, `footer`, `fieldset`)
CSS3	Estilos, variáveis CSS, Grid, Flexbox, animações e media queries
JavaScript (ES Modules)	Roteador, templates, validação e máscaras
Web Storage API (`localStorage`)	Cadastros e rascunho do formulário
ARIA	Acessibilidade de formulários e navegação
Git / GitHub	Controle de versão, issues, milestones e pull requests
Unsplash	Imagens ilustrativas carregadas por URL
---
Pré-requisitos
Navegador moderno (Chrome, Firefox, Edge ou Safari em versões recentes).
Git instalado, para clonar o repositório.
Um servidor local, porque módulos ES não funcionam ao abrir o arquivo diretamente via `file://`. Use uma das opções:
Visual Studio Code com a extensão Live Server; ou
Python 3.
---
Instalação e execução
O projeto não possui dependências para instalar e não tem etapa de build.
Clone o repositório e entre na pasta:
```bash
   git clone <URL-DO-REPOSITORIO>
   cd <NOME-DA-PASTA>
   ```
Inicie um servidor local (escolha uma opção):
Opção A: VS Code + Live Server
Abra a pasta no VS Code.
Clique com o botão direito em `index.html` e escolha Open with Live Server.
Opção B: Python
```bash
   python3 -m http.server 8000
   ```
Acesse no navegador: `http://localhost:8000` (ou o endereço mostrado pelo Live Server, normalmente `http://127.0.0.1:5500`).
---
Testes
O projeto não possui testes automatizados. A verificação é feita manualmente no navegador, com apoio do DevTools:
Navegação: percorrer Início, Projetos e Cadastro pelo menu e pelos botões; testar os links de seção (`Contato`, `Voluntariado`, `Doações`) e uma rota inexistente (página "não encontrada").
Formulário: enviar com campos vazios; usar CPF inválido, e-mail mal formatado, telefone sem DDD, menor de 18 anos e horas fora do intervalo; cadastrar um voluntário válido e tentar repetir o mesmo CPF.
Rascunho: preencher parte do formulário, recarregar a página e confirmar a restauração dos dados.
Responsividade: simular diferentes larguras de tela no modo dispositivo do DevTools.
Acessibilidade: navegar apenas pelo teclado (Tab/Enter) e conferir o foco visível.
---
Estrutura do projeto
```text
.
├── index.html          # Página única: cabeçalho, rodapé e área #app
├── README.md
├── css/
│   └── styles.css      # Estilos, variáveis e responsividade
└── js/
    ├── main.js         # Ponto de entrada: inicia o roteador
    ├── router.js       # Roteador por hash e rolagem para seções
    ├── templates.js    # Templates HTML de cada página e componentes
    ├── data.js         # Dados usados nos templates (projetos, contatos, opções)
    ├── validation.js   # Regras de validação e envio do formulário
    ├── ui.js           # Máscaras de entrada e feedback visual
    └── storage.js      # Acesso ao localStorage com tratamento de erros
```
---
Fluxo de trabalho com Git
Estratégia de branches (GitFlow)
Branch	Função
`main`	Código estável, pronto para produção. Cada versão publicada recebe uma tag.
`develop`	Integração contínua do desenvolvimento em andamento.
`feature/*`	Uma branch por funcionalidade (ex.: `feature/roteador-spa`, `feature/formulario-cadastro`), criada a partir da `develop`.
`release/*`	Preparação de uma versão: ajustes finais antes do merge na `main`.
`hotfix/*`	Correções urgentes em produção, criadas a partir da `main`.
Versionamento semântico
O projeto segue o Versionamento Semântico no formato MAJOR.MINOR.PATCH:
MAJOR: mudanças incompatíveis com versões anteriores;
MINOR: novas funcionalidades compatíveis;
PATCH: correções de falhas.
Cada release é marcada com uma tag anotada na `main` (ex.: `v1.0.0`).
Mensagens de commit (Conventional Commits)
Formato: `tipo: descrição`
Tipo	Uso
`feat`	Nova funcionalidade
`fix`	Correção de bug
`docs`	Documentação
`style`	Formatação, sem mudança de lógica
`refactor`	Reestruturação de código
`chore`	Tarefas de manutenção e configuração
Exemplo: `feat: adiciona formulário de cadastro com validação e máscaras`
Issues, milestones e pull requests
Issues descrevem cada tarefa ou problema.
Milestones agrupam as issues de uma versão (ex.: `v0.3.0 - Cadastro de voluntários`, `v1.0.0 - Primeira versão estável`).
Pull requests integram as branches secundárias, com descrição do motivo e da forma de implementação, vinculados às issues (`Closes #1`).
Histórico de versões
Versão	Descrição
`v0.1.0`	Estrutura inicial do projeto e layout base
`v0.2.0`	Roteador SPA e templates das páginas
`v0.3.0`	Formulário de cadastro com validação e máscaras
`v0.3.1`	Correção da navegação para seções e do foco após troca de rota
`v1.0.0`	Primeira versão estável
---
Autor e licença
Desenvolvido por [SEU NOME] (@seu-usuario).
Licença: [escolha uma, ex.: MIT]. Consulte o arquivo `LICENSE`, se houver.
Projeto desenvolvido para fins educacionais. A ONG, os contatos e os dados exibidos são fictícios.