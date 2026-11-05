# Colégio Mundial de Tete — Website institucional

Website estático construído exclusivamente com HTML5, CSS3 e JavaScript Vanilla. Não requer instalação, Node.js, backend ou serviços pagos.

## Executar localmente

1. Extraia a pasta do projecto.
2. Abra `index.html` num navegador moderno.
3. Para publicar, carregue todos os ficheiros mantendo a estrutura de pastas.

## Estrutura

- `index.html` — conteúdo e estrutura das secções.
- `style.css` — identidade visual, layout e responsividade.
- `script.js` — menu mobile, filtros e modal da galeria, validação do formulário, ano automático e animações de entrada.
- `assets/images/favicon.svg` — favicon provisório tipográfico (não é logótipo oficial).

## Pesquisa e informação utilizada

A pesquisa pública encontrou as seguintes referências. As páginas são fontes de terceiros e não substituem confirmação documental da direcção:

1. Listagem do Colégio Mundial Moçambique, com descrição pública, níveis de ensino, telefone, horário, endereço genérico e publicações recentes: https://www.schoolandcollegelistings.com/MZ/Tete/159056860897275/Colegio-Mundial-Mo%C3%A7ambique
2. Campanha histórica de apoio social de 2021, com descrição da origem da escola, da fundadora e das iniciativas comunitárias: https://ppl.pt/causas/escola
3. Notícia de 2015 sobre a graduação de alunos, classes e histórico da escola: https://smalacha.wordpress.com/2015/11/03/educacao-na-cidade-de-tete-colegio-mundial-gradua-122-alunos/
4. Referência histórica ao Colégio Mundial em 2013 e a um projecto interdisciplinar sobre a história e potencialidades da província: https://projectotete.blogspot.com/2013/01/
5. Listagem de negócio com referência a Canangola e telefone 84 219 0097: https://www.africabizinfo.com/pt-MZ/col%C3%A9gio-mundial-i-84-219-0097

O domínio `https://www.colegiomundialmocambique.com` foi identificado numa campanha histórica, mas não foi possível confirmar o seu funcionamento/acessibilidade durante esta pesquisa. A página Facebook associada aparece ligada na listagem pública: https://www.facebook.com/159056860897275/.

## Informação confirmada apenas por fontes públicas secundárias

- A escola é apresentada como instituição moçambicana com princípios cristãos e currículo do Sistema Nacional de Educação.
- A listagem pública apresenta os níveis inicial, primário, secundário e pré-universitário.
- Publicações de 2026 referem abertura do ano lectivo, convenção estudantil e actividades de futebol, educação física e xadrez.
- A listagem pública apresenta o telefone `+258 84 219 0097` e horário de segunda a sexta, 07:00–15:00. Estes dados devem ser confirmados pela instituição antes de divulgação oficial.
- Uma campanha de 2021 descreveu iniciativas de apoio comunitário. O website apresenta-as como registo histórico, não como programa actualmente activo.
- Uma notícia de 2015 indica que a escola existia desde 2007 e descreve níveis e classes naquela época. A data e a oferta actual carecem de confirmação.

## Itens que o cliente deve confirmar antes da publicação

1. Logótipo oficial, manual de identidade e cores institucionais.
2. Data exacta de fundação e história institucional aprovada.
3. Missão, visão, valores e filosofia educativa oficiais.
4. Oferta lectiva actual, classes exactas e designações dos níveis.
5. Nome, cargo, biografia, fotografia e mensagem da direcção.
6. Endereço completo, bairro, ponto de entrada e localização exacta no mapa.
7. Telefone, WhatsApp, email, horário e páginas oficiais de redes sociais.
8. Fotografias reais da escola, estudantes, professores, eventos e instalações, com autorização de utilização e consentimento adequado para imagens de menores.
9. Actividades extracurriculares e projectos sociais actualmente activos.
10. Canal real para recepção de mensagens (email institucional, WhatsApp Business ou backend aprovado).

## Funcionalidades implementadas

- Navegação desktop e menu mobile com estado acessível.
- Links internos e scroll suave.
- Layout responsivo para ecrãs pequenos, tablets e desktop.
- Filtros de galeria e modal explicativo para placeholders.
- Formulário com validação nativa/HTML e feedback JavaScript. Não envia nem armazena dados.
- Links `tel:`, Google Maps (pesquisa, não pin verificado) e Facebook associado.
- Ano de copyright automático.
- Animações discretas com suporte a `prefers-reduced-motion`.
- Meta description, Open Graph e favicon provisório.

## Limitações conhecidas / antes de publicar

- As fotografias oficiais não foram encontradas em formato verificável e autorizado para reutilização; por isso, a galeria contém placeholders ilustrados, claramente identificados. A imagem principal é uma ilustração CSS, não uma fotografia da escola.
- Não foi possível validar a localização exacta nem incorporar um pin fiável; o botão abre uma pesquisa no Google Maps.
- O formulário é apenas validado no navegador. Não existe envio de mensagens.
- O número, horário, endereço genérico e página social provêm de listagens de terceiros e necessitam de confirmação.
- O logótipo CM é apenas uma marca tipográfica provisória e não deve ser apresentado como logótipo oficial.
- As fontes tipográficas Google Fonts requerem ligação à internet; o website usa fontes de sistema como alternativa.

## Testes efectuados neste pacote

- Revisão estática da estrutura HTML, CSS e JavaScript.
- Verificação de que os ficheiros locais referenciados existem.
- Verificação de que os controlos principais têm handlers e que os links não usam `href="#"` como destino inerte.
- Verificação de breakpoints CSS para 380px, 700px e 900px, além do layout fluido para larguras superiores.

A tentativa de teste automatizado em Chromium/Playwright foi bloqueada pelo ambiente de execução (`ERR_BLOCKED_BY_ADMINISTRATOR`) tanto em `file://` como em servidor local. Por isso, não foi possível executar testes reais de interacção no navegador. Também não foi executado Lighthouse, validação W3C online, teste cross-browser, nem teste em dispositivos físicos. Não declarar esses testes como aprovados.

## Publicação no GitHub Pages

1. Crie um repositório no GitHub (por exemplo `colegio-mundial-tete`).
2. Carregue `index.html`, `style.css`, `script.js`, `README.md` e a pasta `assets` para a raiz do repositório.
3. Abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Seleccione a branch `main` e a pasta `/ (root)`, depois clique **Save**.
6. Aguarde a publicação e abra o endereço apresentado pelo GitHub Pages.
7. Teste o site publicado em telemóvel e computador e confirme todos os links.

Antes de o apresentar como versão institucional final, substitua os placeholders por imagens autorizadas e confirme os dados pendentes com a direcção.
