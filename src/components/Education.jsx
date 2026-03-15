import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiMapPin, FiCalendar, FiAward } from 'react-icons/fi';

// ─── EDUCATION CARD ───────────────────────────────────────────────────────
const EducationCard = ({ item, index }) => (
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
      bg-white dark:bg-[#080F17]
      border-2 border-[#2E86AB]/60 dark:border-[#2E86AB]/55
      shadow-[0_0_12px_rgba(46,134,171,0.3)]">
      {item.highlight ? (
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

        {/* Ligne haut */}
        <div className={`absolute top-0 left-6 right-6 h-[1.5px] rounded-full
          transition-all duration-300
          ${item.highlight
            ? 'bg-[#2E86AB]'
            : 'bg-slate-200 dark:bg-[#1A3048] group-hover:bg-[#2E86AB]/35'
          }`} />

        <div className="mt-1">
          {/* Badge diplôme principal */}
          {item.highlight && (
            <span className="inline-flex items-center gap-1.5 mb-3
              px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider
              bg-[#2E86AB] text-white
              shadow-[0_0_12px_rgba(46,134,171,0.4)]">
              <FiAward className="text-[11px]" />
              Diplôme principal
            </span>
          )}

          {/* Période */}
          <div className="inline-flex items-center gap-1.5 mb-3
            px-2.5 py-1 rounded-lg text-[12px] font-semibold w-fit
            bg-slate-100 border border-slate-200
            dark:bg-[#060E16] dark:border-[#1A2E3E]
            text-slate-500 dark:text-slate-400">
            <FiCalendar className="text-[#2E86AB] text-[11px]" />
            {item.period}
          </div>

          {/* Diplôme */}
          <h3 className="text-[15.5px] font-bold mb-1.5
            text-slate-800 dark:text-slate-200">
            {item.degree}
          </h3>

          {/* École + lieu */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4 text-[13px]">
            <span className="font-semibold text-[#2E86AB]">
              {item.school}
            </span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
              <FiMapPin className="text-[11px]" />
              {item.location}
            </span>
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-4
              border-t border-slate-100 dark:border-[#0F1E2A]">
              {item.tags.map((tag, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + i * 0.05 }}
                  className="px-2.5 py-1 rounded-lg text-[11.5px] font-medium
                    bg-slate-100 border border-slate-200
                    dark:bg-[#060E16] dark:border-[#1A2E3E]
                    text-slate-500 dark:text-slate-400
                    hover:text-[#2E86AB] hover:border-[#2E86AB]/40
                    dark:hover:text-[#2E86AB] dark:hover:border-[#2E86AB]/35
                    transition-all duration-150 cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  </motion.div>
);

// ─── COMPOSANT PRINCIPAL ──────────────────────────────────────────────────
const Education = () => {
  const { t }  = useTranslation('education');
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const sectionTitle    = t('sectionTitle');
  const sectionSubtitle = t('sectionSubtitle');
  const chipLabel       = t('chipLabel');
  const education       = t('education', { returnObjects: true }) || [];

  return (
    <section
      id="formation"
      className="relative py-8 lg:px-8 overflow-hidden
        bg-white dark:bg-[#080F17]
        transition-colors duration-300"
    >
      {/* Fond déco */}
      <div className="absolute inset-0 pointer-events-none
        bg-[radial-gradient(ellipse_60%_50%_at_20%_80%,rgba(46,134,171,0.04)_0%,transparent_70%)]
        dark:bg-[radial-gradient(ellipse_60%_50%_at_20%_80%,rgba(46,134,171,0.06)_0%,transparent_70%)]" />
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
            {Array.isArray(education) && education.map((item, index) => (
              <EducationCard key={item.id ?? index} item={item} index={index} />
            ))}
          </div>

          <div className="absolute left-3 md:left-1/2 bottom-0
            -translate-x-1/2 w-3 h-3 rounded-full
            bg-slate-200 border border-slate-300
            dark:bg-[#1A3048] dark:border-[#2A4060]" />
        </div>
      </motion.div>
    </section>
  );
};

export default Education;