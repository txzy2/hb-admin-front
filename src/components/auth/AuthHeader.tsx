import {LanguageSwitcher} from '@/shared/ui/language-switcher/LanguageSwitch';
import React from 'react';

const AuthHeader: React.FC = () => {
  return (
    <div className='h-[5vh] self-end me-10 flex items-center'>
      <LanguageSwitcher />
    </div>
  );
};

export default AuthHeader;
