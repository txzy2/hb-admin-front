import {FadeIn, Hover, LeftToRight} from '@/shared/animations';

import {Flex} from '@radix-ui/themes';
import {Link} from 'react-router-dom';
import React, {useRef} from 'react';
import {list} from '@/shared/constants/links';
import {ChevronDown} from 'lucide-react';

const MainLayout: React.FC = () => {
  const nextSectionRef = useRef<HTMLDivElement>(null);

  const scrollToNextSection = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <div className=''>
      <nav className='fixed right-20 h-[10vh] flex items-center uppercase'>
        <ul className='flex items-center gap-2 bg-white text-black pt-3 px-2 tracking-[-2px] text-[20px]'>
          {list.map(({title, link}, i) => (
            <li key={i} className='hover:underline leading-none'>
              <Hover scale={1.02}>
                <Link to={link} className='font-bold'>
                  {title}
                </Link>
              </Hover>
            </li>
          ))}
        </ul>
      </nav>

      <FadeIn className='h-screen flex flex-col justify-between items-center select-none'>
        <Flex className='w-full flex-col text-[60px] md:px-20 px-40 py-0 flex-grow justify-center'>
          <h1 className='leading-none'>
            <Link
              to='/register'
              className='group tracking-[-10px] uppercase font-bold'
            >
              <Flex
                gap={'5'}
                className='transition-all duration-200 hover:text-[#C3073F]'
              >
                <span className='group-hover:tracking-[-4px] transition-all duration-200'>
                  Подключи
                </span>
                <span className='group-hover:tracking-[0px] transition-all duration-200'>
                  свою
                </span>
                <span className='group-hover:tracking-[2px] transition-all duration-200'>
                  организацию
                </span>
              </Flex>
            </Link>
          </h1>

          <div className='leading-none text-[45px] italic text-[#C3073F]'>
            или
          </div>

          <LeftToRight>
            <h1 className='leading-none'>
              <Link
                to='/register'
                className='group tracking-[-8px] uppercase font-bold'
              >
                <Flex
                  gap={'5'}
                  className='transition-all duration-200 hover:text-[#C3073F]'
                >
                  <span className='group-hover:tracking-[-4px] transition-all duration-200'>
                    Забронируй
                  </span>
                  <span className='group-hover:tracking-[0px] transition-all duration-200'>
                    свой
                  </span>
                  <span className='group-hover:tracking-[2px] transition-all duration-200'>
                    кальян
                  </span>
                </Flex>
              </Link>
            </h1>
          </LeftToRight>
        </Flex>
        {/* 
      <Flex>
        <h2 className='text-[32px]'>Наши партнеры</h2>
      </Flex> */}

        <div className='mb-4'>
          <Hover scale={1.1} className='cursor-pointer'>
            <ChevronDown size={30} className='' onClick={scrollToNextSection} />
          </Hover>
        </div>
      </FadeIn>

      <div ref={nextSectionRef} className='h-[95vh]'>
        {/* Контент следующего контейнера */}
        <h2>Это следующий контейнер</h2>
      </div>
    </div>
  );
};

export default MainLayout;
