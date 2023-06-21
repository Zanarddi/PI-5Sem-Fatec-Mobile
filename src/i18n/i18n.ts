import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EN from './en.json';
import PT from './pt.json';
import ES from './es.json';
import FR from './fr.json';
import DE from './de.json';
import JA from './ja.json';
import KO from './ko.json';

i18n.use(initReactI18next).init({
  lng: i18n.options.lng,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: EN },
    pt: { translation: PT },
    es: { translation: ES },
    fr: { translation: FR },
    de: { translation: DE },
    ja: { translation: JA },
    ko: { translation: KO },
  },
});

export default i18n;
