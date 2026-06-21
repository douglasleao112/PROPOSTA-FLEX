import { TrainingModule } from '../types';
import { Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ModuloCardProps {
  key?: any;
  module: TrainingModule;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function ModuloCard({ module, index, isExpanded, onToggle }: ModuloCardProps) {
  // Determine Trilha based on module ID
  const isTrilhaTechnical = module.id <= 6;
  
  const categoryLabel = isTrilhaTechnical ? 'TÉCNICO' : 'RETENÇÃO';
  const categoryLabelColor = isTrilhaTechnical ? 'text-[#170d66]' : 'text-[#ed3024]';
  const checkColor = isTrilhaTechnical 
    ? 'border-indigo-200 text-[#170d66] bg-indigo-50/50' 
    : 'border-red-200 text-[#ed3024] bg-red-50/30';

  return (
    <div 
      onClick={onToggle}
      className={`relative overflow-hidden bg-white rounded-[1.5rem] pt-7 pb-6 px-6 sm:pt-9 sm:pb-8 sm:px-8 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer border ${
        isExpanded ? 'border-indigo-200 ring-2 ring-indigo-500/10' : 'border-slate-200/60'
      } text-left select-none group`}
      id={`module-card-${module.id}`}
    >
      {/* Top Accent Line - Blue for Técnico, Red for Retenção */}
      <div className={`absolute top-0 left-0 right-0 h-[6px] ${isTrilhaTechnical ? 'bg-[#1353f4]' : 'bg-[#ed3024]'}`} />
      <div>
        {/* Header line */}
        <div className="flex justify-between items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 bg-slate-200/75 px-3 py-1 text-xs text-slate-800 font-bold rounded-full font-mono">
            <span>📖</span>
            <span>Módulo {module.id}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className={`text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase ${categoryLabelColor}`}>
              {categoryLabel}
            </span>
            <ChevronDown 
              className={`w-4 h-4 text-slate-500 transition-transform duration-300 shrink-0 ${
                isExpanded ? 'rotate-180 text-flex-red' : 'group-hover:text-slate-800'
              }`} 
            />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display font-black text-base sm:text-lg text-[#170d66] leading-snug group-hover:text-flex-red transition-colors duration-200">
          {module.title.replace(/^Módulo \d+ — /, '')}
        </h3>

        {/* Expandable Area */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              {/* Description */}
              {module.description && (
                <p className="text-slate-700 text-xs sm:text-[13px] leading-relaxed mb-5 font-medium border-t border-slate-100 pt-4">
                  {module.description}
                </p>
              )}

              {/* Checklist Points */}
              <ul className="space-y-3">
                {module.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-800 leading-relaxed font-semibold">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${checkColor}`}>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="pt-0.5">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
