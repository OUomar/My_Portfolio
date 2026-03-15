import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import frNavbar     from './locales/fr/navbar.json';
import frHero       from './locales/fr/hero.json';
import frAbout      from './locales/fr/about.json';
import frSkills     from './locales/fr/skills.json';
import frExperience from './locales/fr/experience.json';
import frEducation from './locales/fr/education.json';
import frProjects   from './locales/fr/projects.json';
import frContact    from './locales/fr/contact.json';
import frFooter     from './locales/fr/footer.json';

import enNavbar     from './locales/en/navbar.json';
import enHero       from './locales/en/hero.json';
import enAbout      from './locales/en/about.json';
import enSkills     from './locales/en/skills.json';
import enExperience from './locales/en/experience.json';
import enEducation from './locales/en/education.json';
import enProjects   from './locales/en/projects.json';
import enContact    from './locales/en/contact.json';
import enFooter     from './locales/en/footer.json';

import arNavbar     from './locales/ar/navbar.json';
import arHero       from './locales/ar/hero.json';
import arAbout      from './locales/ar/about.json';
import arSkills     from './locales/ar/skills.json';
import arExperience from './locales/ar/experience.json';
import arEducation from './locales/ar/education.json';
import arProjects   from './locales/ar/projects.json';
import arContact    from './locales/ar/contact.json';
import arFooter     from './locales/ar/footer.json';


i18n.use(initReactI18next).init({
  resources: {
    fr: { navbar: frNavbar, hero: frHero, about: frAbout, skills: frSkills, experience: frExperience,education: frEducation, projects: frProjects, contact: frContact, footer: frFooter },
    en: { navbar: enNavbar, hero: enHero, about: enAbout, skills: enSkills, experience: enExperience,education: enEducation, projects: enProjects, contact: enContact, footer: enFooter },
    ar: { navbar: arNavbar, hero: arHero, about: arAbout, skills: arSkills, experience: arExperience,education: arEducation, projects: arProjects, contact: arContact, footer: arFooter },
  },
  lng: localStorage.getItem('lang') ?? 'fr',
  fallbackLng: 'fr',
  interpolation: { escapeValue: false },
});
const savedLang = localStorage.getItem('lang') ?? 'fr';
document.documentElement.dir  = savedLang === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = savedLang;

export default i18n;