/**
 * ============================================
 * DADOS DO QUIZ - PERGUNTAS E RESULTADOS
 * ============================================
 *
 * Edite este arquivo para alterar:
 * - Perguntas e alternativas
 * - Respostas corretas
 * - Feedback por alternativa
 * - Textos dos resultados
 * - Textos da tela de abertura
 * - Textos de transição para o vídeo
 *
 * NÃO EDITE a estrutura de tipos se não entender TypeScript.
 */

export type AlternativeKey = 'A' | 'B' | 'C' | 'D'

export interface Alternative {
  key: AlternativeKey
  text: string
  isCorrect: boolean
  feedback: string
}

export interface Question {
  id: number
  text: string
  alternatives: Alternative[]
}

export interface ResultLevel {
  minScore: number
  maxScore: number
  title: string
  description: string
}

export interface QuizContent {
  opening: {
    headline: string
    subheadline: string
    introText: string
    buttonText: string
  }
  questions: Question[]
  videoTransition: {
    headline: string
    text: string
  }
  results: ResultLevel[]
  cta: {
    buttonText: string
    url: string
  }
  form: {
    namePlaceholder: string
    emailPlaceholder: string
    phonePlaceholder: string
    submitButtonText: string
    successMessage: string
    errorMessage: string
  }
}

