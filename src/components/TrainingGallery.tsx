import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  X, 
  Play, 
  Pause, 
  Info 
} from "lucide-react";
import { TRAINING_IMAGES } from '../data';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 280, damping: 28 },
      opacity: { duration: 0.35, ease: "easeOut" },
      scale: { duration: 0.45, ease: "easeOut" }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: "spring", stiffness: 280, damping: 28 },
      opacity: { duration: 0.3, ease: "easeIn" },
      scale: { duration: 0.3, ease: "easeIn" }
    }
  })
};

export default function TrainingGallery() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Derive current index safely from relative page index
  const currentIndex = (page % TRAINING_IMAGES.length + TRAINING_IMAGES.length) % TRAINING_IMAGES.length;

  // Autoplay Logic: cycle every 5 seconds (5000ms)
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    const stepTime = 50; // Update every 50ms
    const totalTime = 5000; // 5 seconds

    if (isPlaying) {
      timerId = setInterval(() => {
        // Only advance if not actively hovered while in standard view
        if (isFullScreen || !isHovered) {
          setProgress((prev) => {
            if (prev >= 100) {
              setPage(([prevPage]) => [prevPage + 1, 1]);
              return 0;
            }
            return prev + (stepTime / totalTime) * 100;
          });
        }
      }, stepTime);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isPlaying, page, isHovered, isFullScreen]);

  const handlePrev = () => {
    setPage(([prevPage]) => [prevPage - 1, -1]);
    setProgress(0);
  };

  const handleNext = () => {
    setPage(([prevPage]) => [prevPage + 1, 1]);
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullScreen) {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "Escape") setIsFullScreen(false);
        if (e.key === " ") {
          e.preventDefault();
          togglePlayPause();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen, page]);

  const activeImage = TRAINING_IMAGES[currentIndex];

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto flex flex-col gap-6 select-none"
      id="training-gallery-interactive"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. CAROUSEL MAIN CONTAINER - Executive rounded-[32px] with premium borders */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[21/9] rounded-[32px] overflow-hidden border border-white/10 bg-slate-950 shadow-2xl shadow-black/80 group">
        
        {/* Dynamic backdrop blur for filling space premium feel */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden sm:block">
          <AnimatePresence mode="wait">
            <motion.img
              key={`blur-${currentIndex}`}
              src={activeImage.url}
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full object-cover scale-115 blur-2xl select-none"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
        </div>

{/* Bottom Active Progress Bar */}
<div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/15 z-30 overflow-hidden">
  <div 
    className="h-full bg-[#ed3024] transition-all duration-75 ease-linear shadow-[0_0_8px_#ed3024]"
    style={{ width: `${progress}%` }}
  />
</div>

        {/* Premium Shadow Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent z-10 pointer-events-none" />

        {/* Main Floating Media Content View */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              custom={direction}
              key={page}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              <img
                src={activeImage.url}
                alt={activeImage.title}
                className="w-full h-full object-cover sm:object-contain relative pointer-events-none select-none max-h-full"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls Overlay container */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between pointer-events-none">
          
          {/* Top segment: Empty space to push arrows down, no overlay items */}
          <div className="flex justify-between items-center w-full min-h-[30px] p-4 md:p-6" />

          {/* Middle segment: Floating directional arrows (Seta manual com backdrop blur) */}
          <div className="flex justify-between items-center w-full pointer-events-auto px-4 sm:px-6 translate-y-8">
            <button
              onClick={handlePrev}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-950/70 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center hover:bg-[#ed3024] hover:border-transparent hover:scale-105 active:scale-95 transition-all shadow-xl"
              aria-label="Carrossel Anterior"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={handleNext}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-950/70 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center hover:bg-[#ed3024] hover:border-transparent hover:scale-105 active:scale-95 transition-all shadow-xl"
              aria-label="Carrossel Próximo"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Bottom segment: Text Details over a nice deep dark gradient on the bottom */}
          <div className="w-full bg-gradient-to-t from-black/40 via-black/15 to-transparent pt-12 pb-5 px-6 md:px-8 text-left pointer-events-auto">
            <div className="max-w-xl">
              <h3 className="font-display font-bold text-white text-base md:text-xl tracking-tight leading-snug">
                {activeImage.title}
              </h3>
              {activeImage.description && (
                <p className="text-slate-350 text-xs md:text-sm mt-1 font-light leading-relaxed">
                  {activeImage.description}
                </p>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* 3. LIGHTBOX EXPANDIDO (Modal de Imersão em Tela Cheia) */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-slate-980/95 backdrop-blur-xl z-50 flex flex-col justify-between p-4 md:p-8 select-none bg-black/95 text-white"
          >
            {/* Header Area */}
            <div className="flex items-center justify-between z-10 w-full max-w-7xl mx-auto">
              <div>
                <span className="font-mono text-[10px] md:text-xs text-[#ed3024] font-black uppercase tracking-widest block">
                  CICLO DE APERFEIÇOAMENTO PRÁTICO • VISUALIZAÇÃO EXECUTIVA
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Registro de Execuções e Metodologia Científica ({currentIndex + 1} de {TRAINING_IMAGES.length})
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Play Toggle */}
                <button
                  onClick={togglePlayPause}
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black hover:border-transparent transition-all"
                  title={isPlaying ? "Botão Pausar" : "Botão Iniciar"}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>

                {/* Exit button */}
                <button
                  onClick={toggleFullScreen}
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-[#ed3024] hover:text-white hover:border-transparent transition-all hover:scale-105"
                  aria-label="Sair da Galeria Expandida"
                >
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Middle Container */}
            <div className="flex-1 flex items-center justify-between relative w-full max-w-7xl mx-auto py-6">
              
              {/* Left Arrow */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-4 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-[#ed3024] hover:border-transparent hover:scale-110 active:scale-95 transition-all shadow-xl z-30"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              {/* Slider image with transition */}
              <div className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden px-14">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.img
                    custom={direction}
                    key={page}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    src={activeImage.url}
                    alt={activeImage.title}
                    className="max-h-[64vh] md:max-h-[72vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/5"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-[#ed3024] hover:border-transparent hover:scale-110 active:scale-95 transition-all shadow-xl z-30"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            {/* Interactive progress bar for fullscreen modal */}
            <div className="w-full max-w-4xl mx-auto h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-[#ed3024] shadow-[0_0_6px_#ed3024] transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Footer Captions */}
            <div className="w-full max-w-4xl mx-auto text-center pb-4 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`fullcap-${currentIndex}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1"
                >
                  <span className="inline-block text-[10px] md:text-xs font-mono font-bold tracking-widest text-[#ed3024] uppercase">
                    REGISTRO HISTÓRICO ORIGINAL DE FORMAÇÃO
                  </span>
                  <h4 className="font-display font-black text-lg md:text-2xl text-white tracking-tight">
                    {activeImage.title}
                  </h4>
                  {activeImage.description && (
                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto font-light">
                      {activeImage.description}
                    </p>
                  )}
                  <p className="text-[10px] text-slate-500 font-mono pt-1 select-none">
                    © 2026 DOUGLAS LEÃO • DIRETOR DE CURSOS CORPORATIVOS E DESENVOLVIMENTO HUMANO
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
