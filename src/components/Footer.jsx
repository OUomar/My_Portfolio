import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FiGithub, FiLinkedin, FiMail, FiPhone,
  FiMapPin, FiArrowUp, FiExternalLink
} from 'react-icons/fi';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';

// ─── BACK TO TOP ──────────────────────────────────────────────────────────
const BackToTop = ({ label }) => (
  <motion.button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    aria-label={label}
    className="w-9 h-9 flex items-center justify-center rounded-xl
      bg-[#2E86AB]/10 border border-[#2E86AB]/25
      dark:bg-[#2E86AB]/[0.08] dark:border-[#2E86AB]/20
      text-[#2E86AB] hover:bg-[#2E86AB] hover:text-white
      transition-all duration-200"
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.9 }}
  >
    <FiArrowUp className="text-[14px]" />
  </motion.button>
);

// ─── FOOTER ───────────────────────────────────────────────────────────────
const Footer = () => {
  const { t } = useTranslation('footer');

  const firstname    = t('firstname');
  const lastname     = t('lastname');
  const title        = t('title');
  const tagline      = t('tagline');
  const availability = t('availability');
  const navTitle     = t('navTitle');
  const navLinks     = t('navLinks',  { returnObjects: true, defaultValue: [] });
  const contactTitle = t('contactTitle');
  const stackTitle   = t('stackTitle');
  const stack        = t('stack',     { returnObjects: true, defaultValue: [] });
  const copyright    = t('copyright');
  const backToTop    = t('backToTop');
  const year         = new Date().getFullYear();

  const SOCIALS = [
    {
      icon: FiGithub,
      href: personalInfo?.social?.github ?? '#',
      label: 'GitHub',
    },
    {
      icon: FiLinkedin,
      href: personalInfo?.social?.linkedin ?? '#',
      label: 'LinkedIn',
    },
    {
      icon: FaFacebookF,
      href: personalInfo?.social?.facebook ?? '#',
      label: 'Facebook',
    },
    {
      icon: FaInstagram,
      href: personalInfo?.social?.instagram ?? '#',
      label: 'Instagram',
    },
    {
      icon: FiMail,
      href: `mailto:${personalInfo?.email ?? 'ou.omar88@gmail.com'}`,
      label: 'Email',
    },
  ];

  const CONTACT_ITEMS = [
    {
      icon: FiMail,
      val: personalInfo?.email ?? 'ou.omar88@gmail.com',
      href: `mailto:${personalInfo?.email ?? 'ou.omar88@gmail.com'}`,
    },
    {
      icon: FiPhone,
      val: personalInfo?.phone ?? '+212 659-881839',
      href: `tel:${(personalInfo?.phone ?? '').replace(/\s/g, '')}`,
    },
    {
      icon: FiMapPin,
      val: personalInfo?.location ?? 'Casablanca, Maroc',
      href: '#',
    },
  ];

  return (
    <footer
      className="relative py-8 lg:px-8 overflow-hidden
        bg-white dark:bg-[#070D16]
        border-t border-slate-200 dark:border-[#0F1E2A]
        transition-colors duration-300"
    >
      {/* Ligne dégradée en haut */}
      <div className="absolute top-0 left-0 right-0 h-[1px]
        bg-gradient-to-r from-transparent via-[#2E86AB]/30 to-transparent" />

      {/* Fond décoratif */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(rgba(46,134,171,0.28) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
        }} />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[200px]
        rounded-full blur-3xl opacity-[0.04] dark:opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2E86AB, transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 xl:px-6 py-4">

        {/* ── GRILLE PRINCIPALE ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12
          border-b border-slate-100 dark:border-[#0F1E2A]">

          {/* ── COL 1 : Branding ── */}
          <div className="flex flex-col gap-5">

            {/* Logo + nom + titre */}
            <div>
              <motion.div className="inline-flex items-center gap-2 mb-3" whileHover={{ x: 2 }}>
                <div className="w-10 h-10 flex items-center justify-center rounded-xl
                  bg-gradient-to-br from-[#2E86AB]/20 to-[#2E86AB]/05
                  border border-[#2E86AB]/25">
                  <span className="text-[16px] font-black text-[#2E86AB]">OO</span>
                </div>
                <div>
                  <p className="text-[14px] font-black leading-tight
                    text-slate-800 dark:text-slate-100">
                    {firstname} {lastname}
                  </p>
                  <p className="text-[11px] font-medium
                    text-slate-500 dark:text-slate-400">
                    {title}
                  </p>
                </div>
              </motion.div>
              <p className="text-[13px] text-justify leading-relaxed max-w-65
                text-slate-500 dark:text-slate-400">
                {tagline}
              </p>
            </div>

            {/* Icônes réseaux sociaux */}
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg
                    bg-slate-100 border border-slate-200
                    dark:bg-[#0A1520] dark:border-[#162330]
                    text-slate-500 dark:text-slate-400
                    hover:border-[#2E86AB]/50 hover:text-[#2E86AB]
                    dark:hover:border-[#2E86AB]/45 dark:hover:text-[#2E86AB]
                    transition-all duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="text-[13px]" />
                </motion.a>
              ))}
            </div>

            {/* Badge disponibilité */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full
              bg-emerald-50 border border-emerald-200
              dark:bg-emerald-500/[0.08] dark:border-emerald-500/20">
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-60" />
                <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[11px] font-semibold
                text-emerald-600 dark:text-emerald-400">
                {availability}
              </span>
            </div>

          </div>

          {/* ── COL 2 : Navigation ── */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-5
              text-slate-500 dark:text-slate-400">
              {navTitle}
            </p>
            <ul className="space-y-2.5">
              {Array.isArray(navLinks) && navLinks.map(({ label, href }) => (
                <li key={href}>
                  <motion.a
                    href={href}
                    className="group flex items-center gap-2 text-[13.5px] font-medium
                      text-slate-500 dark:text-slate-400
                      hover:text-[#2E86AB] dark:hover:text-[#2E86AB]
                      transition-colors duration-150"
                    whileHover={{ x: 4 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#2E86AB]/30
                      group-hover:bg-[#2E86AB] transition-colors duration-150" />
                    {label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COL 3 : Contact + Stack ── */}
          <div className="flex flex-col gap-7">

            {/* Contact */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-4
                text-slate-500 dark:text-slate-400">
                {contactTitle}
              </p>
              <ul className="space-y-3">
                {CONTACT_ITEMS.map(({ icon: Icon, val, href }, i) => (
                  <li key={i}>
                    <motion.a
                      href={href}
                      className="flex items-center gap-2.5 text-[13px]
                        text-slate-500 dark:text-slate-400
                        hover:text-[#2E86AB] dark:hover:text-[#2E86AB]
                        transition-colors duration-150"
                      whileHover={{ x: 3 }}
                    >
                      <Icon className="text-[#2E86AB]/60 text-[13px] shrink-0" />
                      {val}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack principale */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3
                text-slate-500 dark:text-slate-400">
                {stackTitle}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {Array.isArray(stack) && stack.map(tech => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-medium cursor-default
                      bg-slate-100 border border-slate-200
                      dark:bg-[#0A1520] dark:border-[#162330]
                      text-slate-500 dark:text-slate-400
                      hover:border-[#2E86AB]/45 hover:text-[#2E86AB]
                      dark:hover:border-[#2E86AB]/40 dark:hover:text-[#2E86AB]
                      transition-all duration-150"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── BOTTOM BAR ──────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5">

          {/* Copyright + nom cliquable LinkedIn */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1
            text-[12px] text-slate-400 dark:text-slate-500">
            <span>© {year}</span>
            <motion.a
              href={personalInfo?.social?.linkedin ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold
                text-slate-600 dark:text-slate-300
                hover:text-[#2E86AB] dark:hover:text-[#2E86AB]
                transition-colors duration-150"
              whileHover={{ y: -1 }}
            >
              {firstname} {lastname}
              <FiExternalLink className="text-[10px] opacity-60" />
            </motion.a>
            <span>·</span>
            <span>{copyright}</span>
          </div>

          {/* Back to top */}
          <BackToTop label={backToTop} />

        </div>
      </div>
    </footer>
  );
};

export default Footer;