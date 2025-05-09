import {FadeIn, LeftToRight} from '@/shared/animations';
import React, {useCallback, useRef} from 'react';

import {BurgerMenu} from '@/shared/ui/burger-menu/BurgerMenu';
import {Flex} from '@radix-ui/themes';
import {Link} from 'react-router-dom';
import {list} from '@/shared/constants/links';
import {useTranslation} from 'react-i18next';

const LanguageSwitcher = React.lazy(
  () => import('@/shared/ui/language-switcher/LanguageSwitch')
);

const MainLayout: React.FC = React.memo(() => {
  const {t, i18n} = useTranslation(['nav', 'main']);
  const nextSectionRef = useRef<HTMLDivElement>(null);

  const isRussian = i18n.language === 'ru';

  const scrollToNextSection = useCallback(() => {
    // Мемоизировать функцию
    nextSectionRef.current?.scrollIntoView({behavior: 'smooth'});
  }, []);

  return (
    <div className=''>
      <div className='bg'>
        <div className='h-[10vh] flex items-center justify-end me-5 sm:me-20 gap-[25px] uppercase'>
          <nav className='hidden sm:block'>
            <ul className='flex flex-col sm:flex-row items-center gap-2 bg-white text-black p-2 tracking-[-2px]'>
              {list.map(({titleKey, link}, i: number) => (
                <li
                  key={i}
                  className='leading-none transition-colors duration-500 hover:text-[#C3073F]'
                >
                  <Link
                    to={link}
                    className='font-bold text-[16px] sm:text-[20px]'
                  >
                    {t(titleKey, {ns: 'nav'})}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className='sm:hidden'>
            <BurgerMenu />
          </div>

          <LanguageSwitcher
            className='p-0 bg-transparent text-white transition-colors duration-500 hover:text-[#C3073F]'
            text={{size: 19}}
          />
        </div>

        <div className='h-[90vh] flex flex-col justify-between items-start select-none text-white'>
          <FadeIn className='flex flex-col text-[30px] sm:text-[55px] md:px-20 px-10 py-0 flex-grow justify-center'>
            <h2 className='leading-none '>
              <Link
                to='/register'
                className='group tracking-[-3px] sm:tracking-[-8px] uppercase font-bold'
              >
                <Flex className='transition-all duration-200 hover:text-[#C3073F] gap-2 md:gap-5 flex-wrap leading-7'>
                  <span className='group-hover:tracking-[-4px] transition-all duration-200'>
                    {t('connect.first', {ns: 'main'})}
                  </span>
                  <span className='group-hover:tracking-[0px] transition-all duration-200'>
                    {t('connect.second', {ns: 'main'})}
                  </span>
                  <span className='group-hover:tracking-[2px] transition-all duration-200 break-words sm:w-auto w-full'>
                    {t('connect.third', {ns: 'main'})}
                  </span>
                </Flex>
              </Link>
            </h2>

            <div className='leading-none text-[45px] italic text-[#C3073F]'>
              {t('or', {ns: 'main'})}
            </div>

            <LeftToRight>
              <h2 className='leading-none'>
                <Link
                  to='/register'
                  className='group tracking-[-2px] sm:tracking-[-8px] uppercase font-bold'
                >
                  <Flex
                    className={`transition-all duration-200 hover:text-[#C3073F] gap-1 md:gap-5 ${
                      isRussian ? 'flex-col sm:flex-row' : 'flex-row'
                    }`}
                  >
                    <div className='flex gap-1 md:gap-5'>
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

          <button
            className='mb-4 mx-auto text-[20px] px-6 font-normal uppercase border border-white transition-all duration-200 hover:text-[#C3073F] hover:border-[#C3073F]'
            onClick={scrollToNextSection}
          >
            {t('about', {ns: 'main'})}
          </button>
        </div>
      </div>
      <div
        ref={nextSectionRef}
        className='h-screen w-full flex items-center justify-center bg-black'
      >
        123
      </div>
    </div>
  );
});

export default MainLayout;
