import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { personalInfo } from '../data/portfolioData';
import {
  FiMapPin, FiMail, FiPhone, FiDownload,
  FiBriefcase, FiCode, FiAward, FiUser,
  FiWifi, FiGlobe,
} from 'react-icons/fi';

const INFO_ICONS = [FiMapPin, FiMail, FiPhone, FiBriefcase, FiWifi];

// ─── COUNTER ANIMÉ ────────────────────────────────────────────────────────
const CountUp = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start, raf;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      setCount(Math.floor(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
      else setCount(end);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
};

// ─── STAT CARD ────────────────────────────────────────────────────────────
const StatCard = ({ stat, index }) => {
  const Icon = [FiBriefcase, FiCode, FiAward][index % 3];
  return (
    <motion.div
      className="relative group overflow-hidden rounded-xl p-4 text-center cursor-default
        bg-white border border-slate-200
        dark:bg-[#0B1929] dark:border-[#1A3048]
        hover:border-[#2E86AB]/50 dark:hover:border-[#2E86AB]/40
        shadow-sm dark:shadow-none transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -6 }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
        bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(46,134,171,0.08),transparent)]
        dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(46,134,171,0.12),transparent)]" />
      <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4
        bg-[#2E86AB]/[0.08] border border-[#2E86AB]/[0.18]
        dark:bg-[#2E86AB]/10 dark:border-[#2E86AB]/20
        group-hover:scale-110 transition-transform duration-300">
        <Icon className="text-[#2E86AB] text-lg" />
      </div>
      <p className="text-4xl font-black text-[#2E86AB] leading-none mb-2">
        <CountUp end={stat.value} suffix={stat.suffix} />
      </p>
      <p className="text-[13px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
        {stat.label}
      </p>
    </motion.div>
  );
};

