import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    ns: ['nav', 'main', 'login', 'register', 'validator'],
    debug: false,
    interpolation: {
      escapeValue: false
    },
    saveMissing: true,
    missingKeyHandler: (lng, ns, key) => {
      console.error(`Missing translation: ${lng}.${ns}.${key}`);
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

i18n.on('languageChanged', lng => {
  document.documentElement.lang = lng;
});

export default i18n;
