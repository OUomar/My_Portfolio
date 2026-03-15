import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FiMail, FiPhone, FiMapPin, FiLinkedin,
  FiSend, FiCheck, FiAlertCircle, FiUser,
  FiMessageSquare, FiExternalLink
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';

// ─── CONFIG FORMSPREE ─────────────────────────────────────────────────────
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvzwadzy";
// Si l'endpoint n'est pas configuré, un message de fallback s'affiche
const IS_FORMSPREE_CONFIGURED = !FORMSPREE_ENDPOINT.includes('VOTRE_ID_ICI');

// ─── ICON MAP ─────────────────────────────────────────────────────────────
const INFO_ICONS = [FiMail, FiPhone, FiMapPin, FiLinkedin];

// ─── FIELD COMPONENT ──────────────────────────────────────────────────────
const Field = ({ label, icon: Icon, error, children }) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider
      text-slate-500 dark:text-slate-500">
      <Icon className="text-[#2E86AB] text-[11px]" />
      {label}
    </label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p
          className="flex items-center gap-1.5 text-[12px] text-red-400"
          initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
        >
          <FiAlertCircle className="text-[11px] shrink-0" />
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

// ─── INPUT CLASSES ────────────────────────────────────────────────────────
const inputCls = (hasError) => `
  w-full px-4 py-3 rounded-xl text-[13.5px]
  bg-slate-50 border
  dark:bg-[#060E16]
  ${hasError
    ? 'border-red-400/70 dark:border-red-500/50 focus:border-red-400 dark:focus:border-red-400'
    : 'border-slate-200 dark:border-[#1A2E3E] focus:border-[#2E86AB] dark:focus:border-[#2E86AB]/70'
  }
  text-slate-800 dark:text-slate-300
  placeholder:text-slate-300 dark:placeholder:text-slate-600
  focus:outline-none focus:ring-1
  ${hasError ? 'focus:ring-red-400/30' : 'focus:ring-[#2E86AB]/20'}
  transition-all duration-200
`;

