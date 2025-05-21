import {FadeIn, LeftToRight} from '@/shared/animations';

import {BurgerMenu} from '@/shared/ui/burger-menu/BurgerMenu';
import {Flex} from '@radix-ui/themes';
import LanguageSwitcher from '@/shared/ui/language-switcher/LanguageSwitch';
import {Link} from 'react-router-dom';
import React from 'react';
import {list} from '@/shared/constants/links';
import {useTranslation} from 'react-i18next';

const MainLayout: React.FC = React.memo(() => {
  const {t, i18n} = useTranslation(['nav', 'main']);

  const isRussian = i18n.language === 'ru';

  return (
    <div className=''>
      <div className='bg'>
        <div className='h-[10vh] flex items-center justify-end me-0 sm:me-20 gap-[25px] uppercase'>
          <nav className='hidden sm:block'>
            <ul className='flex flex-col sm:flex-row items-center gap-2 px-4 pt-[10px] bg-white text-black tracking-[-2px]'>
              {list.map(({titleKey, link}, i: number) => (
                <li
                  key={i}
                  className='leading-none m-0 transition-colors duration-300 hover:text-[#C3073F]'
                >
                  <Link
                    to={link}
                    className='font-bold text-[16px] sm:text-[20px] leading-none'
                  >
                    {t(titleKey, {ns: 'nav'})}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className='sm:hidden m-auto p-0'>
            <BurgerMenu />
          </div>

          <LanguageSwitcher
            className='hidden lg:block p-0 bg-transparent text-white transition-colors duration-500 hover:text-[#C3073F] '
            text={{size: 19}}
          />
        </div>

        <div className='h-[90vh] flex flex-col justify-between items-start select-none text-white'>
          <FadeIn className='flex flex-col text-[30px] sm:text-[55px] md:px-20 px-10 py-0 flex-grow justify-center'>
            <h2 className='leading-none'>
              <Link
                to='/register'
                className='group tracking-[-5px] sm:tracking-[-8px] uppercase font-bold'
              >
                <Flex className='flex-nowrap gap-2 md:gap-5 text-[26px] md:text-[60px] items-center leading-7 whitespace-nowrap transition-all duration-200 hover:text-[#C3073F] '>
                  <span className='group-hover:tracking-[-4px] transition-all duration-200'>
                    {t('connect.first', {ns: 'main'})}
                  </span>
                  <span className='group-hover:tracking-[0px] transition-all duration-200'>
                    {t('connect.second', {ns: 'main'})}
                  </span>
                  <span className='group-hover:tracking-[2px] transition-all duration-200'>
                    {t('connect.third', {ns: 'main'})}
                  </span>
                </Flex>
              </Link>
            </h2>

            <div className='leading-none text-[35px] md:text-[45px] italic text-[#C3073F]'>
              {t('or', {ns: 'main'})}
            </div>

            <LeftToRight>
              <h2 className='leading-none'>
                <Link
                  to='/register'
                  className='group tracking-[-5px] sm:tracking-[-8px] uppercase font-bold'
                >
                  <Flex
                    className={`text-[28px] sm:text-[55px] transition-all duration-200 hover:text-[#C3073F] gap-1 md:gap-5 flex-nowrap items-center whitespace-nowrap`}
                  >
                    <div className='flex gap-1 md:gap-5 flex-nowrap'>
                      <span className='group-hover:tracking-[-4px] transition-all duration-200'>
                        {t('book.first', {ns: 'main'})}
                      </span>
                      <span className='group-hover:tracking-[0px] transition-all duration-200'>
                        {t('book.second', {ns: 'main'})}
                      </span>
                    </div>
                    <span className='group-hover:tracking-[2px] transition-all duration-200'>
                      {t('book.third', {ns: 'main'})}
                    </span>
                  </Flex>
                </Link>
              </h2>
            </LeftToRight>
          </FadeIn>
        </div>
      </div>
    </div>
  );
});

export default MainLayout;
