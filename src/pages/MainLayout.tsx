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
            <ul className='flex items-center gap-2 bg-white text-black pt-3 px-2 tracking-[-2px] text-[20px]'>
              {list.map(({titleKey, link}, i: number) => (
                <li key={i} className='hover:underline leading-none'>
                  <Hover scale={1.02}>
                    <Link to={link} className='font-bold'>
                      {t(titleKey)}
                    </Link>
                  </Hover>
                </li>
              ))}
            </ul>
          </nav>

          <LanguageSwitcher />
        </div>

        <div className='h-[90vh] flex flex-col justify-between items-center select-none'>
          <FadeIn className='w-full flex flex-col text-[55px] md:px-20 px-40 py-0 flex-grow justify-center'>
            <h2 className='leading-none'>
              <Link
                to='/register'
                className='group tracking-[-8px] uppercase font-bold'
              >
                <Flex
                  gap={'5'}
                  className='transition-all duration-200 hover:text-[#C3073F]'
                >
                  <span className='group-hover:tracking-[-4px] transition-all duration-200'>
                    {t('main.connect.first')}
                  </span>
                  <span className='group-hover:tracking-[0px] transition-all duration-200'>
                    {t('main.connect.second')}
                  </span>
                  <span className='group-hover:tracking-[2px] transition-all duration-200'>
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
                  className='group tracking-[-8px] uppercase font-bold'
                >
                  <Flex
                    gap={'5'}
                    className='transition-all duration-200 hover:text-[#C3073F]'
                  >
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
            className='mb-4 text-[20px] px-6 font-normal uppercase border border-white'
            onClick={scrollToNextSection}
          >
            {t('main.about')}
          </button>
        </div>
      </div>

      {/* <div ref={nextSectionRef} className='h-[95vh]'>
        <div>Это следующий контейнер</div>
      </div> */}
    </div>
  );
};

export default MainLayout;