export const quizData: QuizContent = {
  // ==========================================
  // TELA DE ABERTURA
  // ==========================================

  opening: {
    headline: 'Descubra seu nível de especialista na Bíblia',
    subheadline: 'Você realmente conhece a Bíblia?',
    introText: 'Responda ao teste abaixo e descubra se o seu conhecimento bíblico está no nível iniciante, intermediário, avançado ou especialista.\n\nMas atenção: este não é um teste de "memória bíblica".\n\nAs perguntas abaixo avaliam se você consegue entender os livros da Bíblia dentro do seu contexto, identificar conexões entre Antigo e Novo Testamento, reconhecer temas centrais e perceber como a história bíblica se desenvolve de Gênesis a Apocalipse.',
    buttonText: 'Começar o teste',
  },

  // ==========================================
  // PERGUNTAS (15 questões)
  // ==========================================

  questions: [
    {
      id: 1,
      text: 'Qual é o principal papel de Gênesis dentro da estrutura da Bíblia?',
      alternatives: [
        {
          key: 'A',
          text: 'Apresentar a origem do mundo, da humanidade, do pecado, das nações e da promessa',
          isCorrect: true,
          feedback: 'Correto. Gênesis é o livro das origens. Ele apresenta os fundamentos da narrativa bíblica: criação, queda, juízo, nações, promessa e a linhagem por meio da qual o Messias viria.',
        },
        {
          key: 'B',
          text: 'Explicar o sistema de sacrifícios, sacerdócio, pureza e adoração de Israel',
          isCorrect: false,
          feedback: 'Essa descrição se aproxima mais de Levítico, onde aparecem com força os temas de sacrifício, sacerdócio, pureza e santidade.',
        },
        {
          key: 'C',
          text: 'Narrar a libertação do povo hebreu e a entrega da Lei no monte Sinai',
          isCorrect: false,
          feedback: 'Essa é a função de Êxodo. Ele narra a libertação de Israel do Egito, a aliança no Sinai e a construção do tabernáculo.',
        },
        {
          key: 'D',
          text: 'Organizar os cânticos, provérbios e orações usados no culto de Israel',
          isCorrect: false,
          feedback: 'Essa descrição se aproxima mais da literatura poética e sapiencial, especialmente Salmos e Provérbios.',
        },
      ],
    },
    {
      id: 2,
      text: 'Qual destas sequências representa melhor o movimento narrativo dos cinco primeiros livros da Bíblia?',
      alternatives: [
        {
          key: 'A',
          text: 'Criação, patriarcas, libertação, aliança, deserto e preparação para a terra',
          isCorrect: true,
          feedback: 'Correto. Essa sequência resume bem o movimento da Torá: Gênesis, Êxodo, Levítico, Números e Deuteronômio.',
        },
        {
          key: 'B',
          text: 'Reino unido, divisão do reino, exílio, retorno e reconstrução do templo',
          isCorrect: false,
          feedback: 'Essa sequência descreve melhor a história posterior de Israel, especialmente de Samuel até Esdras e Neemias.',
        },
        {
          key: 'C',
          text: 'Profecias, louvor, provérbios e reflexão sobre a vaidade da vida',
          isCorrect: false,
          feedback: 'Essa sequência mistura profecia e Novo Testamento, mas não corresponde aos cinco primeiros livros da Bíblia.',
        },
        {
          key: 'D',
          text: 'Evangelhos, cartas apostólicas, Apocalipse e epílogo',
          isCorrect: false,
          feedback: 'Essa alternativa descreve temas da literatura sapiencial e poética, como Jó, Salmos, Provérbios e Eclesiastes.',
        },
      ],
    },
    {
      id: 3,
      text: 'Qual livro apresenta a frase "cada um fazia o que parecia certo aos seus próprios olhos" como resumo espiritual de uma época?',
      alternatives: [
        {
          key: 'A',
          text: 'Josué',
          isCorrect: false,
          feedback: 'Josué mostra a entrada e a conquista da terra. O tom do livro é mais ligado ao cumprimento da promessa do que ao colapso moral repetido.',
        },
        {
          key: 'B',
          text: 'Juízes',
          isCorrect: true,
          feedback: 'Correto. Juízes retrata um ciclo de pecado, opressão, clamor e livramento, mostrando a decadência espiritual de Israel antes da monarquia.',
        },
        {
          key: 'C',
          text: '1 Samuel',
          isCorrect: false,
          feedback: '1 Samuel mostra a transição entre o período dos juízes e a monarquia, com Samuel, Saul e Davi.',
        },
        {
          key: 'D',
          text: '1 Reis',
          isCorrect: false,
          feedback: '1 Reis trata do reinado de Salomão, da divisão do reino e do início da decadência espiritual mais ampla de Israel e Judá.',
        },
      ],
    },
    {
      id: 4,
      text: 'Qual é a principal importância de Rute dentro da narrativa bíblica?',
      alternatives: [
        {
          key: 'A',
          text: 'Explicar a origem dos levitas e a organização do sacerdócio',
          isCorrect: false,
          feedback: 'Essa ênfase pertence mais a livros como Êxodo, Levítico e Números, onde sacerdócio e levitas aparecem com mais força.',
        },
        {
          key: 'B',
          text: 'Mostrar a linhagem que conecta Boaz, Davi e futuramente Cristo',
          isCorrect: true,
          feedback: 'Correto. Rute parece uma história familiar pequena, mas tem peso messiânico porque entra na linhagem de Davi e de Jesus.',
        },
        {
          key: 'C',
          text: 'Narrar o retorno dos judeus do exílio babilônico para Jerusalém',
          isCorrect: false,
          feedback: 'O retorno do exílio aparece principalmente em Esdras e Neemias.',
        },
        {
          key: 'D',
          text: 'Apresentar a divisão do reino entre Israel ao norte e Judá ao sul',
          isCorrect: false,
          feedback: 'A divisão do reino acontece depois de Salomão e é narrada em Reis e Crônicas.',
        },
      ],
    },
    {
      id: 5,
      text: 'Qual profeta é conhecido por anunciar o "Servo Sofredor" e contém algumas das profecias messiânicas mais explícitas do Antigo Testamento?',
      alternatives: [
        {
          key: 'A',
          text: 'Isaías',
          isCorrect: true,
          feedback: 'Correto. Isaías é central para entender a esperança messiânica no Antigo Testamento, especialmente por textos como Isaías 53.',
        },
        {
          key: 'B',
          text: 'Jonas',
          isCorrect: false,
          feedback: 'Jonas é mais conhecido por sua missão a Nínive e pelo sinal que Jesus relaciona à sua morte e ressurreição.',
        },
        {
          key: 'C',
          text: 'Amós',
          isCorrect: false,
          feedback: 'Amós denuncia injustiça, corrupção religiosa e infidelidade social em Israel.',
        },
        {
          key: 'D',
          text: 'Malaquias',
          isCorrect: false,
          feedback: 'Malaquias confronta a frieza espiritual do povo e anuncia a vinda do mensageiro que prepararia o caminho.',
        },
      ],
    },
    {
      id: 6,
      text: 'Qual é a melhor forma de entender os profetas bíblicos?',
      alternatives: [
        {
          key: 'A',
          text: 'Como líderes políticos que tentavam restaurar o trono de Israel por estratégia militar',
          isCorrect: false,
          feedback: 'Os profetas muitas vezes confrontavam reis e nações, mas sua missão não era primariamente política ou militar.',
        },
        {
          key: 'B',
          text: 'Como mensageiros da aliança que denunciavam pecado, anunciavam juízo e apontavam esperança',
          isCorrect: true,
          feedback: 'Correto. Os profetas chamavam o povo de volta à aliança, denunciavam a infidelidade e anunciavam juízo, restauração e esperança messiânica.',
        },
        {
          key: 'C',
          text: 'Como autores devocionais que escreviam reflexões pessoais para uso no templo',
          isCorrect: false,
          feedback: 'Essa descrição se aproxima mais de alguns textos poéticos ou devocionais, mas não define a função profética.',
        },
        {
          key: 'D',
          text: 'Como intérpretes da Lei que evitavam falar sobre acontecimentos futuros',
          isCorrect: false,
          feedback: 'Os profetas interpretavam a aliança e também anunciavam acontecimentos futuros. Reduzi-los a uma dessas coisas empobrece sua função.',
        },
      ],
    },
    {
      id: 7,
      text: 'Qual Evangelho começa apresentando Jesus por meio de uma genealogia que destaca Abraão e Davi?',
      alternatives: [
        {
          key: 'A',
          text: 'Mateus',
          isCorrect: true,
          feedback: 'Correto. Mateus apresenta Jesus como filho de Davi e filho de Abraão, conectando o Messias às promessas feitas no Antigo Testamento.',
        },
        {
          key: 'B',
          text: 'Marcos',
          isCorrect: false,
          feedback: 'Marcos começa de forma mais direta, com João Batista e o início do ministério público de Jesus.',
        },
        {
          key: 'C',
          text: 'Lucas',
          isCorrect: false,
          feedback: 'Lucas também traz uma genealogia, mas em outro ponto e com uma ênfase mais ampla na humanidade de Jesus.',
        },
        {
          key: 'D',
          text: 'João',
          isCorrect: false,
          feedback: 'João começa com uma abertura teológica profunda sobre o Verbo eterno, não com uma genealogia.',
        },
      ],
    },
    {
      id: 8,
      text: 'Qual é uma das principais ênfases do Evangelho de João em comparação com os Evangelhos Sinóticos?',
      alternatives: [
        {
          key: 'A',
          text: 'Apresentar longos discursos e sinais que revelam a identidade divina de Cristo',
          isCorrect: true,
          feedback: 'Correto. João enfatiza sinais, discursos e declarações que revelam Jesus como o Filho de Deus e o Verbo encarnado.',
        },
        {
          key: 'B',
          text: 'Organizar principalmente parábolas curtas sobre o Reino dos céus',
          isCorrect: false,
          feedback: 'Essa descrição se aproxima mais de Mateus, que dá grande ênfase ao Reino dos céus e reúne muitos ensinos de Jesus.',
        },
        {
          key: 'C',
          text: 'Narrar a infância de Jesus com detalhes sobre Maria, José e os pastores',
          isCorrect: false,
          feedback: 'Os detalhes da infância de Jesus aparecem principalmente em Mateus e Lucas, não em João.',
        },
        {
          key: 'D',
          text: 'Mostrar a genealogia de Jesus desde Abraão até José',
          isCorrect: false,
          feedback: 'A genealogia desde Abraão aparece em Mateus. João não começa pela linhagem terrena, mas pela eternidade do Verbo.',
        },
      ],
    },
    {
      id: 9,
      text: 'Qual livro narra a expansão da Igreja, de Jerusalém até os gentios, destacando a ação do Espírito Santo?',
      alternatives: [
        {
          key: 'A',
          text: 'Romanos',
          isCorrect: false,
          feedback: 'Romanos apresenta uma exposição profunda do evangelho, da justiça de Deus, da fé e da vida em Cristo.',
        },
        {
          key: 'B',
          text: 'Atos',
          isCorrect: true,
          feedback: 'Correto. Atos mostra a expansão da Igreja, a descida do Espírito Santo, a missão apostólica e a chegada do evangelho aos gentios.',
        },
        {
          key: 'C',
          text: 'Gálatas',
          isCorrect: false,
          feedback: 'Gálatas confronta a tentativa de adicionar obras da Lei como condição para justificação.',
        },
        {
          key: 'D',
          text: 'Hebreus',
          isCorrect: false,
          feedback: 'Hebreus mostra a superioridade de Cristo em relação a anjos, Moisés, sacerdócio, sacrifícios e antiga aliança.',
        },
      ],
    },
    {
      id: 10,
      text: 'Qual é o tema central da carta aos Gálatas?',
      alternatives: [
        {
          key: 'A',
          text: 'A superioridade de Cristo sobre o sacerdócio levítico',
          isCorrect: false,
          feedback: 'Essa é uma ênfase central de Hebreus, não de Gálatas.',
        },
        {
          key: 'B',
          text: 'A justificação pela fé contra a imposição das obras da Lei',
          isCorrect: true,
          feedback: 'Correto. Gálatas defende que o homem é justificado pela fé em Cristo, e não pelas obras da Lei.',
        },
        {
          key: 'C',
          text: 'A ordem dos dons espirituais no culto público',
          isCorrect: false,
          feedback: 'Essa discussão aparece com força em 1 Coríntios, especialmente nos capítulos sobre dons e culto.',
        },
        {
          key: 'D',
          text: 'A esperança cristã diante da perseguição imperial',
          isCorrect: false,
          feedback: 'Essa ênfase aparece mais em cartas como 1 Pedro e também no pano de fundo de Apocalipse.',
        },
      ],
    },
    {
      id: 11,
      text: 'Qual é a principal ênfase da carta aos Hebreus?',
      alternatives: [
        {
          key: 'A',
          text: 'Cristo é superior e cumpre aquilo que o sistema antigo apontava',
          isCorrect: true,
          feedback: 'Correto. Hebreus mostra a superioridade de Cristo sobre anjos, Moisés, sacerdotes, sacrifícios e antiga aliança.',
        },
        {
          key: 'B',
          text: 'A igreja deve corrigir abusos nos dons espirituais',
          isCorrect: false,
          feedback: 'Essa é uma preocupação muito presente em 1 Coríntios.',
        },
        {
          key: 'C',
          text: 'O cristão deve se alegrar apesar do sofrimento na prisão',
          isCorrect: false,
          feedback: 'Essa ênfase aparece em Filipenses, escrita em contexto de prisão e marcada pelo tema da alegria em Cristo.',
        },
        {
          key: 'D',
          text: 'A fé deve ser defendida contra falsos mestres sensuais',
          isCorrect: false,
          feedback: 'Essa descrição se aproxima mais de Judas e de 2 Pedro.',
        },
      ],
    },
    {
      id: 12,
      text: 'Qual livro do Novo Testamento organiza de forma mais ampla a doutrina da justificação, da graça, da fé, da vida no Espírito e do lugar de Israel no plano de Deus?',
      alternatives: [
        {
          key: 'A',
          text: 'Romanos',
          isCorrect: true,
          feedback: 'Correto. Romanos é uma das exposições mais profundas do evangelho, tratando da justiça de Deus, da fé, da graça, da vida no Espírito e do plano de Deus para judeus e gentios.',
        },
        {
          key: 'B',
          text: 'Filemom',
          isCorrect: false,
          feedback: 'Filemom é uma carta breve e pessoal, ligada ao caso de Onésimo.',
        },
        {
          key: 'C',
          text: '2 João',
          isCorrect: false,
          feedback: '2 João é uma carta curta, com foco em verdade, amor e cuidado contra falsos ensinos.',
        },
        {
          key: 'D',
          text: 'Judas',
          isCorrect: false,
          feedback: 'Judas é uma advertência contra falsos mestres e um chamado à perseverança na fé.',
        },
      ],
    },
    {
      id: 13,
      text: 'Qual é uma leitura mais adequada do livro de Apocalipse dentro do panorama bíblico?',
      alternatives: [
        {
          key: 'A',
          text: 'Um livro isolado, escrito apenas para satisfazer curiosidade sobre o fim do mundo',
          isCorrect: false,
          feedback: 'Apocalipse fala sobre o fim, mas não existe apenas para alimentar curiosidade. É uma revelação de Jesus Cristo e da vitória final de Deus.',
        },
        {
          key: 'B',
          text: 'Uma revelação de Cristo, cheia de imagens ligadas ao Antigo Testamento e à consumação da história',
          isCorrect: true,
          feedback: 'Correto. Apocalipse está profundamente conectado ao Antigo Testamento e mostra a consumação da história bíblica.',
        },
        {
          key: 'C',
          text: 'Um manual cronológico simples, sem relação com os profetas do Antigo Testamento',
          isCorrect: false,
          feedback: 'Apocalipse tem relação intensa com profetas como Daniel, Ezequiel, Isaías e Zacarias.',
        },
        {
          key: 'D',
          text: 'Uma coleção de símbolos desconectados, impossível de ser compreendida com seriedade',
          isCorrect: false,
          feedback: 'Apocalipse é simbólico e complexo, mas não é desconectado. O panorama bíblico ajuda a interpretar suas imagens com mais clareza.',
        },
      ],
    },
    {
      id: 14,
      text: 'Qual destas opções expressa melhor a relação entre o Éden, o tabernáculo, o templo, Cristo, a Igreja e a Nova Jerusalém?',
      alternatives: [
        {
          key: 'A',
          text: 'São temas independentes, usados em contextos diferentes sem uma linha comum',
          isCorrect: false,
          feedback: 'Há uma linha comum entre esses temas. A Bíblia começa com Deus habitando com o homem e termina com Deus habitando plenamente com seu povo.',
        },
        {
          key: 'B',
          text: 'São espaços sagrados que apontam para a presença de Deus habitando com o seu povo',
          isCorrect: true,
          feedback: 'Correto. Essa conexão mostra como a presença de Deus é um dos grandes fios condutores da Escritura.',
        },
        {
          key: 'C',
          text: 'São símbolos exclusivos do Antigo Testamento, sem relação direta com o Novo',
          isCorrect: false,
          feedback: 'Cristo, a Igreja e a Nova Jerusalém mostram que esse tema atravessa também o Novo Testamento.',
        },
        {
          key: 'D',
          text: 'São imagens poéticas sem importância para entender a narrativa bíblica',
          isCorrect: false,
          feedback: 'Essas imagens são teologicamente importantes e ajudam a enxergar a unidade da Bíblia.',
        },
      ],
    },
    {
      id: 15,
      text: 'Quando Jesus diz que as Escrituras testificam dele, isso significa que:',
      alternatives: [
        {
          key: 'A',
          text: 'Apenas os Evangelhos falam de Jesus de forma verdadeira',
          isCorrect: false,
          feedback: 'Os Evangelhos falam diretamente de Jesus, mas o testemunho sobre Cristo começa antes deles.',
        },
        {
          key: 'B',
          text: 'O Antigo Testamento deve ser lido buscando promessas, tipos, sombras e cumprimentos em Cristo',
          isCorrect: true,
          feedback: 'Correto. Cristo é o centro da Escritura. Isso não autoriza interpretações forçadas, mas nos ensina a perceber como promessas, tipos e padrões encontram cumprimento nele.',
        },
        {
          key: 'C',
          text: 'Todo texto bíblico deve ser interpretado como uma alegoria direta sobre Jesus',
          isCorrect: false,
          feedback: 'Essa resposta exagera. Ler Cristo em toda a Bíblia não significa transformar cada detalhe em alegoria.',
        },
        {
          key: 'D',
          text: 'As cartas apostólicas são mais importantes do que a Lei e os Profetas',
          isCorrect: false,
          feedback: 'A Bíblia deve ser lida como uma unidade. Lei, Profetas, Escritos, Evangelhos e Cartas se conectam no plano de Deus.',
        },
      ],
    },
  ],

  // ==========================================
  // TRANSIÇÃO PARA O VÍDEO DO PITCH
  // ==========================================

  videoTransition: {
    headline: 'Antes de você sair, eu quero falar com o seu coração.',
    text: `Parabéns por ter chegado até aqui.

Mas agora, mais importante do que o seu resultado, eu quero te fazer uma pergunta:

Você está satisfeito com a forma como lê a Bíblia hoje?

Quando você abre a Palavra de Deus, você sente que está mergulhando em algo vivo, profundo e transformador?

Ou, muitas vezes, você lê… mas sente que ainda fica na superfície?

Talvez você ame a Bíblia.
Talvez você tenha anos de igreja.
Talvez você já conheça muitas histórias.

Mas, no fundo, você sabe que existe mais.

Mais profundidade.
Mais clareza.
Mais entendimento.
Mais prazer em ler.
Mais segurança para explicar a Palavra para a sua família, para seus filhos, para seus discípulos, para pessoas que Deus colocou perto de você.

Porque a Bíblia não foi feita para ficar distante.
Ela não foi feita para ser um livro que você respeita, mas não consegue compreender como gostaria.
Ela foi dada por Deus para iluminar o seu caminho, alimentar a sua fé e revelar Cristo em cada página.

E é isso que eu quero te mostrar no vídeo abaixo.

Assista agora, porque nos próximos minutos eu quero te mostrar por que tantos cristãos amam a Bíblia, mas ainda não conseguem extrair dela tudo o que Deus colocou ali — e como isso pode mudar a partir de hoje.`,
  },

  // ==========================================
  // RESULTADOS
  // ==========================================

  results: [
    {
      minScore: 0,
      maxScore: 4,
      title: 'Leitor Iniciante',
      description: `Parabéns por concluir o teste.

Você está no começo de uma jornada importante: conhecer melhor a Bíblia e entender como suas histórias se conectam.

Algumas perguntas podem ter sido difíceis, mas isso é normal. Todo crescimento começa quando percebemos o que ainda podemos aprender.

O seu resultado mostra que há muitos fundamentos bíblicos para descobrir, e que você tem a oportunidade de avançar com mais clareza a partir de agora.`,
    },
    {
      minScore: 5,
      maxScore: 8,
      title: 'Leitor em Desenvolvimento',
      description: `Muito bom.

Você já tem familiaridade com a Bíblia e conhece personagens, livros e acontecimentos importantes. Existe uma base real aí.

Ao mesmo tempo, o resultado mostra que ainda há espaço para organizar melhor os contextos, períodos, conexões e temas centrais da Escritura.

Você já começou bem. Agora pode dar o próximo passo.`,
    },
    {
      minScore: 9,
      maxScore: 12,
      title: 'Leitor Avançado',
      description: `Excelente resultado.

Você demonstrou um conhecimento bíblico acima da média e já consegue identificar conexões importantes dentro da Escritura.

Isso mostra leitura, atenção e familiaridade com a Palavra.

Agora, o próximo nível é transformar esse conhecimento em uma visão ainda mais clara do todo: livro por livro, contexto por contexto, de Gênesis a Apocalipse.`,
    },
    {
      minScore: 13,
      maxScore: 15,
      title: 'Especialista em Construção',
      description: `Impressionante.

Seu resultado mostra um conhecimento bíblico muito acima da média.

Você tem repertório, atenção e uma boa percepção da história bíblica. Poucas pessoas chegariam a esse nível.

E justamente por conhecer bem a Palavra, você sabe: sempre existe mais profundidade, mais contexto e mais beleza para descobrir nas Escrituras.`,
    },
  ],

  // ==========================================
  // CTA
  // ==========================================

  cta: {
    buttonText: 'Quero conhecer a Formação Panorama da Bíblia',
    url: process.env.NEXT_PUBLIC_CTA_URL || 'https://lamartine.reformadigital.org/pdb12-vd-org',
  },

  // ==========================================
  // FORMULÁRIO DE CAPTURA
  // ==========================================

  form: {
    namePlaceholder: 'Seu nome',
    emailPlaceholder: 'Seu melhor e-mail',
    phonePlaceholder: 'WhatsApp (com DDD)',
    submitButtonText: 'Ver meu resultado',
    successMessage: 'Resultado enviado! Agora descubra seu nível abaixo.',
    errorMessage: 'Ops! Algo deu errado. Tente novamente.',
  },
}

// ==========================================
// UTILIDADES
// ==========================================

/**
 * Retorna o resultado baseado na pontuação
 */
export function getResultByScore(score: number): ResultLevel {
  const result = quizData.results.find(
    (r) => score >= r.minScore && score <= r.maxScore
  )
  return result || quizData.results[0]
}

/**
 * Calcula a pontuação total
 */
export function calculateScore(answers: Record<number, AlternativeKey>): number {
  return quizData.questions.reduce((total, question) => {
    const userAnswer = answers[question.id]
    const correctAlternative = question.alternatives.find((alt) => alt.isCorrect)
    return total + (userAnswer === correctAlternative?.key ? 1 : 0)
  }, 0)
}

/**
 * Formata o número de acertos para exibição
 */
export function formatScore(score: number): string {
  return `${score} de ${quizData.questions.length}`
}
