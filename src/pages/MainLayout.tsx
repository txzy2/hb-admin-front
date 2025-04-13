import {FadeIn, Hover, LeftToRight} from '@/shared/animations';
import React, {useRef} from 'react';

import {Flex} from '@radix-ui/themes';
import {LanguageSwitcher} from '@/shared/ui/language-switcher/LanguageSwitch';
import {Link} from 'react-router-dom';
import {list} from '@/shared/constants/links';
import {useTranslation} from 'react-i18next';

const MainLayout: React.FC = () => {
  const {t} = useTranslation();
  const nextSectionRef = useRef<HTMLDivElement>(null);

  const scrollToNextSection = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <div className=''>
      <div className='bg'>
        <div className='h-[10vh] flex items-center justify-end me-20 gap-4 uppercase'>
          <nav>
            <ul className='flex flex-col sm:flex-row items-center gap-2 bg-white text-black p-2 tracking-[-2px] '>
              {list.map(({titleKey, link}, i: number) => (
                <li key={i} className='hover:underline leading-none'>
                  <Hover scale={1.02}>
                    <Link
                      to={link}
                      className='font-bold text-[16px] sm:text-[20px]'
                    >
                      {t(titleKey)}
                    </Link>
                  </Hover>
                </li>
              ))}
            </ul>
          </nav>

          <LanguageSwitcher />
        </div>

        <div className='h-[90vh] flex flex-col justify-between items-start select-none'>
          <FadeIn className='flex flex-col text-[30px] sm:text-[55px] md:px-20 px-10 py-0 flex-grow justify-center'>
            <h2 className='leading-none'>
              <Link
                to='/register'
                className='group tracking-[-3px] sm:tracking-[-8px] uppercase font-bold'
              >
                <Flex className='transition-all duration-200 hover:text-[#C3073F] gap-2 md:gap-5 flex-wrap leading-7'>
                  <span className='group-hover:tracking-[-4px] transition-all duration-200'>
                    {t('main.connect.first')}
                  </span>
                  <span className='group-hover:tracking-[0px] transition-all duration-200'>
                    {t('main.connect.second')}
                  </span>
                  <span className='group-hover:tracking-[2px] transition-all duration-200 break-words sm:w-auto w-full'>
                    {t('main.connect.third')}
                  </span>
                </Flex>
              </Link>
            </h2>

            <div className='leading-none text-[45px] italic text-[#C3073F]'>
              {t('main.or')}
            </div>

            <LeftToRight>
              <h2 className='leading-none'>
                <Link
                  to='/register'
                  className='group tracking-[-2px] sm:tracking-[-8px] uppercase font-bold'
                >
                  <Flex className='transition-all duration-200 hover:text-[#C3073F] gap-1 md:gap-5'>
                    <span className='group-hover:tracking-[-4px] transition-all duration-200'>
                      {t('main.book.first')}
                    </span>
                    <span className='group-hover:tracking-[0px] transition-all duration-200'>
                      {t('main.book.second')}
                    </span>
                    <span className='group-hover:tracking-[2px] transition-all duration-200'>
                      {t('main.book.third')}
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
            {t('main.about')}
          </button>
        </div>
      </div>

      <div ref={nextSectionRef} className='h-screen'>
        <div>Это следующий контейнер</div>
      </div>
    </div>
  );
};

export default MainLayout;
