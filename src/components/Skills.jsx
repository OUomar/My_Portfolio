import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FiLayout, FiServer, FiDatabase,
  FiGitBranch, FiSmartphone, FiCheckCircle, FiCpu, FiTool
} from 'react-icons/fi';

// ─── ICON MAP par nom de catégorie (FR / EN / AR) ─────────────────────────
const CATEGORY_ICONS = {
  // FR
  'Frontend'          : FiLayout,
  'Backend'           : FiServer,
  'Bases de données'  : FiDatabase,
  'DevOps'            : FiGitBranch,
  'Tests & Méthodes'  : FiCheckCircle,
  'Mobile'            : FiSmartphone,
  'Outils & API'      : FiTool,
  // EN
  'Databases'         : FiDatabase,
  'Testing & Methods' : FiCheckCircle,
  'Tools & APIs'      : FiTool,
  // AR
  'الواجهة الأمامية'    : FiLayout,
  'الواجهة الخلفية'     : FiServer,
  'قواعد البيانات'      : FiDatabase,
  'الاختبار والمنهجيات' : FiCheckCircle,
  'الموبايل'            : FiSmartphone,
  'الأدوات والـ APIs'   : FiTool,
};
const getCategoryIcon = (name) => CATEGORY_ICONS[name] ?? FiCpu;

// ─── SECTION TITLE ────────────────────────────────────────────────────────
const SectionTitle = ({ title, subtitle }) => (
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
      {title}
    </h2>
    <div className="flex items-center gap-2">
      <div className="w-10 h-[3px] rounded-full bg-[#2E86AB]" />
      <div className="w-3  h-[3px] rounded-full bg-[#2E86AB]/40" />
      <div className="w-1.5 h-[3px] rounded-full bg-[#2E86AB]/20" />
    </div>
    <p className="mt-4 max-w-xl text-[15px] leading-relaxed
      text-slate-500 dark:text-slate-400">
      {subtitle}
    </p>
  </motion.div>
);

