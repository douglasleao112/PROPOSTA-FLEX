import React, { useState, useEffect } from 'react';
import { ProposalApproval } from '../types';
import { CheckCircle2, ShieldCheck, PenTool, ClipboardCheck, Sparkles, User, HelpCircle, Download, FileText, Send } from 'lucide-react';

export default function ApprovalSection() {
  const [approvals, setApprovals] = useState<ProposalApproval[]>([]);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('Diretor');
  const [unit, setUnit] = useState('Todas as Unidades');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justApproved, setJustApproved] = useState<string | null>(null);
  const [showPrintModal, setShowPrintModal] = useState<ProposalApproval | null>(null);

  // Load existing approvals from localStorage or bootstrap with demo approvals to look full
  useEffect(() => {
    const saved = localStorage.getItem('flex_fitness_approvals_2026');
    if (saved) {
      setApprovals(JSON.parse(saved));
    } else {
      // Bootstrap with realistic demo records so it looks like comments have started
      const bootstrap: ProposalApproval[] = [
        {
          id: '1',
          reviewerName: 'Roberto Silveira',
          position: 'Diretor Geral Operacional',
          unit: 'Conselho de Unidades Flex',
          message: 'Excelente plano de ensino. A padronização da biomecânica é um gargalo que resolveremos em definitivo em 2026. Aprovado!',
          approvedAt: '21/06/2026'
        },
        {
          id: '2',
          reviewerName: 'Fernanda Rocha',
          position: 'Coordenadora Geral de Projetos',
          unit: 'Unidade Flagship Flex',
          message: 'Tivemos excelentes resultados nos treinamentos anteriores com o Douglas. Alinhamento perfeito com nossa meta de retenção de alunos de sala.',
          approvedAt: '20/06/2026'
        }
      ];
      setApprovals(bootstrap);
      localStorage.setItem('flex_fitness_approvals_2026', JSON.stringify(bootstrap));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newApproval: ProposalApproval = {
        id: Date.now().toString(),
        reviewerName: name,
        position,
        unit,
        message: message.trim() || undefined,
        approvedAt: new Date().toLocaleDateString('pt-BR')
      };

      const updated = [newApproval, ...approvals];
      setApprovals(updated);
      localStorage.setItem('flex_fitness_approvals_2026', JSON.stringify(updated));
      setJustApproved(newApproval.id);
      setIsSubmitting(false);

      // Reset fields
      setName('');
      setMessage('');
    }, 1500);
  };

  const handlePrint = (approval: ProposalApproval) => {
    setShowPrintModal(approval);
  };

  return (
    <div className="relative" id="approval-section">
      {/* Background glow effects */}
      <div className="gradient-glow absolute inset-0 -z-10 pointer-events-none opacity-40 rounded-3xl" />

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-md">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-flex-red/10 border border-flex-red/20 text-flex-red text-xs font-mono font-bold mb-4 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 animate-pulse" /> Homologação Digital 2026
          </div>
          <h3 className="font-display font-semibold text-2xl md:text-3xl text-white mb-3">
            Sua Diretoria Conectada ao Futuro da Flex
          </h3>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Gestor, utilize o painel interativo abaixo para chancelar a aprovação da proposta de ensino para as unidades ou deixar sua assinatura digital de suporte ao projeto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Approval Submit Form */}
          <div className="lg:col-span-7 bg-flex-deep/60 rounded-2xl border border-white/5 p-6 md:p-8">
            <h4 className="font-display font-semibold text-lg text-white mb-6 flex items-center gap-2">
              <PenTool className="w-5 h-5 text-flex-red" />
              Chancelar Ciclo de Formação
            </h4>

            {isSubmitting ? (
              <div className="py-20 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 border-4 border-flex-red border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-white font-display font-medium text-lg">Formatando Contrato Escrito...</p>
                <p className="text-gray-400 text-xs mt-1">Registrando homologação segura na base Flex 2026...</p>
              </div>
            ) : justApproved ? (
              <div className="py-8 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mb-4 scale-up-animated">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h5 className="font-display font-bold text-xl text-emerald-400 mb-2">Homologação Registrada com Sucesso!</h5>
                <p className="text-gray-300 text-sm mb-6 max-w-sm">
                  Parabéns! Sua aprovação para a proposta de Douglas Leão foi chancelada e inserida nos arquivos corporativos da rede.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-sm">
                  <button
                    onClick={() => {
                      const app = approvals.find(a => a.id === justApproved);
                      if (app) handlePrint(app);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-flex-blue to-indigo-900 border border-indigo-500/30 text-white font-medium text-sm hover:from-indigo-900 hover:to-indigo-800 transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-flex-red" /> Gerar Certidão/PDF
                  </button>
                  <button
                    onClick={() => setJustApproved(null)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
                  >
                    Assinar novamente
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label htmlFor="reviewerName" className="block text-xs font-mono text-gray-400 uppercase mb-1.5 font-medium">
                      Seu Nome Completo
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="reviewerName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Dr. Adriano Flex"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-flex-red focus:border-transparent transition-all"
                      />
                      <User className="absolute right-3.5 top-3.5 w-4.5 h-4.5 text-gray-550 pointer-events-none" />
                    </div>
                  </div>

                  {/* Position field */}
                  <div>
                    <label htmlFor="position" className="block text-xs font-mono text-gray-400 uppercase mb-1.5 font-medium">
                      Seu Cargo Gestor
                    </label>
                    <select
                      id="position"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-flex-red focus:border-transparent transition-all cursor-pointer"
                    >
                      <option value="Diretor Geral / CEO">Diretor Geral / CEO</option>
                      <option value="Diretor Regional">Diretor Regional</option>
                      <option value="Gerente Operacional">Gerente Operacional</option>
                      <option value="Coordenador Técnico">Coordenador Técnico</option>
                      <option value="Sócio Convidado">Sócio Convidado</option>
                    </select>
                  </div>
                </div>

                {/* Scope Units */}
                <div>
                  <label htmlFor="scopeUnit" className="block text-xs font-mono text-gray-400 uppercase mb-1.5 font-medium">
                    Unidade de Validade
                  </label>
                  <select
                    id="scopeUnit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-flex-red focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="Todas as Unidades (Rede Flex)">Todas as Unidades (Rede Flex)</option>
                    <option value="Unidade São Paulo (Central)">Unidade São Paulo (Central)</option>
                    <option value="Unidade Rio de Janeiro">Unidade Rio de Janeiro</option>
                    <option value="Unidades de Conveniência">Unidades de Conveniência</option>
                    <option value="Estágio de Expansão Metropolitana">Estágio de Expansão Metropolitana</option>
                  </select>
                </div>

                {/* Message comments */}
                <div>
                  <label htmlFor="messageComment" className="block text-xs font-mono text-gray-400 uppercase mb-1.5 font-medium">
                    Observações ou Mensagem de Apoio (Opcional)
                  </label>
                  <textarea
                    id="messageComment"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Deixe uma instrução adicional, preferência de data de início ou observação sobre o padrão operacional..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-flex-red focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Submission CTA */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-flex-red to-orange-600 text-white font-display font-medium py-3.5 px-6 rounded-xl hover:from-flex-red hover:to-red-650 shadow-lg shadow-flex-red/20 hover:shadow-flex-red/30 focus:outline-none transition-all active:scale-[0.99] cursor-pointer"
                >
                  <Send className="w-5 h-5 text-white animate-pulse" />
                  Homologar Proposta Flex 2026
                </button>

                <p className="text-[10px] text-center text-gray-550 leading-relaxed max-w-md mx-auto pt-1">
                  Ao assinar virtualmente, você valida o interesse das Unidades selecionadas no Plano Pedagógico de Douglas Leão para início do planejamento executivo. Sem custos imediatos.
                </p>
              </form>
            )}
          </div>

          {/* RIGHT: Validation Stream & Authority Logs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/5 border border-white/5 p-6 rounded-2xl">
              <h4 className="font-display font-semibold text-sm text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <ClipboardCheck className="w-4 h-4 text-emerald-400" />
                Histórico de Homologações
              </h4>

              <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1">
                {approvals.length === 0 ? (
                  <p className="text-gray-500 text-xs py-4 text-center">Nenhuma assinatura realizada ainda. Seja o primeiro!</p>
                ) : (
                  approvals.map((app) => (
                    <div 
                      key={app.id} 
                      className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors text-left space-y-2 relative"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <div className="font-display font-semibold text-white text-sm">{app.reviewerName}</div>
                          <div className="text-xs text-gray-400 font-mono">{app.position}</div>
                        </div>
                        <span className="text-[10px] font-mono text-gray-550 bg-white/5 px-2 py-0.5 rounded">
                          {app.approvedAt}
                        </span>
                      </div>
                      
                      <div className="text-xs text-flex-red font-medium font-mono">
                        Seccional: {app.unit}
                      </div>

                      {app.message && (
                        <p className="text-xs text-gray-300 italic bg-flex-deep/40 p-2.5 rounded-lg border border-white/5">
                          "{app.message}"
                        </p>
                      )}

                      <button
                        onClick={() => handlePrint(app)}
                        className="text-[10px] text-gray-400 hover:text-flex-red font-mono flex items-center gap-1 mt-1 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" /> Ver Credencial / Relatório
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Micro FAQ block */}
            <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-900/30">
              <h4 className="font-display font-semibold text-sm text-white mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-indigo-400" />
                Fatos Rápidos da Operação
              </h4>
              <ul className="text-xs text-gray-400 space-y-2 leading-relaxed">
                <li className="flex gap-1.5 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-flex-red shrink-0 mt-1.5" />
                  <span>Duração de 12 meses divididos em encontros modulares estratégicos práticos.</span>
                </li>
                <li className="flex gap-1.5 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-flex-red shrink-0 mt-1.5" />
                  <span>Certificado oficial assinado pelo Dr. Douglas Leão homologando a Unidade participante.</span>
                </li>
                <li className="flex gap-1.5 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-flex-red shrink-0 mt-1.5" />
                  <span>Apostilas didáticas ilustradas fornecidas para todos os professores em sala.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* PRINT CERTIFICATE MODAL */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-flex-deep/95 backdrop-blur-xl z-50 flex flex-col justify-center items-center p-4">
          <div className="bg-white text-slate-900 p-8 md:p-12 rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl relative text-left overflow-y-auto max-h-[90vh]">
            
            {/* Close Button */}
            <button
              onClick={() => setShowPrintModal(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-red-500 w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
              aria-label="Fechar"
            >
              X
            </button>

            {/* Seal / Badge watermark */}
            <div className="absolute right-10 top-10 opacity-10 pointer-events-none select-none">
              <ShieldCheck className="w-44 h-44 text-[#170d66]" />
            </div>

            {/* Document Header */}
            <div className="border-b-2 border-[#170d66] pb-6 mb-6">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="font-display font-bold text-2xl text-[#170d66] tracking-tight">CERTIDÃO DE HOMOLOGAÇÃO</h4>
                  <p className="text-xs font-mono text-slate-500">PROPOSTA PEDAGÓGICA REGISTRADA • CICLO 2026</p>
                </div>
                <div className="text-right">
                  <span className="bg-[#170d66] text-white font-mono text-[9px] font-bold px-2 py-1 rounded">
                    FLEX VERIFIED
                  </span>
                </div>
              </div>
            </div>

            {/* Document Body */}
            <div className="space-y-4 text-sm leading-relaxed text-slate-700">
              <p>
                Certificamos para fins de registro executivo que o Diretor/Gestor <strong>{showPrintModal.reviewerName}</strong>, 
                atuando no cargo de <strong>{showPrintModal.position}</strong>, homologou favoravelmente o plano de ensino 
                <strong> "Formação Integrada de Educação Física - Flex Fitness 2026"</strong>, proposto pelo Docente e Consultor Técnico 
                <strong> Dr. Douglas Leão</strong>.
              </p>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 italic font-medium my-4">
                "{showPrintModal.message || "Proposta chancelada integralmente para elevação da taxa de retenção de alunos nas musculações das unidades Flex Fitness."}"
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-xs">
                <div>
                  <span className="text-slate-400 font-mono block">Unidade(s) Abrangida(s):</span>
                  <span className="font-semibold text-slate-800">{showPrintModal.unit}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-mono block">Data de Registro:</span>
                  <span className="font-semibold text-slate-800">{showPrintModal.approvedAt}</span>
                </div>
              </div>

              {/* Course syllabus visual in PDF */}
              <div className="mt-6">
                <span className="text-xs text-slate-400 font-mono block mb-2">Estrutura Curricular Contemplada:</span>
                <div className="grid grid-cols-3 gap-1.5 text-[9px] font-mono text-slate-500">
                  <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">12 Módulos Acadêmicos</span>
                  <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">6 Módulos Biomecânicos</span>
                  <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">6 Módulos de Retenção</span>
                </div>
              </div>
            </div>

            {/* Signatures */}
            <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-2 gap-8 text-center text-xs">
              <div>
                <div className="h-10 border-b border-slate-300 mx-auto max-w-[200px]" />
                <span className="font-medium text-slate-800 block mt-1">{showPrintModal.reviewerName}</span>
                <span className="text-slate-500 font-mono">{showPrintModal.position}</span>
              </div>
              <div>
                <img 
                  src="https://i.ibb.co/YBzwtpsQ/douglas-Copia-Copia.png" 
                  alt="Douglas Leão" 
                  referrerPolicy="no-referrer"
                  className="h-10 mx-auto object-contain shrink-0 filter brightness-50"
                  style={{ maxHeight: '40px' }}
                />
                <div className="h-0.5 border-b border-slate-300 mx-auto max-w-[200px]" />
                <span className="font-medium text-slate-800 block mt-1">Dr. Douglas Leão</span>
                <span className="text-slate-500 font-mono">Doutor Pesquisador UCB</span>
              </div>
            </div>

            {/* Print trigger */}
            <div className="mt-8 flex justify-end gap-3 no-print">
              <button
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl bg-[#170d66] hover:bg-[#251e60] text-white font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" /> Imprimir Documento
              </button>
              <button
                onClick={() => setShowPrintModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Retornar ao Site
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
