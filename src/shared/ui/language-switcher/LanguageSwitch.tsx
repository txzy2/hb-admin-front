import {Globe} from 'lucide-react';
import {useTranslation} from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const {i18n} = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      className={`flex items-center transition-colors hover:text-[#C3073F] text-[18px] gap-1`}
      onClick={toggleLanguage}
    >
      <Globe size={18} />
      {i18n.language.toUpperCase()}
    </button>
  );
};