// ─── CONTACT INFO CARD ────────────────────────────────────────────────────
const InfoCard = ({ info, Icon, index }) => (
  <motion.a
    href={info.href}
    target={info.external ? '_blank' : undefined}
    rel={info.external ? 'noopener noreferrer' : undefined}
    className="group flex items-center gap-4 p-4 rounded-2xl
      bg-white border border-slate-200
      dark:bg-[#0B1929] dark:border-[#1A3048]
      hover:border-[#2E86AB]/40 dark:hover:border-[#2E86AB]/35
      shadow-sm dark:shadow-none transition-all duration-250"
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay: index * 0.09 }}
    whileHover={{ x: 4, y: -2 }}
  >
    <div className="w-10 h-10 flex items-center justify-center rounded-xl shrink-0
      bg-[#2E86AB]/[0.08] border border-[#2E86AB]/[0.18]
      dark:bg-[#2E86AB]/10 dark:border-[#2E86AB]/20
      group-hover:scale-110 group-hover:bg-[#2E86AB]/15
      transition-all duration-250">
      <Icon className="text-[#2E86AB] text-[16px]" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-[11px] font-semibold uppercase tracking-wider mb-0.5
        text-slate-400 dark:text-slate-500">{info.label}</p>
      <p className="text-[13.5px] font-semibold truncate
        text-slate-700 dark:text-slate-300
        group-hover:text-[#2E86AB] dark:group-hover:text-[#2E86AB]
        transition-colors duration-200">{info.value}</p>
      <p className="text-[11px] mt-0.5 text-slate-400 dark:text-slate-500">{info.description}</p>
    </div>
    <span className="text-slate-300 dark:text-slate-600 text-[13px] shrink-0
      group-hover:text-[#2E86AB] transition-colors duration-200">→</span>
  </motion.a>
);

// ─── FALLBACK BANNER (si Formspree non configuré) ─────────────────────────
const FallbackBanner = ({ t }) => {
  const email    = personalInfo?.email    ?? 'ou.omar88@gmail.com';
  const phone    = personalInfo?.phone    ?? '+212659881839';
  const whatsapp = phone.replace(/\s/g, '');

  return (
    <motion.div
      className="rounded-2xl p-5 mb-6
        bg-amber-50 border border-amber-200
        dark:bg-amber-500/[0.06] dark:border-amber-500/20"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Titre */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 flex items-center justify-center rounded-lg shrink-0
          bg-amber-100 dark:bg-amber-500/15">
          <FiAlertCircle className="text-amber-500 text-[15px]" />
        </div>
        <div>
          <p className="text-[13px] font-bold text-amber-700 dark:text-amber-400 mb-0.5">
            {t('fallbackTitle')}
          </p>
          <p className="text-[12px] leading-relaxed text-amber-600 dark:text-amber-500/80">
            {t('fallbackText')}
          </p>
        </div>
      </div>

      {/* Boutons de contact directs */}
      <div className="flex flex-wrap gap-2">
        {/* Email */}
        <motion.a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl
            text-[12px] font-semibold
            bg-white border border-amber-200 text-amber-700
            dark:bg-amber-500/10 dark:border-amber-500/25 dark:text-amber-400
            hover:border-[#2E86AB]/50 hover:text-[#2E86AB]
            dark:hover:border-[#2E86AB]/40 dark:hover:text-[#2E86AB]
            transition-all duration-200"
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
        >
          <FiMail className="text-[13px]" />
          {email}
          <FiExternalLink className="text-[10px] opacity-60" />
        </motion.a>

        {/* WhatsApp */}
        <motion.a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl
            text-[12px] font-semibold
            bg-white border border-amber-200 text-amber-700
            dark:bg-amber-500/10 dark:border-amber-500/25 dark:text-amber-400
            hover:border-emerald-500/50 hover:text-emerald-600
            dark:hover:border-emerald-500/40 dark:hover:text-emerald-400
            transition-all duration-200"
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
        >
          <FaWhatsapp className="text-[14px]" />
          WhatsApp
          <FiExternalLink className="text-[10px] opacity-60" />
        </motion.a>
      </div>
    </motion.div>
  );
};

// ─── COMPOSANT PRINCIPAL ──────────────────────────────────────────────────
const Contact = () => {
  const { t }  = useTranslation('contact');
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const sectionTitle    = t('sectionTitle');
  const sectionSubtitle = t('sectionSubtitle');
  const availableFor    = t('availableFor',  { returnObjects: true, defaultValue: [] });
  const formTitle       = t('formTitle');
  const formSubtitle    = t('formSubtitle');
  const fields          = t('fields',        { returnObjects: true, defaultValue: {} });
  const errors_i18n     = t('errors',        { returnObjects: true, defaultValue: {} });
  const introTitle      = t('introTitle');
  const introText       = t('introText');
  const availText       = t('availabilityText');
  const availSub        = t('availabilitySub');
  const contactInfo     = t('contactInfo',   { returnObjects: true, defaultValue: [] });

  const buildHref = (index) => {
    if (index === 0) return `mailto:${personalInfo?.email ?? 'ou.omar88@gmail.com'}`;
    if (index === 1) return `tel:${(personalInfo?.phone ?? '+212659881839').replace(/\s/g, '')}`;
    if (index === 3) return personalInfo?.social?.linkedin ?? '#';
    return '#';
  };

  // ── Form state ────────────────────────────────────────────────────────
  const [form,    setForm]    = useState({ name: '', email: '', subject: '', message: '' });
  const [errors,  setErrors]  = useState({});
  const [status,  setStatus]  = useState('idle'); // idle | sending | success | error

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = errors_i18n.nameRequired;
    if (!form.email.trim())   e.email   = errors_i18n.emailRequired;
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = errors_i18n.emailInvalid;
    if (!form.subject.trim()) e.subject = errors_i18n.subjectRequired;
    if (!form.message.trim()) e.message = errors_i18n.messageRequired;
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('sending');

    if (!IS_FORMSPREE_CONFIGURED) {
      // Formspree non configuré → simuler + afficher info
      await new Promise(r => setTimeout(r, 800));
      setStatus('not_configured');
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const isSending = status === 'sending';
  const isSuccess = status === 'success';
  const isError   = status === 'error';
  const isNotConf = status === 'not_configured';

  return (
    <section
      id="contact"
      className="relative py-8 lg:px-8 overflow-hidden
        bg-slate-50 dark:bg-[#060E16]
        transition-colors duration-300"
    >
      <div className="absolute inset-0 pointer-events-none
        bg-[radial-gradient(ellipse_65%_55%_at_50%_0%,rgba(46,134,171,0.05),transparent_70%)]
        dark:bg-[radial-gradient(ellipse_65%_55%_at_50%_0%,rgba(46,134,171,0.07),transparent_70%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.12] dark:opacity-[0.18]"
        style={{
          backgroundImage: 'radial-gradient(rgba(46,134,171,0.28) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
        }} />

      <motion.div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-4 xl:px-6 py-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* TITRE */}
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
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-[3px] rounded-full bg-[#2E86AB]" />
            <div className="w-3  h-[3px] rounded-full bg-[#2E86AB]/40" />
            <div className="w-1.5 h-[3px] rounded-full bg-[#2E86AB]/20" />
          </div>
          <p className="text-[15px] text-slate-500 dark:text-slate-400">
            {sectionSubtitle}{' '}
            {Array.isArray(availableFor) && availableFor.map((item, i) => (
              <span key={i}>
                <span className="text-[#2E86AB] font-semibold">{item}</span>
                {i < availableFor.length - 1 && (
                  <span className="text-slate-400 dark:text-slate-500">
                    {i === availableFor.length - 2 ? ' ou ' : ', '}
                  </span>
                )}
              </span>
            ))}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── FORMULAIRE ── */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl p-7
              bg-white border border-slate-200
              dark:bg-[#0B1929] dark:border-[#1A3048]
              shadow-sm dark:shadow-none">

              {/* Header formulaire */}
              <div className="flex items-center gap-3 mb-6 pb-5
                border-b border-slate-100 dark:border-[#0F1E2A]">
                <div className="w-9 h-9 flex items-center justify-center rounded-xl
                  bg-[#2E86AB]/[0.08] border border-[#2E86AB]/[0.18]
                  dark:bg-[#2E86AB]/10 dark:border-[#2E86AB]/20">
                  <FiMessageSquare className="text-[#2E86AB] text-[15px]" />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-slate-700 dark:text-slate-300">
                    {formTitle}
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    {formSubtitle}
                  </p>
                </div>
              </div>

              {/* ── BANNER STATUT ── */}
              <AnimatePresence>

                {/* Formspree non configuré → contact direct */}
                {isNotConf && (
                  <motion.div
                    className="mb-5 rounded-xl p-4
                      bg-amber-50 border border-amber-200
                      dark:bg-amber-500/[0.06] dark:border-amber-500/20"
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <FiAlertCircle className="text-amber-500 text-[16px] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[13px] font-bold text-amber-700 dark:text-amber-400 mb-1">
                          {t('fallbackTitle')}
                        </p>
                        <p className="text-[12px] leading-relaxed text-amber-600 dark:text-amber-500/80">
                          {t('fallbackText')}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <motion.a
                        href={`mailto:${personalInfo?.email ?? 'ou.omar88@gmail.com'}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                          text-[12px] font-semibold
                          bg-white border border-amber-200 text-amber-700
                          dark:bg-amber-500/10 dark:border-amber-500/25 dark:text-amber-400
                          hover:border-[#2E86AB]/50 hover:text-[#2E86AB]
                          transition-all duration-150"
                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      >
                        <FiMail className="text-[12px]" />
                        {personalInfo?.email ?? 'ou.omar88@gmail.com'}
                      </motion.a>
                      <motion.a
                        href={`https://wa.me/${(personalInfo?.phone ?? '+212659881839').replace(/[\s+]/g, '')}`}
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                          text-[12px] font-semibold
                          bg-white border border-amber-200 text-amber-700
                          dark:bg-amber-500/10 dark:border-amber-500/25 dark:text-amber-400
                          hover:border-emerald-500/50 hover:text-emerald-600
                          dark:hover:text-emerald-400 transition-all duration-150"
                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      >
                        <FaWhatsapp className="text-[13px]" />
                        WhatsApp
                      </motion.a>
                    </div>
                  </motion.div>
                )}

                {/* Succès Formspree */}
                {isSuccess && (
                  <motion.div
                    className="mb-5 flex items-center gap-3 p-4 rounded-xl
                      bg-emerald-50 border border-emerald-200
                      dark:bg-emerald-500/[0.07] dark:border-emerald-500/20"
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
                  >
                    <div className="w-7 h-7 flex items-center justify-center rounded-lg
                      bg-emerald-100 dark:bg-emerald-500/15 shrink-0">
                      <FiCheck className="text-emerald-600 dark:text-emerald-400 text-[14px]" />
                    </div>
                    <p className="text-[13px] font-medium text-emerald-700 dark:text-emerald-400">
                      {t('successMessage')}
                    </p>
                  </motion.div>
                )}

                {/* Erreur réseau */}
                {isError && (
                  <motion.div
                    className="mb-5 flex items-center gap-3 p-4 rounded-xl
                      bg-red-50 border border-red-200
                      dark:bg-red-500/[0.07] dark:border-red-500/20"
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
                  >
                    <FiAlertCircle className="text-red-500 text-[15px] shrink-0" />
                    <p className="text-[13px] font-medium text-red-600 dark:text-red-400">
                      {t('errorMessage')}
                    </p>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* FORMULAIRE */}
              <form onSubmit={onSubmit} className="space-y-5" noValidate>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label={fields.name?.label} icon={FiUser} error={errors.name}>
                    <input type="text" name="name"
                      placeholder={fields.name?.placeholder}
                      value={form.name} onChange={onChange}
                      className={inputCls(!!errors.name)} />
                  </Field>
                  <Field label={fields.email?.label} icon={FiMail} error={errors.email}>
                    <input type="email" name="email"
                      placeholder={fields.email?.placeholder}
                      value={form.email} onChange={onChange}
                      className={inputCls(!!errors.email)} />
                  </Field>
                </div>

                <Field label={fields.subject?.label} icon={FiMessageSquare} error={errors.subject}>
                  <input type="text" name="subject"
                    placeholder={fields.subject?.placeholder}
                    value={form.subject} onChange={onChange}
                    className={inputCls(!!errors.subject)} />
                </Field>

                <Field label={fields.message?.label} icon={FiSend} error={errors.message}>
                  <textarea name="message" rows={5}
                    placeholder={fields.message?.placeholder}
                    value={form.message} onChange={onChange}
                    className={inputCls(!!errors.message) + ' resize-none'} />
                </Field>

                {/* Bouton submit */}
                <motion.button
                  type="submit"
                  disabled={isSending || isSuccess}
                  className={`w-full flex items-center justify-center gap-2.5
                    py-3.5 rounded-xl text-[14px] font-semibold
                    transition-all duration-250
                    ${isSuccess
                      ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                      : 'bg-[#2E86AB] hover:bg-[#3898C0] text-white shadow-[0_0_20px_rgba(46,134,171,0.30)] hover:shadow-[0_0_32px_rgba(46,134,171,0.50)]'
                    }
                    disabled:opacity-70 disabled:cursor-not-allowed`}
                  whileHover={!isSending && !isSuccess ? { scale: 1.02, y: -1 } : {}}
                  whileTap={!isSending && !isSuccess ? { scale: 0.98 } : {}}
                >
                  <AnimatePresence mode="wait">
                    {isSending ? (
                      <motion.div key="loading"
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                    ) : isSuccess ? (
                      <motion.span key="sent" className="flex items-center gap-2"
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                        <FiCheck className="text-[16px]" />
                        {t('btnSent')}
                      </motion.span>
                    ) : (
                      <motion.span key="send" className="flex items-center gap-2"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <FiSend className="text-[14px]" />
                        {t('btnSend')}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

              </form>
            </div>
          </motion.div>

          {/* ── INFOS CONTACT ── */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl p-6 mb-2
              bg-gradient-to-br from-[#2E86AB]/[0.08] to-[#2E86AB]/[0.03]
              border border-[#2E86AB]/15
              dark:from-[#2E86AB]/[0.07] dark:to-[#2E86AB]/[0.02]
              dark:border-[#2E86AB]/12">
              <h3 className="text-[15px] font-bold mb-2 text-slate-800 dark:text-slate-200">
                {introTitle}
              </h3>
              <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
                {introText}
              </p>
            </div>

            {Array.isArray(contactInfo) && contactInfo.map((info, i) => (
              <InfoCard
                key={i}
                info={{ ...info, href: buildHref(i) }}
                Icon={INFO_ICONS[i] ?? FiMail}
                index={i}
              />
            ))}

            <motion.div
              className="mt-2 flex items-center gap-3 px-4 py-3 rounded-xl
                bg-white border border-slate-200
                dark:bg-[#0B1929] dark:border-[#1A3048]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <span className="relative flex w-2.5 h-2.5 shrink-0">
                <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-60" />
                <span className="relative rounded-full w-2.5 h-2.5 bg-emerald-400" />
              </span>
              <p className="text-[13px] text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{availText}</span>
                {' '}— {availSub}
              </p>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default Contact;