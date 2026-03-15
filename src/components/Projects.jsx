import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';

// ─── PROJECT CARD ─────────────────────────────────────────────────────────
const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group relative flex flex-col overflow-hidden rounded-2xl
        bg-white border border-slate-200
        dark:bg-[#0B1929] dark:border-[#1A3048]
        hover:border-[#2E86AB]/40 dark:hover:border-[#2E86AB]/35
        shadow-sm dark:shadow-none
        transition-all duration-300 cursor-default"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Ligne teal haut */}
      <div className="absolute top-0 left-6 right-6 h-[1.5px] rounded-full
        bg-slate-200 dark:bg-[#1A3048]
        group-hover:bg-[#2E86AB]/50 dark:group-hover:bg-[#2E86AB]/40
        transition-all duration-300" />

      {/* Glow hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100
        transition-opacity duration-400 pointer-events-none
        bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(46,134,171,0.07),transparent)]
        dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(46,134,171,0.10),transparent)]" />

      <div className="relative z-10 flex flex-col flex-1 p-6">

        {/* Header : numéro + liens */}
        <div className="flex items-start justify-between mb-5">

          {/* Numéro stylisé */}
          <div className="relative w-11 h-11 flex items-center justify-center
            rounded-xl shrink-0
            bg-gradient-to-br from-[#2E86AB]/15 to-[#2E86AB]/05
            border border-[#2E86AB]/25 dark:border-[#2E86AB]/20
            group-hover:from-[#2E86AB]/25 group-hover:to-[#2E86AB]/10
            group-hover:border-[#2E86AB]/50
            transition-all duration-300">
            <span className="text-[13px] font-black text-[#2E86AB] tabular-nums">
              {String(project.id).padStart(2, '0')}
            </span>
            <AnimatePresence>
              {hovered && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center
                    rounded-xl bg-[#2E86AB]"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                >
                  <FiFolder className="text-white text-[16px]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Liens GitHub + Demo */}
          <div className="flex items-center gap-2">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 flex items-center justify-center rounded-lg
                bg-slate-100 border border-slate-200
                dark:bg-[#060E16] dark:border-[#1A2E3E]
                text-slate-400 dark:text-slate-500
                hover:border-[#2E86AB]/50 hover:text-[#2E86AB]
                dark:hover:border-[#2E86AB]/45 dark:hover:text-[#2E86AB]
                transition-all duration-200"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
            >
              <FiGithub className="text-[14px]" />
            </motion.a>

            {project.demo && project.demo !== '#' && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Demo"
                className="w-8 h-8 flex items-center justify-center rounded-lg
                  bg-slate-100 border border-slate-200
                  dark:bg-[#060E16] dark:border-[#1A2E3E]
                  text-slate-400 dark:text-slate-500
                  hover:border-[#2E86AB]/50 hover:text-[#2E86AB]
                  dark:hover:border-[#2E86AB]/45 dark:hover:text-[#2E86AB]
                  transition-all duration-200"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={e => e.stopPropagation()}
              >
                <FiExternalLink className="text-[14px]" />
              </motion.a>
            )}
          </div>
        </div>

        {/* Titre */}
        <h3 className="text-[15.5px] font-bold mb-3 leading-snug
          text-slate-800 dark:text-slate-200
          group-hover:text-[#2E86AB] dark:group-hover:text-[#2E86AB]
          transition-colors duration-200">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[13px] leading-relaxed mb-5 flex-1
          text-slate-500 dark:text-slate-400">
          {project.description}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 pt-4
          border-t border-slate-100 dark:border-[#0F1E2A]">
          {(project.stack || []).map((tech, i) => (
            <motion.span
              key={i}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium
                bg-slate-100 border border-slate-200
                dark:bg-[#060E16] dark:border-[#1A2E3E]
                text-slate-500 dark:text-slate-400
                hover:border-[#2E86AB]/45 hover:text-[#2E86AB]
                dark:hover:border-[#2E86AB]/40 dark:hover:text-[#2E86AB]
                transition-all duration-150 cursor-default"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: index * 0.09 + i * 0.04 }}
              whileHover={{ scale: 1.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ─── COMPOSANT PRINCIPAL ──────────────────────────────────────────────────
const Projects = () => {
  const { t } = useTranslation('projects');

  const sectionTitle    = t('sectionTitle');
  const sectionSubtitle = t('sectionSubtitle');
  const githubCta       = t('githubCta');
  const projects        = t('projects', { returnObjects: true }) || [];

  return (
    <section
      id="projets"
      className="relative py-8 lg:px-8 overflow-hidden
        bg-white dark:bg-[#080F18]
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-4 xl:px-6 py-4">

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

        {/* Grille cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(projects) && projects.map((project, index) => (
            <ProjectCard key={project.id ?? index} project={project} index={index} />
          ))}
        </div>

        {/* CTA GitHub */}
        <motion.div
          className="flex justify-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.a
            href="https://github.com/OUomar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl
              text-[13.5px] font-semibold
              border border-slate-200 dark:border-[#1A3048]
              bg-transparent
              text-slate-600 dark:text-slate-400
              hover:border-[#2E86AB]/50 dark:hover:border-[#2E86AB]/40
              hover:text-[#2E86AB] dark:hover:text-[#2E86AB]
              hover:bg-[#2E86AB]/05 dark:hover:bg-[#2E86AB]/06
              transition-all duration-200"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            <FiGithub className="text-[15px]" />
            {githubCta}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;