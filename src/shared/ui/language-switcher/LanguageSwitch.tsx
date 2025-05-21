import {Button} from '@radix-ui/themes';
import {Globe} from 'lucide-react';
import useThemeStore from '@/store/ui/ui-store';
import {useTranslation} from 'react-i18next';

interface LanguageSwitcherProps {
  text?: {
    size?: number;
  };
  iconSize?: number;
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  text = {size: 18},
  iconSize = 18,
  className = ''
}) => {
  const {i18n} = useTranslation();
  const {size} = text;

  const theme = useThemeStore(state => state.theme);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      className={`cursor-pointer text-[${size}px] text-${
        (theme as 'dark' | 'light') === 'dark' ? 'white' : 'black'
      } group ${className}`}
      onClick={toggleLanguage}
      title='Сменить язык'
    >
      <Globe size={iconSize} />
      {i18n.language.toUpperCase()}
    </Button>
  );
};

export default LanguageSwitcher;
