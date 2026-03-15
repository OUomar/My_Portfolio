import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX, FiMapPin, FiCalendar, FiLayers,
  FiCode, FiDatabase, FiServer, FiGitBranch
} from 'react-icons/fi';

// ─── STACK ICONS ──────────────────────────────────────────────────────────
const STACK_ICONS = {
  backend:  { icon: FiServer,    label: 'Back-end'  },
  frontend: { icon: FiCode,      label: 'Front-end' },
  database: { icon: FiDatabase,  label: 'Database'  },
  devops:   { icon: FiGitBranch, label: 'DevOps'    },
};

// ─── SECTION HEADING ──────────────────────────────────────────────────────
const SectionHeading = ({ label }) => (
  <div className="flex items-center gap-2 mb-3">
    <div className="w-1 h-4 rounded-full bg-[#2E86AB]" />
    <span className="text-[11px] font-bold uppercase tracking-widest
      text-slate-500 dark:text-slate-400">
      {label}
    </span>
  </div>
);

// ─── STACK GRID ───────────────────────────────────────────────────────────
const StackGrid = ({ stackDetail, stackLabel }) => (
  <div>
    <div className="flex items-center gap-2 mb-4">
      <FiLayers className="text-[#2E86AB] text-[13px]" />
      <span className="text-[11px] font-bold uppercase tracking-widest
        text-slate-400 dark:text-slate-500">
        {stackLabel}
      </span>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {Object.entries(stackDetail).map(([key, techs]) => {
        const { icon: Icon, label } = STACK_ICONS[key] ?? { icon: FiCode, label: key };
        return (
          <div key={key}
            className="rounded-xl p-3
              bg-slate-50 border border-slate-100
              dark:bg-[#060E16] dark:border-[#1A2E3E]">
            <div className="flex items-center gap-1.5 mb-2">
              <Icon className="text-[#2E86AB] text-[11px]" />
              <span className="text-[10px] font-bold uppercase tracking-wider
                text-slate-400 dark:text-slate-500">
                {label}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {techs.map((tech, i) => (
                <span key={i}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium
                    bg-white border border-slate-200
                    dark:bg-[#0B1929] dark:border-[#1A3048]
                    text-slate-600 dark:text-slate-400">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// ─── MODAL ────────────────────────────────────────────────────────────────
const ExperienceModal = ({ exp, labels, onClose }) => {

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const modal    = exp.modal    ?? {};
  const sections = labels.modalSections ?? {};

  return (
    <AnimatePresence>
      {/* ── OVERLAY ── */}
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 lg:p-8"
        style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
       
        <motion.div
          className="relative flex flex-col w-full max-w-xl lg:max-w-2xl rounded-2xl overflow-hidden
            bg-white dark:bg-[#0B1929]
            border border-slate-200 dark:border-[#1A3048]
            shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          style={{ maxHeight: '80vh' }}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >

          {/* ── HEADER — fixe, ne scroll pas ── */}
          <div className="shrink-0">
            {/* Barre accent */}
            <div className={`h-[3px]
              ${exp.current
                ? 'bg-[#2E86AB]'
                : 'bg-gradient-to-r from-[#2E86AB]/60 to-[#2E86AB]/20'
              }`} />

            <div className="px-5 sm:px-6 py-4 sm:py-5
              border-b border-slate-100 dark:border-[#0F1E2A]
              bg-white dark:bg-[#0B1929]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Titre */}
                  <h2 className="text-[16px] sm:text-[18px] font-black leading-tight
                    text-slate-800 dark:text-slate-100 mb-1.5">
                    {exp.role}
                  </h2>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1
                    text-[12px] sm:text-[13px]">
                    <span className="font-bold text-[#2E86AB]">{exp.company}</span>
                    <span className="text-slate-200 dark:text-slate-700">•</span>
                    <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
                      <FiMapPin className="text-[10px]" />{exp.location}
                    </span>
                    <span className="text-slate-200 dark:text-slate-700">•</span>
                    <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
                      <FiCalendar className="text-[10px]" />{exp.period}
                    </span>
                  </div>
                </div>

                {/* Bouton fermer */}
                <motion.button
                  onClick={onClose}
                  aria-label={labels.modalClose ?? 'Fermer'}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg
                    bg-slate-100 border border-slate-200
                    dark:bg-[#060E16] dark:border-[#1A2E3E]
                    text-slate-400 dark:text-slate-500
                    hover:border-red-400/50 hover:text-red-400
                    transition-all duration-200"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <FiX className="text-[14px]" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* ── BODY — scroll ici uniquement ── */}
          <div className="flex-1 overflow-y-auto overscroll-contain
            px-5 sm:px-6 py-5 sm:py-6
            flex flex-col gap-6">

            {/* Contexte */}
            {modal.context && (
              <div>
                <SectionHeading label={sections.context} />
                <p className="text-[13px] leading-relaxed
                  text-slate-500 dark:text-slate-400">
                  {modal.context}
                </p>
              </div>
            )}

            {/* Missions */}
            {modal.missions?.length > 0 && (
              <div>
                <SectionHeading label={sections.missions} />
                <ul className="space-y-2.5">
                  {modal.missions.map((m, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-start gap-2.5 text-[13px] leading-relaxed
                        text-slate-500 dark:text-slate-400"
                    >
                      <span className="mt-[6px] w-1.5 h-1.5 rounded-full shrink-0
                        bg-[#2E86AB]/70" />
                      {m}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Architecture */}
            {modal.architecture?.length > 0 && (
              <div>
                <SectionHeading label={sections.architecture} />
                <div className="flex flex-col gap-2">
                  {modal.architecture.map((line, i) => (
                    <div key={i}
                      className="flex items-start gap-3 px-4 py-2.5 rounded-xl
                        bg-slate-50 border border-slate-100
                        dark:bg-[#060E16] dark:border-[#1A2E3E]">
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0
                        bg-[#2E86AB]" />
                      <span className="text-[12.5px] leading-relaxed
                        text-slate-600 dark:text-slate-400">
                        {line}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Déploiement */}
            {modal.deployment && (
              <div>
                <SectionHeading label={sections.deployment} />
                <div className="px-4 py-3 rounded-xl
                  bg-[#2E86AB]/05 border border-[#2E86AB]/15
                  dark:bg-[#2E86AB]/06 dark:border-[#2E86AB]/12">
                  <p className="text-[13px] leading-relaxed
                    text-slate-600 dark:text-slate-400">
                    {modal.deployment}
                  </p>
                </div>
              </div>
            )}

            {/* Stack détaillée */}
            {modal.stack_detail && (
              <StackGrid
                stackDetail={modal.stack_detail}
                stackLabel={sections.stack}
              />
            )}

            {/* Espace bas pour ne pas coller au bord */}
            <div className="h-2 shrink-0" />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExperienceModal;