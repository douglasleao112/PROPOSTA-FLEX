import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Search, 
  GraduationCap, 
  BookOpen, 
  Award, 
  CheckCircle, 
  PhoneCall, 
  Mail, 
  Globe, 
  Star, 
  ArrowUpRight, 
  ChevronRight, 
  Layers, 
  MessageSquare,
  ShieldAlert,
  Info
} from 'lucide-react';

import { TRAINING_MODULES, IMPACT_CARDS, AUTHORITIES, METHODOLOGY_STEPS } from './data';
import ModuloCard from './components/ModuloCard';
import TrainingGallery from './components/TrainingGallery';
import AnimatedCounter from './components/AnimatedCounter';


export default function App() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'trilha1' | 'trilha2'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedModuleId, setExpandedModuleId] = useState<number | null>(null);
  const [grayscaleAmount, setGrayscaleAmount] = useState(1);
  const [opacityAmount, setOpacityAmount] = useState(0.65);

  // Scroll tracking for progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
      
      const scrollY = window.scrollY;
      
      // Calculate grayscale from 1 (at scrollY = 0) to 0 (at scrollY = 450)
      const amount = Math.max(0, 1 - (scrollY / 450));
      setGrayscaleAmount(amount);

      // Opacity goes from 0.65 (at scrollY = 0) to 1.0 (at scrollY = 450)
      const op = Math.min(1.0, 0.45 + (scrollY / 450) * 0.35);
      setOpacityAmount(op);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Execute once to set initial values
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter modules based on search and category
  const filteredModules = TRAINING_MODULES.filter((mod) => {
    let matchesCategory = true;
    if (activeCategory === 'trilha1') {
      matchesCategory = mod.id <= 6;
    } else if (activeCategory === 'trilha2') {
      matchesCategory = mod.id >= 7;
    }
    const matchesSearch = 
      mod.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      mod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.points.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Direct actions trigger scroll
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-flex-deep text-white font-sans bg-grid-pattern overflow-hidden relative">
      
      {/* 1. TOP READING READING PROGRESS BAR */}
      <div 
        className="fixed top-0 left-0 h-1.5 bg-flex-red z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* FIXED FLOATING BACKGROUND LIGHT GRADIENTS (Sleek Theme) */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[80px] pointer-events-none -z-10" />
      <div className="absolute top-[40vh] right-10 w-[450px] h-[450px] bg-flex-red/5 rounded-full filter blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10vh] left-1/4 w-[600px] h-[600px] bg-indigo-950/20 rounded-full filter blur-[180px] pointer-events-none -z-10" />

      {/* 2. HEADER */}
      <header className="sticky top-0 bg-flex-deep/85 backdrop-blur-md border-b border-white/5 py-4 px-4 sm:px-6 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logos provided by instructions */}
            <div className="flex items-center gap-2">
              <img 
                src="https://i.ibb.co/S8XddB6/flex-para-fundo-escuro.png" 
                alt="Flex Fitness" 
                referrerPolicy="no-referrer"
                className="h-10 object-contain shrink-0 brightness-0 invert"
              />
              <div className="h-6 w-[1px] bg-white/20 hidden xs:block" />
              <div className="text-[10px] font-mono tracking-wider text-gray-400 uppercase hidden xs:block leading-tight">
                Diretoria<br />Proposal 2026
              </div>
            </div>
          </div>

         <nav className="hidden">
            <button onClick={() => scrollTo('impact-section')} className="hover:text-flex-red transition-colors duration-200">Impacto</button>
            <button onClick={() => scrollTo('about-section')} className="hover:text-flex-red transition-colors duration-200">Módulos</button>
            <button onClick={() => scrollTo('methodology-section')} className="hover:text-flex-red transition-colors duration-200">Condução</button>
            <button onClick={() => scrollTo('training-carousel')} className="hover:text-flex-red transition-colors duration-200">Histórico</button>
            <button onClick={() => scrollTo('about-douglas')} className="hover:text-flex-red transition-colors duration-200">Douglas Leão</button>
          </nav>

          <div className="flex items-center gap-3">
          </div>
        </div>
      </header>

      {/* 3. HERO PRINCIPAL */}
      <section className="relative pt-12 pb-20 md:py-24 px-4 sm:px-6 xl:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Titles */}
            <div className="space-y-2">
              <span className="font-mono text-sm tracking-[0.25em] text-flex-red font-bold uppercase block">
                PROPOSTA DE ENSINO • FLEX FITNESS
              </span>
              <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none italic uppercase">
                Plano de Ensino <span className="text-flex-red">2026</span>
              </h1>
            </div>

            {/* Subtitle / Elevator statement */}
            <div className="space-y-4">
              <h2 className="font-display text-lg sm:text-xl text-gray-300 font-medium border-l-2 border-flex-red pl-4 leading-relaxed">
                Uma formação prática para elevar o padrão técnico, humano e estratégico do atendimento em sala.
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl">
                Um programa modular para professores e estagiários, focado em biomecânica aplicada, postura profissional, comunicação, retenção e geração de valor percebido no atendimento diário aos alunos.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => scrollTo('impact-section')}
                className="py-3.5 px-8 rounded-full bg-flex-red text-white font-display font-bold text-xs hover:bg-red-650 shadow-lg shadow-flex-red/20 hover:shadow-flex-red/30 transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer uppercase tracking-wider"
              >
                Conhecer Proposta
              </button>
            </div>

          </div>

          {/* Right Presentation Visual Column */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex flex-col items-center justify-center pb-60 sm:pb-52 md:pb-56 lg:pb-48">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ed3024]/10 rounded-full filter blur-3xl pointer-events-none -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-indigo-800/20 rounded-full filter blur-3xl pointer-events-none -z-10" />
            
            {/* Outer dotted/grid decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none -z-10" />

            <div className="relative flex flex-col items-center">
              {/* Soft discreet black glow / shadow behind the image */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[320px] h-[360px] sm:h-[420px] bg-black/75 blur-3xl rounded-full pointer-events-none -z-10 mix-blend-multiply opacity-85" />
              
              {/* Standalone Transparent PNG Avatar style */}
              <div className="relative w-[92vw] sm:w-[420px] md:w-[450px] flex items-end drop-shadow-[0_15px_30px_rgba(0,0,0,0.95)]">
                <img 
                  src="https://i.ibb.co/YBzwtpsQ/douglas-Copia-Copia.png" 
                  alt="Douglas Leão" 
                  referrerPolicy="no-referrer"
                  loading="eager"
                  className="w-full h-auto max-h-[110%] object-contain select-none relative z-10 transition-all duration-300 hover:scale-[1.02]"
                  style={{ 
                    filter: `grayscale(${grayscaleAmount * 100}%)`,
                    opacity: opacityAmount 
                  }}
                />
              </div>

              {/* Glassmorphism/Mirror Credential Card overlapping the bottom of the photo */}
              <div className="absolute -bottom-60 sm:-bottom-40 md:-bottom-44 left-1/2 -translate-x-1/2 w-[72vw] sm:w-[440px] md:w-[460px] max-w-[340px] sm:max-w-none bg-slate-950/45 backdrop-blur-xl border border-white/15 rounded-3xl p-5 sm:p-6 space-y-4 text-left shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-20 hover:border-flex-red/30 transition-all duration-300">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2.5px] bg-[#ed3024] rounded-full" />
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[11px] text-flex-red uppercase tracking-widest font-black">Condução Técnica</span>
                    <h2 className="font-display font-black text-2xl sm:text-3xl text-white mt-0.5 leading-snug">
                      Douglas Leão
                    </h2>
                  </div>
                </div>
                
                <p className="text-gray-300 text-xs sm:text-[13px] font-medium border-l-2 border-flex-red pl-2.5 leading-relaxed italic">
                  "Transformando conhecimento em resultado, propósito em ação e pessoas em evolução."
                </p>

                {/* Structured authority points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {AUTHORITIES.map((item, idx) => (
                    <div key={idx} className="flex gap-2.5 items-center p-2.5 rounded-xl bg-white/5 border border-white/5 text-left hover:bg-white/10 hover:border-flex-red/25 transition-all duration-300">
                      <div className="w-5 h-5 rounded bg-flex-red/15 text-flex-red flex items-center justify-center shrink-0">
                        <Award className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-display font-bold text-white text-[11px] sm:text-xs leading-snug">{item.title}</h4>
                        {item.sub && (
                          <p className="text-gray-400 text-[9px] sm:text-[10px] leading-none mt-0.5">{item.sub}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. SEÇÃO DE IMPACTO (4 CARDS) */}
      <section className="py-20 border-t border-white/5 bg-flex-deep/80 relative" id="impact-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs text-flex-red uppercase tracking-widest font-bold">Pilares de Ensino</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-2 leading-tight">
              Mais técnica. Mais presença. Mais retenção.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {IMPACT_CARDS.map((card, idx) => {
              const renderIcon = (name: string, isWhiteCard: boolean) => {
                const iconClass = isWhiteCard ? "w-7 h-7 text-[#170d66]" : "w-7 h-7 text-indigo-300";
                switch(name) {
                  case 'ShieldCheck': return <ShieldCheck className={iconClass} />;
                  case 'Sparkles': return <Star className={iconClass} strokeWidth={2} />;
                  case 'TrendingUp': return <TrendingUp className={iconClass} />;
                  case 'Users': return <Users className={iconClass} />;
                  default: return <GraduationCap className={iconClass} />;
                }
              };

              // Customize styles per index according to "Sleek Interface" specs
              let cardStyle = "p-6 rounded-2xl flex flex-col justify-between shadow-xl min-h-[240px] transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden text-left h-full group";
              let textHeaderStyle = "font-black text-sm uppercase tracking-tight mb-2";
              let descStyle = "text-xs leading-relaxed opacity-95 mb-4";
              let footerIndexStyle = "text-3xl font-black";
              let isWhiteCard = false;

              if (idx === 0) {
                // Card 1: White Card
                cardStyle += " bg-white text-[#170d66] shadow-2xl";
                textHeaderStyle += " text-[#170d66]";
                descStyle += " text-[#170d66]/85";
                footerIndexStyle += " text-[#170d66]/20";
                isWhiteCard = true;
              } else if (idx === 3) {
                // Card 4: Solid Dark Blue Card
                cardStyle += " bg-gradient-to-br from-[#10094b] to-[#1b106e] border border-white/15 text-white shadow-2xl shadow-indigo-950/30";
                textHeaderStyle += " text-white";
                descStyle += " text-white/95";
                footerIndexStyle += " text-white/40";
              } else {
                // Cards 2 & 3: Translucent Backdrop blur Cards
                cardStyle += " bg-white/10 backdrop-blur-lg border border-white/20 text-white";
                textHeaderStyle += " text-blue-200 group-hover:text-flex-red transition-colors";
                descStyle += " text-gray-300";
                footerIndexStyle += " text-white/15";
              }

              return (
                <div key={card.id} className={cardStyle}>
                  {/* Removed decorative badge on top right */}
                  
                  <div>
                    <div className="mb-5 flex items-center">
                      {renderIcon(card.iconName, isWhiteCard)}
                    </div>
                    <h4 className={textHeaderStyle}>{card.title}</h4>
                    <p className={descStyle}>{card.description}</p>
                  </div>

                  <div className="flex justify-between items-end mt-4">
                    <span className="text-[10px] uppercase font-mono tracking-wider opacity-60">PILAR • 0{idx + 1}</span>
                    <div className={footerIndexStyle}>0{idx + 1}</div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. SEÇÃO UNIFICADA SOBRE A PROPOSTA E MÉTRICAS */}
      <section className="py-24 bg-white text-slate-900 bg-grid-pattern-dark relative border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Graphics */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="w-full max-w-md bg-flex-deep border border-white/15 rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[250px] sm:min-h-[280px] shadow-2xl group">
                {/* Decorative Grid inside */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                
                {/* Glass Mirror Shine Effect */}
                <div className="absolute inset-y-0 w-2/3 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none z-20 animate-shine" />
                
                <div className="flex justify-between items-center z-10">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-flex-red" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500/20" />
                  </div>
                </div>
 
                {/* Big Core Quote */}
                <div className="my-auto py-4 text-left z-10">
                  <span className="text-flex-red font-semibold font-mono text-xs block mb-1">PROPOSTA DE VALOR</span>
                  <blockquote className="font-display font-bold text-lg md:text-xl text-white leading-snug">
                    "Quando o aluno percebe cuidado, ele permanece mais, confia mais e indica mais."
                  </blockquote>
                </div>
              </div>
 
              {/* Floating decorative metric badge */}
              <div className="absolute -bottom-6 right-4 sm:-right-6 bg-indigo-950 border border-indigo-700/40 p-4 rounded-2xl text-left shadow-2xl">
                <div className="text-xs text-indigo-300 font-mono">META DE ATENDIMENTO</div>
                <div className="text-base sm:text-lg font-display font-bold text-white mt-0.5">Retenção de Alto Nível</div>
              </div>
            </div>

            {/* Right Information Text & Unified Counters Grid */}
            <div className="lg:col-span-7 text-left space-y-8">
              <div>
                <span className="font-mono text-xs text-flex-red uppercase tracking-widest font-bold">Fidelização Estratégica</span>
                <h2 className="font-display font-black text-3xl md:text-4xl text-[#170d66] leading-tight mt-1">
                  Uma formação pensada para a realidade da Flex
                </h2>
              </div>

              {/* Styled Counters Bento Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Counter 1 */}
                <div className="bg-[#f0f4ff]/80 border border-indigo-100 p-5 rounded-2xl text-left space-y-2 hover:shadow-md transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-display font-black text-[#ed3024]">
                    <AnimatedCounter target={12} />
                  </div>
                  <div className="text-[10px] md:text-xs font-mono text-slate-600 uppercase tracking-wider font-bold leading-tight">
                    Módulos de formação
                  </div>
                </div>

                {/* Counter 2 */}
                <div className="bg-[#f0f4ff]/80 border border-indigo-100 p-5 rounded-2xl text-left space-y-2 hover:shadow-md transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-display font-black text-[#170d66]">
                    <AnimatedCounter target={6} />
                  </div>
                  <div className="text-[10px] md:text-xs font-mono text-slate-600 uppercase tracking-wider font-bold leading-tight">
                    Módulos de Biomecânica
                  </div>
                </div>

                {/* Counter 3 */}
                <div className="bg-[#f0f4ff]/80 border border-indigo-100 p-5 rounded-2xl text-left space-y-2 hover:shadow-md transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-display font-black text-[#170d66]">
                    <AnimatedCounter target={6} />
                  </div>
                  <div className="text-[10px] md:text-xs font-mono text-slate-600 uppercase tracking-wider font-bold leading-tight">
                    Módulos de RELAÇÃO & RETENÇÃO
                  </div>
                </div>

                {/* Counter 4 */}
                <div className="bg-[#eefcf5] border border-emerald-100 p-5 rounded-2xl text-left space-y-2 hover:shadow-md transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-display font-black text-emerald-600 italic">
                    <AnimatedCounter target={100} suffix="%" />
                  </div>
                  <div className="text-[10px] md:text-xs font-mono text-slate-600 uppercase tracking-wider font-bold leading-tight">
                    FOCO OPERACIONAL
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. GALERIA HISTÓRICAS DE TREINAMENTOS ANTERIORES */}
      <section className="py-20 relative border-b border-white/5 bg-flex-deep/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs text-flex-red uppercase tracking-widest font-bold">Autoridade Prática</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-1">
              Histórico de treinamentos com a Flex
            </h2>
          </div>

          {/* Carousel Inject */}
          <TrainingGallery />

        </div>
      </section>

      {/* 8. SEÇÃO DOS MÓDULOS (12 CARDS COM DESIGN DE GRUPOS E FILTROS) */}
      <section className="py-24 relative bg-[#f4f5f7] border-y border-slate-200" id="module-agenda">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs text-[#ed3024] uppercase tracking-widest font-bold block mb-1">Conteúdo Programático</span>
            <h2 className="font-display font-black text-3xl md:text-5xl text-[#170d66] uppercase italic">
              Programa modular de formação
            </h2>
            <p className="text-slate-800 text-sm md:text-base mt-2 font-semibold">
              Do domínio técnico da biomecânica à experiência operacional premium no salão de musculação.
            </p>
          </div>

          {/* Filters & Dynamic Category Tabs */}
          <div className="mb-10">
            <div className="flex justify-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
              
              {/* Filter Tabs matching the columns */}
              <div className="flex flex-wrap sm:flex-nowrap justify-center gap-2.5 w-full">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`flex-grow sm:flex-grow-0 px-5 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === 'all' 
                      ? 'bg-[#170d66] text-white shadow-lg shadow-indigo-950/20 scale-105' 
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  Plano completo (12 módulos)
                </button>
                <button
                  onClick={() => setActiveCategory('trilha1')}
                  className={`flex-grow sm:flex-grow-0 px-5 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === 'trilha1' 
                      ? 'bg-[#170d66] text-white shadow-lg shadow-indigo-950/20 scale-105' 
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  Grupo 1: Técnico (6 módulos)
                </button>
                <button
                  onClick={() => setActiveCategory('trilha2')}
                  className={`flex-grow sm:flex-grow-0 px-5 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === 'trilha2' 
                      ? 'bg-[#ed3024] text-white shadow-lg shadow-red-650/20 scale-105' 
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  Grupo 2: Retenção (6 módulos)
                </button>
              </div>
            </div>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredModules.map((module, idx) => (
              <ModuloCard 
                key={module.id} 
                module={module} 
                index={idx} 
                isExpanded={expandedModuleId === module.id}
                onToggle={() => {
                  setExpandedModuleId(prev => prev === module.id ? null : module.id);
                }}
              />
            ))}
          </div>

          <p className="text-center text-xs text-slate-700 font-mono font-bold mt-10 select-none">
            * Os módulos do Ciclo de Conhecimento são ministrados 100% de forma prática nas salas de musculação da Flex Fitness.
          </p>

        </div>
      </section>

      {/* 9. SEÇÃO METODOLOGIA (4 ETAPAS VISUAIS COM LINHA DE CONEXÃO) */}
      <section className="py-20 relative bg-flex-deep border-t border-white/5" id="methodology-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs text-flex-red uppercase tracking-widest font-bold">Excelência Pedagógica</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-1 mb-3">
              Como a formação será conduzida
            </h2>
            <p className="text-gray-350 text-sm md:text-base leading-relaxed">
              Uma abordagem sistêmica que interliga prática real com fundamentação empática e foco operacional direto.
            </p>
          </div>

          {/* Steps wrapper with relative line */}
          <div className="relative">
            {/* Connection Line on desktop */}
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-flex-red/20 via-indigo-500/10 to-flex-red/20 hidden lg:block -translate-y-16 -z-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {METHODOLOGY_STEPS.map((step, idx) => (
                <div 
                  key={idx}
                  className="relative p-6 bg-slate-900/40 border border-white/5 hover:border-flex-red/20 rounded-2xl text-left transition-all duration-300 hover:bg-slate-900/80 hover:-translate-y-1 group"
                >
                  {/* Big floating step indicator */}
                  <span className="font-mono font-bold text-5xl text-flex-red bg-clip-text text-transparent bg-gradient-to-b from-flex-red to-orange-600 block mb-3 group-hover:scale-105 transition-transform origin-left">
                    {step.step}
                  </span>
                  
                  <h3 className="font-display font-semibold text-lg text-white mb-2 group-hover:text-flex-red transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Tiny dot on top of standard progress */}
                  <div className="absolute -top-3 left-6 w-6 h-6 rounded-full bg-flex-red/10 border border-flex-red/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-2 h-2 rounded-full bg-flex-red" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 12. SEÇÃO CONSTRUIR JUNTOS O PRÓXIMO NÍVEL (FLEX ATENDIMENTO) */}
      <section className="py-24 bg-white text-slate-950 bg-grid-pattern-dark relative border-y border-slate-200 flex flex-col justify-center items-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8 relative z-10">
          <img 
            src="https://i.ibb.co/S8XddB6/flex-para-fundo-escuro.png" 
            alt="Flex Fitness" 
            referrerPolicy="no-referrer"
            className="h-14 sm:h-16 object-contain mx-auto select-none filter-flex-blue"
          />
          
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#170d66] leading-tight uppercase tracking-tight max-w-3xl mx-auto">
            Vamos construir juntos o próximo nível do atendimento Flex Fitness?
          </h2>

          <div className="pt-4 pb-2">
            <a 
              href="https://wa.me/5562984888498?text=Ol%C3%A1%2C%20aqui%20%C3%A9%20da%20Flex%20e%20a%20proposta%20est%C3%A1%20aceita%2C%20quando%20come%C3%A7amos%3F%0A"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-display font-extrabold text-sm sm:text-base tracking-wider uppercase py-4.5 px-10 sm:px-14 rounded-2xl shadow-[0_12px_30px_rgba(16,185,129,0.35)] hover:shadow-[0_16px_40px_rgba(16,185,129,0.55)] transition-all duration-300 hover:scale-[1.02] active:scale-95 group"
            >
              <CheckCircle className="w-5 h-5 text-white stroke-[2.5]" />
              <span>Aprovar Proposta 2026</span>
              <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
