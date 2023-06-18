import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EN from './en/en.json';
import PT from './pt/pt.json';

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: EN },
    pt: { translation: PT },
  },
});

export default i18n;
