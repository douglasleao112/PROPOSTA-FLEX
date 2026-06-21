import { TrainingModule, TrainingImage, ImpactCard, AuthorityBadge } from './types';

export const IMPACT_CARDS: ImpactCard[] = [
  {
    id: 1,
    title: "Padronização técnica",
    description: "Condutas mais claras, seguras e alinhadas entre todas as unidades da Flex Fitness.",
    iconName: "ShieldCheck"
  },
  {
    id: 2,
    title: "Atendimento premium",
    description: "Correções precisas, orientações individualizadas e presença altamente ativa no salão.",
    iconName: "Sparkles"
  },
  {
    id: 3,
    title: "Retenção de alunos",
    description: "Mais vínculo, acompanhamento próximo e percepção constante de cuidado e valor.",
    iconName: "TrendingUp"
  },
  {
    id: 4,
    title: "Crescimento pela base ativa",
    description: "Alunos satisfeitos que indicam novos membros, permanecem por mais tempo e fortalecem o branding.",
    iconName: "Users"
  }
];

export const TRAINING_MODULES: TrainingModule[] = [
  {
    id: 1,
    title: "Módulo 1 — Biomecânica Glúteos e posteriores",
    category: "technical",
    description: "Biomecânica aplicada aos principais exercícios, ajustes técnicos, ativação muscular de glúteos e isquiotibiais, segurança articular e intervenções corretivas práticas no salão de musculação.",
    points: ["Ajustes no leg press e agachamentos", "Vetores de força para o glúteo máximo", "Saturação de carga vs execução", "Abordagem corretiva ativa e segura"]
  },
  {
    id: 2,
    title: "Módulo 2 — Biomecânica Quadríceps e panturrilhas",
    category: "technical",
    description: "Análise aprofundada de movimentos basais, posicionamento de pés, amplitude útil de movimento (ROM), controle da cadência da execução e individualização minuciosa dos ajustes nas máquinas e pesos livres.",
    points: ["Cadeira extensora e hack squat", "Análise de sobrecarga patelofemoral", "Biomecânica da articulação do tornozelo", "Estratégias de ativação neuromuscular"]
  },
  {
    id: 3,
    title: "Módulo 3 — Biomecânica Dorsais",
    category: "technical",
    description: "Biomecânica de puxadas, remadas, pegadas anatômicas, trajetórias de escapulas, postura correta e correções em tempo real para maximizar a ativação de latíssimo do dorso e trapézio, construindo autoridade técnica.",
    points: ["Puxadas verticais e remadas horizontais", "Função escapular no detalhe", "Abdução-depressão escapular", "Correções de ombro protuso em feedbacks dinâmicos"]
  },
  {
    id: 4,
    title: "Módulo 4 — Biomecânica Peitoral",
    category: "technical",
    description: "Pressões (supinos), crucifixos, inclinações, posicionamento e estabilidade escapular, amplitude produtiva e proteção articular nos exercícios mais demandados no salão.",
    points: ["Supinos com barra e halteres", "Crucifixos e polias de carga", "Estratégias para inibir compensação excessiva de deltoide anterior", "Amplitude ideal para máxima ativação peitoral"]
  },
  {
    id: 5,
    title: "Módulo 5 — Biomecânica Deltóides",
    category: "technical",
    description: "Prescrição e correção para os feixes anterior, medial e posterior do deltoide, biomecânica da elevação lateral, prevenção de lesões do manguito rotador e compensações posturais em sala.",
    points: ["Elevações laterais e frontais", "Ritmo escapuloumeral", "Exercícios para porção posterior", "Preservação da integridade subacromial"]
  },
  {
    id: 6,
    title: "Módulo 6 — Biomecânica Braços",
    category: "technical",
    description: "Bíceps e tríceps com foco no ajuste mecânico e posicionamento articular ideal, amplitude de contração, controle estratégico de carga e estímulo seguro de braquiais e porções do tríceps.",
    points: ["Flexões de cotovelo em banco inclinado vs polia", "Extensões francesas e corda", "Tensão contínua ao longo do movimento", "Uso inteligente de polias e gravidade"]
  },
  {
    id: 7,
    title: "Módulo 7 — Postura profissional",
    category: "soft-skills",
    description: "Desenvolvimento de postura de comando no salão, vestimenta, linguagem corporal, credibilidade proativa perante os alunos, proatividade em horários de pico e a construção de autoridade silenciosa e respeitável.",
    points: ["Linguagem corporal aberta e atenta", "Posicionamento espacial no salão", "Abordagem empática de alunos autônomos", "Superação da postura puramente reativa"]
  },
  {
    id: 8,
    title: "Módulo 8 — Comunicação intencional",
    category: "soft-skills",
    description: "Como abordar alunos sem parecer invasivo, perguntas abertas estratégicas, escuta ativa genuína e técnicas de rapport para criar conexões rápidas e sinceras durante os treinos.",
    points: ["Perguntas inteligentes de checagem", "Feedback positivo de acompanhamento", "Comunicação verbal clara e entusiasmada", "Criação de vínculo espontâneo e profissional"]
  },
  {
    id: 9,
    title: "Módulo 9 — Prevenção de churn",
    category: "business-retention",
    description: "Estratégias de monitoramento sutil para detectar desânimo ou falta de constância, microfeedbacks de incentivo, comemoração de pequenas conquistas e táticas operacionais para reacender o engajamento.",
    points: ["Identificação visual do aluno desmotivado", "Ponto de contato de resgate semanal", "Prescrição de metas curtas e superáveis", "Sinalização rápida para a recepção/gerência"]
  },
  {
    id: 10,
    title: "Módulo 10 — Técnica como valor percebido",
    category: "business-retention",
    description: "Como converter uma simples instrução ou correção biomecânica em um atendimento exclusivo e personalizado, fazendo com que o aluno sinta que está recebendo atenção digna de um personal trainer.",
    points: ["Personalização sutil no atendimento coletivo", "Explicações científicas descomplicadas e memoráveis", "Ajuste manual com consentimento e maestria", "Aumento instantâneo do valor da mensalidade aos olhos do cliente"]
  },
  {
    id: 11,
    title: "Módulo 11 — Comunidade e pertencimento",
    category: "soft-skills",
    description: "Como gerar um ambiente de acolhimento mútuo, apresentação mútua de alunos da sala, estimulação de desafios coletivos saudáveis nas unidades, eventos esportivos internos e de convivência.",
    points: ["Quebra de gelo entre alunos próximos", "Integração de novos matriculados", "Fomento à cultura corporativa amigável da Flex", "Criação de redes de amizade no próprio horário do treino"]
  },
  {
    id: 12,
    title: "Módulo 12 — Indicação estratégica",
    category: "business-retention",
    description: "Como impulsionar indicações naturais de amigos e familiares a partir de relacionamentos autênticos baseados em resultados comprovados, gratidão recíproca e prova social de entrega profissional.",
    points: ["Gatilho da reciprocidade no atendimento", "Abordagem sutil de elogio: 'Quem você conhece que gostaria dessa atenção?'", "Campanhas internas de embaixadores voluntários", "Valorização pública do aluno indicador"]
  }
];

