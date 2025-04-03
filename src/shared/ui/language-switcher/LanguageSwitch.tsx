import {Globe} from 'lucide-react';
import {useTranslation} from 'react-i18next';

interface LanguageSwitcherProps {
  text?: {
    size?: number;
    color?: string;
    hoverColor?: string;
  };
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  text = {size: 18, color: '#fff', hoverColor: '#C3073F'}
}) => {
  const {i18n} = useTranslation();
  const {size, color, hoverColor} = text;

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      className={`flex items-center text-[${size}px] gap-1 text-[${color}] transition-colors hover:text-[${hoverColor}]`}
      onClick={toggleLanguage}
    >
      <Globe size={18} />
      {i18n.language.toUpperCase()}
    </button>
  );
};
