import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiFacebook, FiInstagram } from 'react-icons/fi';
import { HiArrowRight } from 'react-icons/hi';
import { personalInfo } from '../data/portfolioData';

// ─── TYPEWRITER ───────────────────────────────────────────────────────────
const useTypewriter = (words, typeSpeed = 80, deleteSpeed = 38, pause = 2200) => {
  const [idx,     setIdx]     = useState(0);
  const [display, setDisplay] = useState('');
  const [phase,   setPhase]   = useState('typing');

  useEffect(() => {
    const word = words[idx];
    let t;
    if (phase === 'typing') {
      if (display.length < word.length)
        t = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), typeSpeed);
      else
        t = setTimeout(() => setPhase('deleting'), pause);
    } else {
      if (display.length > 0)
        t = setTimeout(() => setDisplay(word.slice(0, display.length - 1)), deleteSpeed);
      else { setIdx(p => (p + 1) % words.length); setPhase('typing'); }
    }
    return () => clearTimeout(t);
  }, [display, phase, idx, words, typeSpeed, deleteSpeed, pause]);

  return { display, isDeleting: phase === 'deleting' };
};

// ─── PROFILE IMAGE ────────────────────────────────────────────────────────
const ProfileImage = () => {
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 22 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 22 });

  const onMove  = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    rx.set(((e.clientY - r.top  - r.height / 2) / r.height) * -10);
    ry.set(((e.clientX - r.left - r.width  / 2) / r.width ) *  10);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      className="relative flex items-center justify-center select-none"
      style={{ perspective: 1000 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, x: 44 }}
      animate={{ opacity: 1, x: 0  }}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Anneau extérieur rotatif */}
      <motion.div
        className="absolute rounded-full pointer-events-none
          border border-dashed border-[#2E86AB]/18 dark:border-[#2E86AB]/20"
        style={{ width: 'clamp(450px,55vw,600px)', height: 'clamp(450px,55vw,600px)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
      >
        {[0, 72, 144, 216, 288].map(deg => (
          <span key={deg}
            className="absolute w-[6px] h-[6px] rounded-full bg-[#2E86AB]/55"
            style={{
              top: '50%', left: '50%',
              transform: `rotate(${deg}deg) translateY(calc(-1 * clamp(200px,22.5vw,275px))) translateX(-50%)`,
            }} />
        ))}
      </motion.div>

      {/* Anneau intérieur contra-rotatif */}
      <motion.div
        className="absolute rounded-full pointer-events-none
          border border-[#2E86AB]/06 dark:border-[#2E86AB]/08"
        style={{ width: 'clamp(400px,50vw,500px)', height: 'clamp(400px,50vw,500px)' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />

      {/* Carte 3D */}
      <motion.div
        style={{
          rotateX: rx, rotateY: ry,
          transformStyle: 'preserve-3d',
          width:  'clamp(300px,32vw,400px)',
          height: 'clamp(300px,32vw,400px)',
        }}
      >
        {/* Halo derrière l'image */}
        <div className="absolute -inset-6 rounded-[2rem] blur-3xl pointer-events-none
          opacity-15 dark:opacity-20"
          style={{ background: 'radial-gradient(circle,#2E86AB 0%,transparent 70%)' }} />

        <img
          src={`${import.meta.env.BASE_URL}img_hero.png`}
          alt={personalInfo.name_complet}
          className="absolute inset-0 w-full h-full object-cover object-top z-10 rounded-2xl"
          onError={e => { e.currentTarget.style.display = 'none'; }}
        />
      </motion.div>
    </motion.div>
  );
};

// ─── SOCIAL BUTTON ────────────────────────────────────────────────────────
const SocialBtn = ({ icon: Icon, href, label, delay }) => (
  <motion.a
    href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
    className="w-10 h-10 flex items-center justify-center rounded-xl
      bg-slate-100 border border-slate-400
      dark:bg-[#0A1520] dark:border-[#162330]
      hover:border-[#2E86AB]/50 hover:bg-[#2E86AB]/08
      text-slate-500 dark:text-[#304050]
      hover:bg-[#2E86AB] hover:text-slate-100 dark:hover:text-slate-100 dark:hover:bg-[#2E86AB] 
      transition-all duration-200"
    initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.4 }}
    whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}
  >
    <Icon className="text-[15px]" />
  </motion.a>
);

// ─── HERO ─────────────────────────────────────────────────────────────────
const Hero = () => {
  const { t } = useTranslation('hero');

  // ── Données traduites ──────────────────────────────────────────────────
  const roles               = t('roles',    { returnObjects: true });
  const greeting            = t('greeting');
  const firstname           = t('firstname');
  const lastname            = t('lastname');
  const description         = t('description');
  const highlight1          = t('descriptionHighlight1');
  const highlight2          = t('descriptionHighlight2');
  const ctaProjects         = t('ctaProjects');
  const ctaCV               = t('ctaCV');
  const followLabel         = t('followLabel');
  const scrollLabel         = t('scrollLabel');

  // ── Typewriter ────────────────────────────────────────────────────────
  const { display: typed, isDeleting } = useTypewriter(roles);

  // ── Socials — données statiques (non traduites) ───────────────────────
  const socials = [
    { icon: FiGithub,    href: personalInfo?.social?.github,    label: 'GitHub'    },
    { icon: FiLinkedin,  href: personalInfo?.social?.linkedin,  label: 'LinkedIn'  },
    { icon: FiMail,      href: personalInfo?.social?.email,     label: 'Email'     },
    { icon: FiFacebook,  href: personalInfo?.social?.facebook,  label: 'Facebook'  },
    { icon: FiInstagram, href: personalInfo?.social?.instagram, label: 'Instagram' },
  ];

  return (
    <section
      id="accueil"
      className="relative min-h-screen lg:px-8  flex items-center overflow-hidden
        bg-slate-50 dark:bg-[#080F17]
        transition-colors duration-300"
    >
      {/* ══ FOND ══════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none
        bg-[radial-gradient(ellipse_70%_55%_at_52%_48%,rgba(46,134,171,0.04)_0%,transparent_72%)]
        dark:bg-[radial-gradient(ellipse_70%_55%_at_52%_48%,rgba(46,134,171,0.06)_0%,transparent_72%)]" />
      <div className="absolute pointer-events-none -top-[15%] -right-[10%]
        w-[52vw] h-[52vw] rounded-full
        bg-[radial-gradient(circle,rgba(46,134,171,0.04)_0%,transparent_65%)]
        dark:bg-[radial-gradient(circle,rgba(46,134,171,0.07)_0%,transparent_65%)]" />
      <div className="absolute pointer-events-none -bottom-[15%] -left-[10%]
        w-[42vw] h-[42vw] rounded-full
        bg-[radial-gradient(circle,rgba(203,213,225,0.4)_0%,transparent_65%)]
        dark:bg-[radial-gradient(circle,rgba(14,30,50,0.5)_0%,transparent_65%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.18] dark:opacity-[0.28]"
        style={{
          backgroundImage: 'radial-gradient(rgba(46,134,171,0.35) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
        }} />
      <div className="absolute left-0 top-0 bottom-0 w-[2px] hidden xl:block pointer-events-none
        bg-gradient-to-b from-transparent via-[#2E86AB]/20 to-transparent
        dark:via-[#2E86AB]/30" />

      {/* ══ CONTENU ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto
        px-4 lg:px-4 xl:px-6 py-4  
        grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">

        {/* ── GAUCHE — TEXTE ─────────────────────────────── */}
        <div className="flex flex-col order-2 lg:order-1">

          {/* Chip intro */}
          <motion.div
            className="inline-flex items-center gap-2.5 mt-10 self-start mb-6
              px-4 py-2 rounded-full
              bg-[#2E86AB]/08 border border-[#2E86AB]/20
              dark:bg-[#2E86AB]/06 dark:border-[#2E86AB]/18"
            initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.04 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E86AB] animate-pulse" />
            <span className="text-[#2E86AB] text-[16px] font-semibold tracking-wide">
              {greeting}
            </span>
          </motion.div>

          {/* Nom — toujours depuis personalInfo (non traduit) */}
          <motion.h1
            className="font-black leading-[1.06] tracking-tight mb-3"
            style={{ fontSize: 'clamp(2.4rem,5vw,3.8rem)' }}
            initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-slate-800 dark:text-[#C8DCE8]">{firstname} </span>
            <span style={{
              background: 'linear-gradient(120deg,#2E86AB 0%,#58C8E0 55%,#2E86AB 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              {lastname}
            </span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            className="flex items-center gap-2 mb-6"
            style={{ height: 'clamp(2.2rem,4vw,3.2rem)' }}
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.26 }}
          >
            <span className="font-bold text-slate-400 dark:text-slate-400"
              style={{ fontSize: 'clamp(1.1rem,2.4vw,1.75rem)' }}>
              {typed}
            </span>
            <motion.span
              className="inline-block w-[2px] rounded-full bg-[#2E86AB]"
              style={{ height: 'clamp(1.4rem,2.6vw,2rem)' }}
              animate={{ opacity: isDeleting ? 1 : [1, 0, 1] }}
              transition={{ duration: 0.85, repeat: Infinity }}
            />
          </motion.div>

          {/* Description avec highlights */}
          <motion.p
            className="leading-[1.82] mb-8 max-w-[520px]
              text-slate-500 dark:text-slate-400 text-justify"
            style={{ fontSize: 'clamp(0.875rem,1.3vw,1.1rem)' }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {description.split(
              new RegExp(`(${highlight1}|${highlight2})`)
            ).map((part, i) =>
              part === highlight1
                ? <span key={i} className="font-semibold text-slate-700 dark:text-[#6A8FA0]">{part}</span>
                : part === highlight2
                  ? <span key={i} className="font-semibold text-[#2E86AB]">{part}</span>
                  : part
            )}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-3 mb-9"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.52 }}
          >
            <motion.a href="#projets"
              className="group inline-flex items-center gap-2 px-6 py-[11px] rounded-xl
                text-[13.5px] font-semibold text-white
                bg-[#2E86AB] hover:bg-[#3898C0]
                shadow-[0_0_20px_rgba(46,134,171,0.28)]
                hover:shadow-[0_0_32px_rgba(46,134,171,0.48)]
                transition-all duration-200"
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
            >
              {ctaProjects}
              <HiArrowRight className="text-[14px] group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a href={personalInfo?.cvUrl ?? '/cv.pdf'} download
              className="group inline-flex items-center gap-2 px-6 py-[11px] rounded-xl
                text-[13.5px] font-semibold text-[#2E86AB]
                border border-[#2E86AB]/30 hover:border-[#2E86AB]/65
                bg-transparent hover:bg-[#2E86AB]/06
                transition-all duration-200"
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
            >
              <FiDownload className="text-[14px] group-hover:-translate-y-0.5 transition-transform" />
              {ctaCV}
            </motion.a>
          </motion.div>

          {/* Socials */}
          <motion.div className="flex items-center gap-2.5 mb-9"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.65 }}
          >
            {socials.map((s, i) => (
              <SocialBtn key={s.label} {...s} delay={0.68 + i * 0.06} />
            ))}
            <div className="flex-1 max-w-[64px] h-px
              bg-gradient-to-r from-[#2E86AB]/30 to-transparent" />
            <span className="text-[9.5px] uppercase tracking-[0.24em] font-medium
              text-slate-500 dark:text-slate-400">
              {followLabel}
            </span>
          </motion.div>

        </div>

        {/* ── DROITE — IMAGE ─────────────────────────────── */}
        <div className="flex justify-center lg:justify-end order-1 lg:order-2">
          <ProfileImage />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2
          flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <span className="text-[9px] uppercase tracking-[0.28em]
          text-slate-300 dark:text-[#162030]">
          {scrollLabel}
        </span>
        <div className="w-[18px] h-[30px] rounded-full flex items-start justify-center pt-[5px]
          border border-slate-300 dark:border-[#2E86AB]/18">
          <motion.div
            className="w-[3px] h-[5px] rounded-full bg-[#2E86AB]"
            animate={{ y: [0, 11, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;