import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiMapPin, FiCalendar, FiMaximize2 } from 'react-icons/fi';
import ExperienceModal from './ExperienceModal';
import { createPortal } from 'react-dom';

// ─── EXPERIENCE CARD ──────────────────────────────────────────────────────
const ExperienceCard = ({ exp, index, labels, onOpenModal }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    className={`relative flex flex-col md:flex-row gap-8 ${
      index % 2 === 0 ? 'md:flex-row-reverse' : ''
    }`}
  >
    {/* Espace côté opposé */}
    <div className="md:w-1/2 hidden md:block" />

    {/* ── Point timeline ── */}
    <div className="absolute left-3 md:left-1/2 top-6
      -translate-x-1/2 z-10
      flex items-center justify-center
      w-5 h-5 rounded-full
      bg-white dark:bg-[#060E16]
      border-2 border-[#2E86AB]/60 dark:border-[#2E86AB]/55
      shadow-[0_0_12px_rgba(46,134,171,0.3)]">
      {exp.current ? (
        <>
          <span className="absolute inset-0 rounded-full bg-[#2E86AB]/20 animate-ping" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#2E86AB]" />
        </>
      ) : (
        <span className="w-2 h-2 rounded-full bg-[#2E86AB]/50" />
      )}
    </div>

    {/* ── Carte ── */}
    <div className="md:w-1/2 ml-10 md:ml-0">
      <motion.div
        className="group relative overflow-hidden rounded-2xl p-6
          bg-white border border-slate-200
          dark:bg-[#0B1929] dark:border-[#1A3048]
          hover:border-[#2E86AB]/35 dark:hover:border-[#2E86AB]/30
          shadow-sm dark:shadow-none
          transition-all duration-300"
        whileHover={{ scale: 1.01, y: -3 }}
      >
        {/* Glow hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-400 pointer-events-none
          bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(46,134,171,0.06),transparent)]
          dark:bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(46,134,171,0.09),transparent)]" />

        {/* Ligne accent haut */}
        <div className={`absolute top-0 left-6 right-6 h-[1.5px] rounded-full
          transition-all duration-300
          ${exp.current
            ? 'bg-[#2E86AB]'
            : 'bg-slate-200 dark:bg-[#1A3048] group-hover:bg-[#2E86AB]/35'
          }`} />

        {/* ── HEADER ── */}
        <div className="flex items-start justify-between gap-3 flex-wrap mt-1">
          <div className="flex-1 min-w-0">
            {/* Période */}
            <div className="inline-flex items-center gap-1.5 mb-3
              px-2.5 py-1 rounded-lg text-[12px] font-semibold w-fit
              bg-slate-100 border border-slate-200
              dark:bg-[#060E16] dark:border-[#1A2E3E]
              text-slate-500 dark:text-slate-400">
              <FiCalendar className="text-[#2E86AB] text-[11px]" />
              {exp.period}
            </div>

            {/* Titre */}
            <h3 className="text-[15.5px] font-bold mb-1.5
              text-slate-800 dark:text-slate-200">
              {exp.role}
            </h3>

            {/* Entreprise + lieu */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px]">
              <span className="font-semibold text-[#2E86AB]">{exp.company}</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
                <FiMapPin className="text-[11px]" />{exp.location}
              </span>
            </div>
          </div>

          {/* Bouton "Voir plus" → ouvre la modal */}
          <motion.button
            onClick={() => onOpenModal(exp)}
            className="shrink-0 flex items-center gap-1.5
              px-3 py-1.5 rounded-lg text-[12px] font-semibold
              border transition-all duration-200 cursor-pointer
              bg-slate-50 border-slate-200 text-slate-500
              dark:bg-[#0B1929] dark:border-[#1A3048] dark:text-slate-400
              hover:bg-[#2E86AB]/08 hover:border-[#2E86AB]/40 hover:text-[#2E86AB]
              dark:hover:bg-[#2E86AB]/08 dark:hover:border-[#2E86AB]/35 dark:hover:text-[#2E86AB]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiMaximize2 className="text-[11px]" />
            {labels.detailsBtn}
          </motion.button>
        </div>

        {/* Summary */}
        <p className="mt-4 text-[13px] leading-relaxed italic
          text-slate-400 dark:text-slate-500">
          {exp.summary}
        </p>

        {/* Stack badges (preview compact) */}
        <div className="flex flex-wrap gap-1.5 mt-4 pt-4
          border-t border-slate-100 dark:border-[#0F1E2A]">
          {(exp.stack || []).slice(0, 5).map((tech, i) => (
            <span key={i}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium
                bg-slate-100 border border-slate-200
                dark:bg-[#060E16] dark:border-[#1A2E3E]
                text-slate-500 dark:text-slate-400
                hover:text-[#2E86AB] hover:border-[#2E86AB]/40
                dark:hover:text-[#2E86AB] dark:hover:border-[#2E86AB]/35
                transition-all duration-150 cursor-default">
              {tech}
            </span>
          ))}
          {exp.stack?.length > 5 && (
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium
              text-[#2E86AB] border border-[#2E86AB]/30
              dark:border-[#2E86AB]/25 cursor-default">
              +{exp.stack.length - 5}
            </span>
          )}
        </div>
      </motion.div>
    </div>
  </motion.div>
);

// ─── COMPOSANT PRINCIPAL ──────────────────────────────────────────────────
const Experience = () => {
  const { t }   = useTranslation('experience');
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, amount: 0.1 });
  const [modalExp, setModalExp] = useState(null);

  const sectionTitle    = t('sectionTitle');
  const sectionSubtitle = t('sectionSubtitle');
  const chipLabel       = t('chipLabel');
  const experiences     = t('experiences', { returnObjects: true }) || [];

  const labels = {
    detailsBtn    : t('detailsBtn'),
    closeBtn      : t('closeBtn'),
    stackLabel    : t('stackLabel'),
    modalClose    : t('modalClose'),
    modalSections : t('modalSections', { returnObjects: true }) || {},
  };

  return (
    <>
      <section
        id="experiences"
        className="relative py-8 lg:px-8 overflow-hidden
          bg-slate-50 dark:bg-[#060E16]
          transition-colors duration-300"
      >
        {/* Fond déco */}
        <div className="absolute inset-0 pointer-events-none
          bg-[radial-gradient(ellipse_60%_50%_at_85%_20%,rgba(46,134,171,0.04)_0%,transparent_70%)]
          dark:bg-[radial-gradient(ellipse_60%_50%_at_85%_20%,rgba(46,134,171,0.06)_0%,transparent_70%)]" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.12] dark:opacity-[0.18]"
          style={{
            backgroundImage: 'radial-gradient(rgba(46,134,171,0.28) 1px, transparent 1px)',
            backgroundSize: '38px 38px',
          }} />

        <motion.div
          ref={ref}
          className="relative z-10 max-w-7xl mx-auto px-4 lg:px-4 xl:px-6 py-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* ── TITRE ── */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4
              bg-[#2E86AB]/07 border border-[#2E86AB]/18
              dark:bg-[#2E86AB]/06 dark:border-[#2E86AB]/15">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E86AB]" />
              <span className="text-[#2E86AB] text-[11.5px] font-semibold uppercase tracking-widest">
                {chipLabel}
              </span>
            </div>

            <h2
              className="font-black tracking-tight leading-tight mb-3
                text-slate-800 dark:text-slate-100"
              style={{ fontSize: 'clamp(2rem,4.5vw,3.2rem)' }}
            >
              {sectionTitle}
            </h2>

            <div className="flex items-center gap-2">
              <div className="w-10 h-[3px] rounded-full bg-[#2E86AB]" />
              <div className="w-3  h-[3px] rounded-full bg-[#2E86AB]/40" />
              <div className="w-1.5 h-[3px] rounded-full bg-[#2E86AB]/20" />
            </div>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed
              text-slate-500 dark:text-slate-400">
              {sectionSubtitle}
            </p>
          </motion.div>

          {/* ── TIMELINE ── */}
          <div className="relative">
            <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px
              md:-translate-x-1/2 pointer-events-none
              bg-gradient-to-b from-transparent
                via-[#2E86AB]/25 dark:via-[#2E86AB]/30
              to-transparent" />

            <div className="space-y-12">
              {Array.isArray(experiences) && experiences.map((exp, index) => (
                <ExperienceCard
                  key={exp.id ?? index}
                  exp={exp}
                  index={index}
                  labels={labels}
                  onOpenModal={setModalExp}
                />
              ))}
            </div>

            <div className="absolute left-3 md:left-1/2 bottom-0
              -translate-x-1/2 w-3 h-3 rounded-full
              bg-slate-200 border border-slate-300
              dark:bg-[#1A3048] dark:border-[#2A4060]" />
          </div>
        </motion.div>
      </section>

      {/* ── MODAL ── rendu en dehors de la section pour éviter z-index issues */}
      {modalExp && createPortal(
        <ExperienceModal
            exp={modalExp}
            labels={labels}
            onClose={() => setModalExp(null)}
        />,
        document.body  // ← rendu directement dans <body>, hors de tout contexte z-index
        )}
    </>
  );
};

export default Experience;