export const TRAINING_IMAGES: TrainingImage[] = [
  {
    url: "https://i.ibb.co/FL25Zfgy/unnamed.jpg",
    title: "Sinergia e Teoria Aplicada",
    description: "Alineamento estratégico e engajamento teórico com a equipe de profissionais da Flex."
  },
  {
    url: "https://i.ibb.co/0RyX9Qzk/flex-1.jpg",
    title: "Postura e Posicionamento",
    description: "Alinhamento das condutas operacionais em sala de musculação."
  },
  {
    url: "https://i.ibb.co/cXJNSXP4/flex2.jpg",
    title: "Intervenção Biomecânica Coletiva",
    description: "Treinamentos práticos diretos sobre ergonomia e eixos de força."
  },
  {
    url: "https://i.ibb.co/4nBH0hQd/flex3.jpg",
    title: "Aperfeiçoamento Técnico em Grupo",
    description: "Instrução coletiva de professores replicando os movimentos corretos."
  },
  {
    url: "https://i.ibb.co/bRRQ9YxD/flex4.jpg",
    title: "Estratégia e Integração",
    description: "Reunião de docentes focando no aumento de valor percebido do aluno."
  },
  {
    url: "https://i.ibb.co/ycVJ5Y7C/flex5-copy.jpg",
    title: "Correções Práticas com Precisão",
    description: "Treinamento hands-on em equipamentos de tração e polia."
  },
  {
    url: "https://i.ibb.co/5pF9VBD/flex6.jpg",
    title: "Biomecânica nos Detalhes",
    description: "Demonstração de vetores e análise de sobrecarga de joelho."
  },
  {
    url: "https://i.ibb.co/8L4ZrrVY/flex7.jpg",
    title: "Evolução Científica Recíproca",
    description: "Douglas Leão transmitindo metodologias baseadas em evidências para o time de pista."
  },
  {
    url: "https://i.ibb.co/Z1fZh5yN/flex8.jpg",
    title: "Liderança de Execução Eficiente",
    description: "Diretrizes práticas de liderança no salão de treino para estagiários."
  },
  {
    url: "https://i.ibb.co/N2VdzbwP/flex9.jpg",
    title: "Fisiopatologias do Treinamento",
    description: "Prevenção de lesões e prescrição sob medida para grupos especiais."
  },
  {
    url: "https://i.ibb.co/39BVqBLx/flex10.jpg",
    title: "Qualificação e Credenciamento",
    description: "Certificação e capacitação contínua fortalecendo a confiança dos alunos."
  },
  {
    url: "https://i.ibb.co/1f02f7mH/flex11.jpg",
    title: "Atitude, Foco e Relacionamento",
    description: "A sinergia perfeita entre a ciência científica esportiva e o carisma operacional."
  },
  {
    url: "https://i.ibb.co/BHj7YvG7/IMG-0253.png",
    title: "Condução com Douglas Leão",
    description: "Instantes de engajamento dinâmico demonstrando exercícios avançados."
  },
  {
    url: "https://i.ibb.co/4RtV4cvN/IMG-0642.png",
    title: "Foco Operacional e Padronização",
    description: "Professores imersos nos processos metodológicos premium."
  }
];