// ─── TECH BADGE ───────────────────────────────────────────────────────────
const TechBadge = ({ tech, delay }) => (
  <motion.span
    className="inline-flex items-center px-3 py-1.5 rounded-xl text-[12.5px] font-medium
      cursor-default select-none transition-all duration-200
      bg-slate-100 border border-slate-200 text-slate-600
      dark:bg-[#060E16] dark:border-[#1A2E3E] dark:text-slate-400
      hover:border-[#2E86AB]/55 hover:text-[#2E86AB] hover:bg-[#2E86AB]/06
      dark:hover:border-[#2E86AB]/45 dark:hover:text-[#2E86AB] dark:hover:bg-[#2E86AB]/07"
    initial={{ opacity: 0, scale: 0.82 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay }}
    whileHover={{ scale: 1.06, y: -1 }}
    whileTap={{ scale: 0.95 }}
  >
    {tech}
  </motion.span>
);

// ─── CATEGORY CARD ────────────────────────────────────────────────────────
const CategoryCard = ({ category, index, techCountSingular, techCountPlural }) => {
  const Icon  = getCategoryIcon(category.name);
  const count = category.technologies.length;
  const label = count > 1 ? techCountPlural : techCountSingular;

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl p-6
        bg-white border border-slate-200
        dark:bg-[#0B1929] dark:border-[#1A3048]
        hover:border-[#2E86AB]/40 dark:hover:border-[#2E86AB]/35
        shadow-sm dark:shadow-none
        transition-all duration-300"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -5 }}
    >
      {/* Glow hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100
        transition-opacity duration-300 pointer-events-none
        bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(46,134,171,0.07),transparent)]
        dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(46,134,171,0.10),transparent)]" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 flex items-center justify-center rounded-xl shrink-0
          bg-[#2E86AB]/[0.08] border border-[#2E86AB]/[0.18]
          dark:bg-[#2E86AB]/10 dark:border-[#2E86AB]/20
          group-hover:scale-110 transition-transform duration-300">
          <Icon className="text-[#2E86AB] text-[16px]" />
        </div>
        <div>
          <h3 className="text-[14px] font-bold tracking-wide
            text-slate-700 dark:text-slate-300">
            {category.name}
          </h3>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            {count} {label}
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {category.technologies.map((tech, ti) => (
          <TechBadge
            key={ti}
            tech={tech}
            delay={index * 0.07 + ti * 0.04}
          />
        ))}
      </div>
    </motion.div>
  );
};

// ─── EXPERTISE BAR ────────────────────────────────────────────────────────
const ExpertiseBar = ({ skill, index }) => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const getColor = (level) => {
    if (level >= 85) return { from: '#2E86AB', to: '#5BC4DE' };
    if (level >= 70) return { from: '#2672A0', to: '#3A9BC2' };
    return              { from: '#1E5A80', to: '#2E86AB' };
  };
  const { from, to } = getColor(skill.level);

  return (
    <motion.div
      ref={ref}
      className="space-y-2.5"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full"
            style={{ background: `linear-gradient(to right, ${from}, ${to})` }} />
          <span className="text-[13.5px] font-semibold
            text-slate-700 dark:text-slate-300">
            {skill.name}
          </span>
        </div>
        <motion.span
          className="text-[13px] font-bold tabular-nums text-[#2E86AB]"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.08 + 0.6 }}
        >
          {skill.level}%
        </motion.span>
      </div>

      <div className="relative h-[6px] rounded-full overflow-hidden
        bg-slate-100 dark:bg-[#060E16]">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: `linear-gradient(to right, ${from}, ${to})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.1, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute inset-y-0 w-20 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
          initial={{ left: '-5rem' }}
          animate={inView ? { left: `${skill.level}%` } : {}}
          transition={{ duration: 1.1, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
};

// ─── COMPOSANT PRINCIPAL ──────────────────────────────────────────────────
const Skills = () => {
  const { t } = useTranslation('skills');

  const sectionTitle      = t('sectionTitle');
  const sectionSubtitle   = t('sectionSubtitle');
  const expertiseTitle    = t('expertiseTitle');
  const expertiseSubtitle = t('expertiseSubtitle');
  const techCountSingular = t('techCountSingular');
  const techCountPlural   = t('techCountPlural');
  const categories        = t('categories', { returnObjects: true, defaultValue: [] });
  const expertise         = t('expertise',  { returnObjects: true, defaultValue: [] });

  return (
    <section
      id="competences"
      className="relative py-8 lg:px-8 overflow-hidden
        bg-white dark:bg-[#080F18]
        transition-colors duration-300"
    >
      <div className="absolute inset-0 pointer-events-none
        bg-[radial-gradient(ellipse_55%_45%_at_15%_80%,rgba(46,134,171,0.04),transparent_70%)]
        dark:bg-[radial-gradient(ellipse_55%_45%_at_15%_80%,rgba(46,134,171,0.06),transparent_70%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.12] dark:opacity-[0.18]"
        style={{
          backgroundImage: 'radial-gradient(rgba(46,134,171,0.3) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
        }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 xl:px-6 py-4">

        <SectionTitle title={sectionTitle} subtitle={sectionSubtitle} />

        {/* GRILLE CATÉGORIES — 6 cartes en 3 colonnes desktop */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {Array.isArray(categories) && categories.map((cat, i) => (
            <CategoryCard
              key={i}
              category={cat}
              index={i}
              techCountSingular={techCountSingular}
              techCountPlural={techCountPlural}
            />
          ))}
        </div>

        {/* BARRES D'EXPERTISE */}
        <motion.div
          className="rounded-2xl p-8
            bg-white border border-slate-200
            dark:bg-[#0B1929] dark:border-[#1A3048]
            shadow-sm dark:shadow-none"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <div className="mb-8 pb-5 border-b border-slate-100 dark:border-[#0F1E2A]">
            <h3 className="text-[15px] font-bold text-slate-700 dark:text-slate-300">
              {expertiseTitle}
            </h3>
            <p className="text-[12px] text-slate-400 dark:text-slate-500">
              {expertiseSubtitle}
            </p>
          </div>

          {/* 2 colonnes sur desktop pour les barres */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {Array.isArray(expertise) && expertise.map((skill, i) => (
              <ExpertiseBar key={i} skill={skill} index={i} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;