# Colégio Mundial de Tete — website institucional

Website estático em **HTML5, CSS3 e JavaScript vanilla** (sem frameworks, sem build). Compatível com GitHub Pages.

## Como publicar (GitHub Pages)
1. Crie um repositório e carregue **todo o conteúdo desta pasta** para a raiz (incluindo `.nojekyll`).
2. *Settings → Pages → Deploy from a branch → main / (root)*.
3. Abra o endereço gerado e teste no telemóvel.

## Estrutura
- `index.html` — conteúdo e secções
- `style.css` — identidade visual e responsividade
- `script.js` — menu, régua das classes, galeria, lightbox, formulário, animações
- `photos.js` — **lista das fotografias** (único ficheiro que precisa de editar para pôr fotos)
- `assets/images/brand/` — logótipo, favicons e recortes da imagem de capa fornecida pelo colégio
- `assets/images/photos/` — pasta onde devem ficar as fotografias do colégio

## Como adicionar fotografias reais
1. Copie as fotos (JPG/WebP, até ~400 KB, 1400–2000 px de largura) para `assets/images/photos/`.
2. Abra `photos.js` e escreva o nome do ficheiro no espaço certo (`hero`, `escola`, `vida-futebol`, …) ou acrescente uma linha em `gallery`. O ficheiro tem instruções e exemplos.
3. Enquanto um espaço não tiver foto, o site mostra uma moldura identificada como «fotografia por inserir». Nunca mostra imagens quebradas: uma foto listada que não exista é ignorada.
4. Só publique fotografias com autorização do colégio e, no caso de menores, com o consentimento adequado.

## Informação usada
**Fornecida pelo cliente:** nome, morada (Unnamed Road, Canangola, Tete), telefone +258 84 219 0097, horário «segunda a sexta, a partir das 07:15» (sem hora de encerramento), classes da 1.ª à 12.ª, links de WhatsApp, telefone, Google Maps e Facebook, os dois logótipos.

**De fontes públicas (indicadas no próprio site):** princípios cristãos, currículo do SNE, existência desde 2007 (notícia de 2015), graduação de 122 alunos (2015), referência de 2013, campanha social de 2021 (apresentada como registo histórico, não como programa ativo), abertura do ano letivo (27 fev 2026), futebol / educação física / xadrez e convenção estudantil (16 jul 2026).

## A confirmar com a direção antes de divulgar
- Data oficial de fundação e história aprovada
- Nome, retrato e mensagem do diretor (a secção mostra um espaço reservado, nada foi inventado)
- Correspondência entre os níveis (inicial, primário, secundário, pré-universitário) e as classes
- Horário de encerramento, email institucional, localização exata (o mapa usa pesquisa por morada)
- Fotografias e autorizações

## Funcionalidades
Header que muda no scroll com indicador da secção atual e barra de progresso com as cores da bandeira · menu móvel em ecrã inteiro · hero com parallax subtil · **régua interativa das 12 classes** (clique, arraste ou setas) com botão de WhatsApp pré-preenchido por classe · linha do tempo histórica · painéis de vida escolar com scroll lateral · eventos com troca de fotografia · galeria com filtros automáticos e lightbox (teclado, setas e deslize) · formulário que abre o WhatsApp com a mensagem pronta (não guarda dados) · mapa carregado só a pedido · `prefers-reduced-motion` respeitado · lazy loading · meta tags, Open Graph e JSON-LD.

## Testes realizados
Executados em Chromium (Playwright), em 1440×900 e 390×844: carregamento sem erros de JavaScript; ausência de scroll horizontal; menu móvel (abrir, navegar, fechar); régua (clique, setas, arrastar, texto e link de WhatsApp por classe); troca de fotografia nos eventos; scroll lateral da vida escolar; galeria, filtros e lightbox (setas, Esc, foco devolvido) usando fotografias de teste numa cópia temporária; remoção de fotos inexistentes; formulário (validação e URL de WhatsApp gerado); carregamento do mapa; inspeção visual de todas as secções.

**Não executados:** Lighthouse, validação W3C, teste em Safari/Firefox, teste em telemóveis físicos, abertura real do WhatsApp/Google Maps (o ambiente não tinha internet; verificou-se apenas que os URLs gerados estão corretos), e o carregamento das fontes Google Fonts (têm alternativas de sistema).

## Ideias seguintes
Fotografias reais; mensagem da direção; domínio próprio (atualizar `og:image` e acrescentar `canonical`).
