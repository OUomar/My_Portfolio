import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { HiMenuAlt3, HiX, HiPhone } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';
import { IoSunny, IoMoon, IoChevronDown } from 'react-icons/io5';

// ─── CONFIG ────────────────────────────────────────────────────────────────
const LANGUAGES = [
  { code: 'fr', label: 'Français', flagUrl: 'https://flagcdn.com/w40/fr.png', short: 'FR' },
  { code: 'en', label: 'English',  flagUrl: 'https://flagcdn.com/w40/gb.png', short: 'EN' },
  { code: 'ar', label: 'العربية',  flagUrl: 'https://flagcdn.com/w40/ma.png', short: 'AR' },
];

// ─── LOGO ──────────────────────────────────────────────────────────────────
const Logo = ({ subtitle ,firstname,lastname }) => (
  <motion.a
    href="#accueil"
    className="flex items-center gap-3 group shrink-0"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.97 }}
  >
    <div className="relative">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10"
          fill="#2E86AB" fillOpacity="0.12" />
        <rect x="0.5" y="0.5" width="39" height="39" rx="9.5"
          stroke="#2E86AB" strokeOpacity="0.35" />
        <ellipse cx="13.5" cy="20" rx="5" ry="6.5"
          stroke="#2E86AB" strokeWidth="2" fill="none" />
        <ellipse cx="26.5" cy="20" rx="5" ry="6.5"
          stroke="#2E86AB" strokeWidth="2" fill="none" />
        <circle cx="20" cy="20" r="1.5" fill="#2E86AB" />
      </svg>
      <div className="absolute inset-0 rounded-xl bg-[#2E86AB]/20 blur-md
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </div>
    <div className="hidden sm:flex flex-col leading-none gap-0.5">
      <span className="text-[14px] font-bold tracking-wide
        text-slate-800 dark:text-[#e7ecef]">
        {firstname}
        <span className="text-[#2E86AB]"> {lastname} </span>
      </span>
      <span className="text-[9px] tracking-[0.18em] uppercase font-medium
        text-slate-500 dark:text-[#e7ecef]">
        {subtitle}
      </span>
    </div>
  </motion.a>
);

// ─── NAV LINK ──────────────────────────────────────────────────────────────
const NavLink = ({ label, href, isActive, index }) => (
  <motion.a
    href={href}
    className={`
      relative px-3.5 py-1.5 text-[16px] font-medium rounded-lg
      transition-colors duration-200 whitespace-nowrap
      ${isActive
        ? 'text-[#76b7d2]'
        : 'text-slate-500 dark:text-[#e7ecef] hover:text-slate-700 dark:hover:text-[#91a6b4]'
      }
    `}
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.06 * index, duration: 0.4 }}
    whileHover={{ y: -1 }}
  >
    {label}
    {isActive && (
      <motion.span
        layoutId="navActiveBar"
        className="absolute bottom-[-1px] left-1/2 -translate-x-1/2
          w-5 h-[2px] bg-[#2E86AB] rounded-full"
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      />
    )}
  </motion.a>
);

// ─── ICON BUTTON ───────────────────────────────────────────────────────────
const IconBtn = ({ children, onClick, title, href }) => {
  const cls = `
    w-9 h-9 rounded-xl flex items-center justify-center text-[15px]
    bg-slate-100 border border-slate-200
    dark:bg-[#111E2B] dark:border-[#1E3448]
    hover:border-[#2E86AB]/50 hover:bg-slate-200
    dark:hover:border-[#2E86AB]/60 dark:hover:bg-[#1A2D3E]
    text-slate-500 dark:text-[#5A7A90]
    hover:text-[#2E86AB] dark:hover:text-[#2E86AB]
    transition-all duration-200 cursor-pointer shrink-0
  `;
  if (href) return (
    <motion.a href={href} title={title} className={cls}
      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
      {children}
    </motion.a>
  );
  return (
    <motion.button onClick={onClick} title={title} className={cls}
      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
      {children}
    </motion.button>
  );
};

