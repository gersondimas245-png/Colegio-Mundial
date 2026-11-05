/* ==========================================================================
   FOTOGRAFIAS DO COLÉGIO MUNDIAL — ficheiro de configuração
   --------------------------------------------------------------------------
   O website só carrega as fotografias listadas aqui. Enquanto uma fotografia
   não estiver listada, o espaço mostra uma moldura identificada como
   "fotografia por inserir" (nunca uma imagem quebrada).

   COMO ADICIONAR UMA FOTOGRAFIA
   1. Copie o ficheiro (JPG ou WebP, idealmente com menos de 400 KB e
      largura entre 1400 e 2000 px) para a pasta  assets/images/photos/
   2. Escreva o nome do ficheiro no espaço correspondente em "slots"
      (secções do site) ou acrescente uma linha em "gallery" (galeria).
   3. Só publique fotografias que o colégio tenha autorização para usar,
      incluindo o consentimento adequado para imagens de menores.

   ESPAÇOS DO SITE (slots) E O QUE MOSTRAM
   hero            Abertura do site, formato horizontal, ocupa o ecrã todo
   escola          Secção «A escola», vertical (4:5)
   escola-alunos   Secção «A escola», circular
   historia        Secção «História», vertical
   vida-futebol, vida-educacao-fisica, vida-xadrez, vida-aula
                   Secção «Vida escolar», quatro painéis verticais
   evento-convencao-2026, evento-abertura-2026, evento-graduacao-2015
                   Secção «Eventos», aparecem ao passar o rato / focar o evento
   comunidade      Secção «Comunidade», circular
   direcao         Secção «Direção», retrato vertical (3:4)

   GALERIA: cada entrada tem  file, cat (categoria), alt (descrição curta da
   imagem) e, opcionalmente, size: 'wide' | 'tall' | 'big'.
   ========================================================================== */
window.CM_PHOTOS = {
  slots: {
    // 'hero': 'hero.jpg',
    // 'escola': 'escola-fachada.jpg',
    // 'escola-alunos': 'escola-alunos.jpg',
    // 'historia': 'historia-arquivo.jpg',
    // 'vida-futebol': 'vida-futebol.jpg',
    // 'vida-educacao-fisica': 'vida-educacao-fisica.jpg',
    // 'vida-xadrez': 'vida-xadrez.jpg',
    // 'vida-aula': 'vida-aula.jpg',
    // 'evento-convencao-2026': 'evento-convencao-2026.jpg',
    // 'evento-abertura-2026': 'evento-abertura-2026.jpg',
    // 'evento-graduacao-2015': 'evento-graduacao-2015.jpg',
    // 'comunidade': 'comunidade.jpg',
    // 'direcao': 'direcao-retrato.jpg'
  },
  gallery: [
    // Imagem fornecida pelo colégio (já incluída):
    { src: 'assets/images/brand/capa-colegio-mundial.jpg', cat: 'Identidade', size: 'wide',
      alt: 'Capa do Colégio Mundial: bandeira de Moçambique e globo rodeados por material escolar' }
    // Exemplos para acrescentar (retire as barras // e ajuste):
    // { file: 'gal-abertura-01.jpg', cat: 'Eventos', alt: 'Abertura do ano letivo de 2026', size: 'big' },
    // { file: 'gal-aula-01.jpg', cat: 'Sala de aula', alt: 'Alunos durante uma aula', size: 'tall' },
    // { file: 'gal-xadrez-01.jpg', cat: 'Desporto', alt: 'Aula de xadrez' },
    // { file: 'gal-comunidade-01.jpg', cat: 'Comunidade', alt: 'Iniciativa comunitária' },
    // { file: 'gal-instalacoes-01.jpg', cat: 'Instalações', alt: 'Instalações do colégio', size: 'wide' }
  ]
};