// ─── INFO ROW ─────────────────────────────────────────────────────────────
const InfoRow = ({ icon: Icon, label, value, delay }) => (
  <motion.div
    className="flex items-center gap-3 py-3
      border-b border-slate-100 dark:border-[#0F1E2A] last:border-0"
    initial={{ opacity: 0, x: -16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay }}
  >
    <span className="w-8 h-8 flex items-center justify-center rounded-lg shrink-0
      bg-[#2E86AB]/[0.08] dark:bg-[#2E86AB]/10
      border border-[#2E86AB]/[0.15] dark:border-[#2E86AB]/[0.18]">
      <Icon className="text-[#2E86AB] text-[13px]" />
    </span>
    <span className="text-[11px] uppercase tracking-wider font-semibold w-20 shrink-0
      text-slate-400 dark:text-slate-500">
      {label}
    </span>
    <span className="text-[13.5px] font-medium text-slate-700 dark:text-slate-300">
      {value}
    </span>
  </motion.div>
);

// ─── LANGUAGE BAR ─────────────────────────────────────────────────────────
const LanguageBar = ({ name, level, percent, delay }) => (
  <motion.div
    className="flex flex-col gap-1.5"
    initial={{ opacity: 0, x: -12 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay }}
  >
    <div className="flex justify-between items-center">
      <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-200">{name}</span>
      <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">{level}</span>
    </div>
    <div className="h-[5px] rounded-full bg-slate-100 dark:bg-[#0F1E2A] overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-[#2E86AB] to-[#58C8E0]"
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  </motion.div>
);

// ─── SECTION TITLE ────────────────────────────────────────────────────────
const SectionTitle = ({ title, subtitle }) => (
  <motion.div
    className="mb-14"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55 }}
  >
    <h2
      className="font-black tracking-tight leading-tight mb-3 text-slate-800 dark:text-slate-50"
      style={{ fontSize: 'clamp(2rem,4.5vw,3.2rem)' }}
    >
      {title}
    </h2>
    <div className="flex items-center gap-2">
      <div className="w-10 h-[3px] rounded-full bg-[#2E86AB]" />
      <div className="w-3 h-[3px] rounded-full bg-[#2E86AB]/40" />
      <div className="w-1.5 h-[3px] rounded-full bg-[#2E86AB]/20" />
    </div>
    {subtitle && (
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
        {subtitle}
      </p>
    )}
  </motion.div>
);

// ─── AVATAR ───────────────────────────────────────────────────────────────
const Avatar = ({ openToWork }) => {
  const rx = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    rx.set(((e.clientY - r.top - r.height / 2) / r.height) * -8);
    ry.set(((e.clientX - r.left - r.width / 2) / r.width) * 8);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      className="relative flex items-center justify-center select-none"
      style={{ perspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute rounded-full pointer-events-none
          border border-dashed border-[#2E86AB]/15 dark:border-[#2E86AB]/18"
        style={{ width: 310, height: 310 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {[0, 120, 240].map(deg => (
          <span key={deg}
            className="absolute w-[7px] h-[7px] rounded-full bg-[#2E86AB]/50"
            style={{
              top: '50%', left: '50%',
              transform: `rotate(${deg}deg) translateY(-155px) translateX(-50%)`,
            }} />
        ))}
      </motion.div>
      <motion.div
        className="absolute rounded-full pointer-events-none border border-[#2E86AB]/[0.07]"
        style={{ width: 260, height: 260 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="relative"
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', width: 220, height: 220 }}
      >
        <div className="absolute -inset-4 rounded-full blur-2xl opacity-20 dark:opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #2E86AB 0%, transparent 70%)' }} />
        <div className="relative w-full h-full rounded-full overflow-hidden
          border-2 border-[#2E86AB]/25 dark:border-[#2E86AB]/30
          bg-slate-100 dark:bg-[#0B1929]
          shadow-[0_0_40px_rgba(46,134,171,0.12),0_20px_50px_rgba(0,0,0,0.2)]
          dark:shadow-[0_0_40px_rgba(46,134,171,0.18),0_20px_50px_rgba(0,0,0,0.55)]">
          <img
            src="/hero_profil.png"
            alt={personalInfo?.name_complet || 'Profile'}
            className="absolute inset-0 w-full h-full object-cover object-top z-10"
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="absolute inset-0 flex items-center justify-center z-0
            bg-gradient-to-br from-slate-100 to-slate-200
            dark:from-[#0B1929] dark:to-[#060E16]">
            <FiUser className="text-[#2E86AB]/40 text-7xl" />
          </div>
        </div>
        <motion.div
          className="absolute -top-2 -right-2 z-20 flex items-center gap-1.5
            px-2.5 py-1 rounded-full text-[10px] font-semibold
            bg-white border border-slate-200 shadow
            dark:bg-[#060E16] dark:border-[#1E3448]
            text-slate-600 dark:text-slate-400"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {openToWork}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ─── BLOC LANGUES ─────────────────────────────────────────────────────────
const LanguagesBlock = ({ languagesTitle, languages }) => (
  <motion.div
    className="rounded-2xl overflow-hidden
      bg-white border border-slate-100
      dark:bg-[#0B1929]/60 dark:border-[#1A3048]"
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay: 0.2 }}
  >
    <div className="px-5 py-4 border-b border-slate-100 dark:border-[#0F1E2A] flex items-center gap-2">
      <FiGlobe className="text-[#2E86AB] text-[13px]" />
      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600">
        {languagesTitle}
      </span>
    </div>
    <div className="px-5 py-4 flex flex-col gap-4">
      {Array.isArray(languages) && languages.map((lang, i) => (
        <LanguageBar key={i} name={lang.name} level={lang.level} percent={lang.percent} delay={0.1 + i * 0.07} />
      ))}
    </div>
  </motion.div>
);

// ─── BLOC APPRENTISSAGE ───────────────────────────────────────────────────
const LearningBlock = ({ learningTitle, learning }) => (
  <motion.div
    className="rounded-2xl p-5
      bg-white border border-slate-100
      dark:bg-[#0B1929]/60 dark:border-[#1A3048]"
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay: 0.3 }}
  >
    <p className="text-[11px] font-bold uppercase tracking-widest mb-3 text-slate-400 dark:text-slate-600">
      {learningTitle}
    </p>
    <div className="flex flex-wrap gap-2">
      {Array.isArray(learning) && learning.map((tech, i) => (
        <motion.span
          key={i}
          className="px-3 py-1 rounded-lg text-[12px] font-semibold
            bg-[#2E86AB]/[0.08] border border-[#2E86AB]/20 text-[#2E86AB]"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.32 + i * 0.06 }}
          whileHover={{ scale: 1.06 }}
        >
          ⚡ {tech}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

// ─── ABOUT ────────────────────────────────────────────────────────────────
const About = () => {
  const { t } = useTranslation('about');

  const sectionTitle     = t('sectionTitle');
  const sectionSubtitle  = t('sectionSubtitle');
  const bio              = t('bio', { defaultValue: '' });
  const bioHighlights    = t('bioHighlights', { returnObjects: true, defaultValue: [] });
  const infoSectionTitle = t('infoSectionTitle');
  const infos            = t('infos', { returnObjects: true, defaultValue: [] });
  const languagesTitle   = t('languagesSectionTitle');
  const languages        = t('languages', { returnObjects: true, defaultValue: [] });
  const learningTitle    = t('learningTitle');
  const learning         = t('learning', { returnObjects: true, defaultValue: [] });
  const ctaCV            = t('ctaCV');
  const openToWork       = t('openToWork');
  const statsData        = t('stats', { returnObjects: true, defaultValue: [] });

  // Highlight bio
  const bioParts = Array.isArray(bioHighlights) && bioHighlights.length > 0
    ? bio
        .split(new RegExp(`(${bioHighlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi'))
        .map((part, i) =>
          bioHighlights.some(h => h.toLowerCase() === part.toLowerCase())
            ? <span key={i} className="text-[#2E86AB] font-semibold">{part}</span>
            : part
        )
    : bio;

  return (
    <section
      id="apropos"
      className="relative py-8 lg:px-8 overflow-hidden
        bg-slate-50 dark:bg-[#060E16] transition-colors duration-300"
    >
      <div className="absolute inset-0 pointer-events-none
        bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,rgba(46,134,171,0.04),transparent_70%)]
        dark:bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,rgba(46,134,171,0.06),transparent_70%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-[0.22]"
        style={{
          backgroundImage: 'radial-gradient(rgba(46,134,171,0.3) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
        }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 xl:px-6 py-4">

        <SectionTitle title={sectionTitle} subtitle={sectionSubtitle} />

        {/* ── MOBILE LAYOUT (< lg) : colonne unique, ordre contrôlé ── */}
        <div className="flex flex-col gap-6 lg:hidden mb-10">

          {/* 1. Avatar */}
          <div className="flex justify-center">
            <Avatar openToWork={openToWork} />
          </div>

          {/* 2. Bio */}
          <p className="text-[16px] leading-[1.85] text-slate-500 dark:text-slate-400 text-justify">
            {bioParts}
          </p>

          {/* 3. Infos de contact */}
          <div className="rounded-2xl overflow-hidden
            bg-white border border-slate-100
            dark:bg-[#0B1929]/60 dark:border-[#1A3048]">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-[#0F1E2A]">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600">
                {infoSectionTitle}
              </span>
            </div>
            <div className="px-5">
              {Array.isArray(infos) && infos.map((info, i) => (
                <InfoRow key={i} icon={INFO_ICONS[i] ?? FiBriefcase} label={info.label} value={info.value} delay={0.1 + i * 0.08} />
              ))}
            </div>
          </div>

          

          {/* 4. Langues */}
          <LanguagesBlock languagesTitle={languagesTitle} languages={languages} />

          {/* 5. Apprentissage */}
          <LearningBlock learningTitle={learningTitle} learning={learning} />
{/* Bouton CV */}
          <motion.a
            href={personalInfo?.cvUrl ?? '/cv.pdf'}
            download
            className="self-start inline-flex  gap-2.5
              px-6 py-[11px] rounded-xl text-[13.5px] font-semibold
              bg-[#2E86AB] hover:bg-[#3898C0] text-white
              shadow-[0_0_20px_rgba(46,134,171,0.28)]
              hover:shadow-[0_0_32px_rgba(46,134,171,0.48)]
              transition-all duration-200"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            <FiDownload className="text-[14px]" />
            {ctaCV}
          </motion.a>
        </div>

        {/* ── DESKTOP LAYOUT (lg+) : grille 2 colonnes ── */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-14 items-start mb-10">

          {/* Col gauche */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-center">
              <Avatar openToWork={openToWork} />
            </div>
            <LanguagesBlock languagesTitle={languagesTitle} languages={languages} />
            <LearningBlock learningTitle={learningTitle} learning={learning} />
          </div>

          {/* Col droite */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[16px] leading-[1.85] text-slate-500 dark:text-slate-400 text-justify">
              {bioParts}
            </p>
            <div className="rounded-2xl overflow-hidden
              bg-white border border-slate-100
              dark:bg-[#0B1929]/60 dark:border-[#1A3048]">
              <div className="px-5 py-4 border-b border-slate-100 dark:border-[#0F1E2A]">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600">
                  {infoSectionTitle}
                </span>
              </div>
              <div className="px-5">
                {Array.isArray(infos) && infos.map((info, i) => (
                  <InfoRow key={i} icon={INFO_ICONS[i] ?? FiBriefcase} label={info.label} value={info.value} delay={0.1 + i * 0.08} />
                ))}
              </div>
            </div>
            <motion.a
              href={personalInfo?.cvUrl ?? '/cv.pdf'}
              download
              className="self-start inline-flex items-center gap-2.5
                px-6 py-[11px] rounded-xl text-[13.5px] font-semibold
                bg-[#2E86AB] hover:bg-[#3898C0] text-white
                shadow-[0_0_20px_rgba(46,134,171,0.28)]
                hover:shadow-[0_0_32px_rgba(46,134,171,0.48)]
                transition-all duration-200"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <FiDownload className="text-[14px]" />
              {ctaCV}
            </motion.a>
          </motion.div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {Array.isArray(statsData) && statsData.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;