export const AUTHORITIES: AuthorityBadge[] = [
  { title: "Doutor e pesquisador pela UCB", sub: "" },
  { title: "Nutricionista esportivo pelo Colégio Americano de Medicina do Esporte", sub: "" },
  { title: "Especialista em treinamento personalizado e Fisiculturistas", sub: "" },
  { title: "Docente de ensino superior e pós graduação", sub: "" },
  { title: "Revisor da Revista Brasileira de Ciência do Movimento", sub: "" },
  { title: "Consultor Empresarial para Academias", sub: "" }
];

export const METHODOLOGY_STEPS = [
  {
    step: "01",
    title: "Conceito aplicado",
    description: "Explicação objetiva da base científica de biomecânica e comportamento, focando na prática."
  },
  {
    step: "02",
    title: "Demonstração prática",
    description: "Aplicação demonstrando ajustes finos, posicionamentos de pés/mãos e eixos de torque em equipamentos."
  },
  {
    step: "03",
    title: "Correção em contexto de sala",
    description: "Simulação direta de abordagens de sala com os próprios professores atuando como alunos."
  },
  {
    step: "04",
    title: "Transferência para o atendimento",
    description: "Correção estratégica para aumentar retenção e reduzir evasão acadêmica."
  }
];

export const BENEFITS = [
  {
    title: "Melhora drástica na experiência do aluno",
    description: "Mudança instantânea de um salão com professores dispersos para um ecossistema de cuidado profissional ativo e apaixonado."
  },
  {
    title: "Aumento marcante da confiança na equipe",
    description: "Alunos percebem que a equipe de salão possui o mesmo linguajar científico de alto nível de um personal trainer de elite."
  },
  {
    title: "Fim dos atendimentos genéricos e robotizados",
    description: "Professores passam a prescrever e orientar demonstrando individualidade, olhar direcionado e paixão pela excelência de movimento."
  },
  {
    title: "Padronização absoluta entre as unidades da Flex",
    description: "A mesma linguagem técnica refinada, acolhedora e proativa será vivenciada pelo aluno em qualquer unidade da rede."
  },
  {
    title: "Elevação natural da Retenção (Redução de Churn)",
    description: "Cada ponto de contato estratégico funciona como um forte selo de fidelidade emocional, mantendo o aluno engajado à marca."
  },
  {
    title: "Estímulo espontâneo de novas indicações",
    description: "Com o aumento do valor percebido, os clientes se tornam promotores orgânicos, recomendando a Flex Fitness ativamente."
  }
];