// ─── COMPOSANT PRINCIPAL ───────────────────────────────────────────────────
const Navbar = () => {
  const { t, i18n }                       = useTranslation('navbar');
  const NAV_LINKS                         = t('navLinks', { returnObjects: true });
  const { isDark, toggleTheme }           = useTheme();
  const [isMobileOpen,  setIsMobileOpen]  = useState(false);
  const [isLangOpen,    setIsLangOpen]    = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [showPhoneTip,  setShowPhoneTip]  = useState(false);
  const [isScrolled,    setIsScrolled]    = useState(false);

  const langRef    = useRef(null);
  const activeLang = i18n.language;
  const currentLang = LANGUAGES.find(l => l.code === activeLang) ?? LANGUAGES[0];

  // ── Changer la langue ────────────────────────────────────────────────────
  const changeLang = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('lang', code);
    document.documentElement.dir  = code === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = code;
  };

  // ── Scroll → section active + isScrolled ─────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
      const ids = NAV_LINKS.map(l => l.href.replace('#', ''));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [NAV_LINKS]);

  // ── Fermer dropdown langue au clic extérieur ──────────────────────────────
  useEffect(() => {
    const h = (e) => {
      if (langRef.current && !langRef.current.contains(e.target))
        setIsLangOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled
            ? 'bg-white/90 dark:bg-[#080F17]/90 backdrop-blur-2xl shadow-sm dark:shadow-none border-b border-slate-200/60 dark:border-white/[0.04]'
            : 'bg-white dark:bg-[#080F17]'
          }
        `}
      >
        {/* Ligne teal déco haut */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px]
          bg-gradient-to-r from-transparent via-[#2E86AB]/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex items-center justify-between h-[68px] gap-4">

            <Logo subtitle={t('navSubtitle')}  firstname={t('navFirstName')} lastname={t('navLastName')}/>

            {/* NAV desktop */}
            <div className="hidden lg:flex items-center gap-0.5 mx-auto">
              {NAV_LINKS.map((link, i) => (
                <NavLink key={link.href} {...link} index={i}
                  isActive={activeSection === link.href.replace('#', '')} />
              ))}
            </div>

            {/* ACTIONS DROITE */}
            <div className="flex items-center gap-1.5 shrink-0">

              {/* Toggle dark/light */}
              <IconBtn
                onClick={toggleTheme}
                title={isDark ? t('navDarkTitle') : t('navLightTitle')}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isDark ? 'dark' : 'light'}
                    initial={{ rotate: -80, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                    exit={   { rotate:  80, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.22 }}
                  >
                    {isDark
                      ? <IoMoon  className="text-[#2E86AB]"  />
                      : <IoSunny className="text-yellow-500" />
                    }
                  </motion.span>
                </AnimatePresence>
              </IconBtn>

              {/* Langue */}
              <div ref={langRef} className="relative">
                <motion.button
                    onClick={() => setIsLangOpen(v => !v)}
                    className="flex items-center gap-1.5 pl-2.5 pr-2 h-9 rounded-xl text-[15px] dark:text-slate-100"
                    >
                   <img 
                    src={currentLang.flagUrl} 
                    alt={currentLang.short} 
                    className="w-5 h-[15px] object-cover rounded-[2px]" 
                    />
                </motion.button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1    }}
                      exit={   { opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.16, ease: 'easeOut' }}
                      className="
                        absolute top-[46px] right-0 w-40 py-1.5 z-50
                        rounded-2xl overflow-hidden
                        bg-white border border-slate-200
                        dark:bg-[#080F17] dark:border-[#1E3448]
                        shadow-[0_8px_32px_rgba(0,0,0,0.12)]
                        dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                        backdrop-blur-xl
                      "
                    >
                      <div className="absolute top-0 left-4 right-4 h-[1px]
                        bg-gradient-to-r from-transparent via-[#2E86AB]/30 to-transparent" />
                      {LANGUAGES.map((l) => {
                        const sel = activeLang === l.code;
                        return (
                          <button key={l.code}
                            onClick={() => { changeLang(l.code); setIsLangOpen(false); }}
                            className={`
                              w-full flex items-center gap-3 px-4 py-2.5 text-[13px]
                              transition-colors duration-150
                              ${sel
                                ? 'bg-[#2E86AB]/10 text-[#2E86AB] font-semibold'
                                : 'text-slate-500 dark:text-[#7A90A0] hover:bg-slate-50 dark:hover:bg-[#111E2B] hover:text-slate-800 dark:hover:text-[#C8D8E4]'
                              }
                            `}
                          >
                           <img 
                            src={l.flagUrl} 
                            alt={l.short} 
                            className="w-5 h-[15px] object-cover rounded-[2px]" 
                            />
                            <span>{l.label}</span>
                            {sel && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2E86AB]" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Séparateur */}
              <div className="hidden sm:block w-px h-6 mx-0.5
                bg-slate-200 dark:bg-[#1E3448]" />

              {/* Téléphone */}
              <div className="relative hidden sm:block"
                onMouseEnter={() => setShowPhoneTip(true)}
                onMouseLeave={() => setShowPhoneTip(false)}>
                <IconBtn
                  href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
                  title={t('navCallTitle')}
                >
                  <HiPhone />
                </IconBtn>
                <AnimatePresence>
                  {showPhoneTip && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1    }}
                      exit={   { opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.14 }}
                      className="
                        absolute top-[46px] right-0 whitespace-nowrap z-50
                        bg-white border border-slate-200
                        dark:bg-[#080F17] dark:border-[#1E3448]
                        text-slate-700 dark:text-[#e7ecef] text-[12px] font-medium
                        px-3 py-2 rounded-xl pointer-events-none
                        shadow-[0_8px_24px_rgba(0,0,0,0.1)] dark:shadow-xl
                      "
                    >
                      📞 {personalInfo.phone}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA Contact */}
              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="
                  hidden md:flex items-center gap-2 pl-4 pr-4 h-9 rounded-xl
                  bg-[#2E86AB] hover:bg-[#38A0C8] text-white
                  text-[13px] font-semibold
                  shadow-[0_0_18px_rgba(46,134,171,0.30)]
                  hover:shadow-[0_0_28px_rgba(46,134,171,0.55)]
                  transition-all duration-200
                "
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <MdEmail className="text-[15px]" />
                {t('navCta')}
              </motion.a>
              

              {/* Hamburger */}
              <motion.button
                className="
                  lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-xl
                  bg-slate-100 border border-slate-200
                  dark:bg-[#111E2B] dark:border-[#1E3448]
                  hover:border-[#2E86AB]/50
                  dark:hover:border-[#2E86AB]/60 dark:hover:bg-[#1A2D3E]
                  text-slate-500 dark:text-[#7A90A0]
                  hover:text-[#2E86AB] dark:hover:text-[#2E86AB]
                  transition-all duration-200
                "
                onClick={() => setIsMobileOpen(v => !v)}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isMobileOpen ? 'x' : 'menu'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={   { rotate:  90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isMobileOpen ? <HiX /> : <HiMenuAlt3 />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* MENU MOBILE */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={   { opacity: 0, height: 0     }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="
                lg:hidden overflow-hidden
                bg-white/95 dark:bg-[#080F17]/95
                backdrop-blur-2xl
                border-t border-slate-200/60 dark:border-white/[0.04]
              "
            >
              <div className="max-w-7xl mx-auto px-5 py-4 space-y-1">
                {NAV_LINKS.map((link, i) => {
                  const sid    = link.href.replace('#', '');
                  const active = activeSection === sid;
                  return (
                    <motion.a key={link.href} href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl
                        text-[13px] font-medium transition-colors duration-150
                        ${active
                          ? 'bg-[#2E86AB]/10 text-[#2E86AB] border border-[#2E86AB]/25'
                          : `text-slate-500 dark:text-[#7A90A0]
                             hover:bg-slate-50 dark:hover:bg-[#111E2B]
                             hover:text-slate-800 dark:hover:text-[#C8D8E4]
                             border border-transparent`
                        }
                      `}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0  }}
                      transition={{ delay: i * 0.04 }}
                    >
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-[#2E86AB] shrink-0" />}
                      {link.label}
                    </motion.a>
                  );
                })}

                <div className="pt-3 mt-2 flex gap-2
                  border-t border-slate-100 dark:border-white/[0.04]">
                  <a href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
                    className="
                      flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl
                      bg-slate-100 border border-slate-200
                      dark:bg-[#111E2B] dark:border-[#1E3448]
                      text-slate-500 dark:text-[#7A90A0] text-[12px] font-medium
                      hover:border-[#2E86AB]/50 hover:text-[#2E86AB]
                      transition-all duration-200
                    "
                  >
                    <HiPhone className="text-sm" /> {personalInfo.phone}
                  </a>
                  <a href={`mailto:${personalInfo.email}`}
                    className="
                      flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl
                      bg-[#2E86AB] text-white text-[12px] font-semibold
                      shadow-[0_0_16px_rgba(46,134,171,0.30)]
                      transition-all duration-200
                    "
                  >
                    <MdEmail className="text-sm" /> {t('navCta')}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer */}
      <div className="h-[68px]" />
    </>
  );
};

export default Navbar;