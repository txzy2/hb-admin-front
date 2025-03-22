import {FadeIn, Hover, LeftToRight} from '@/shared/animations';

import {Flex} from '@radix-ui/themes';
import {Link} from 'react-router-dom';
import React from 'react';

const MainLayout: React.FC = () => {
  return (
    <FadeIn className='h-[85vh] flex flex-col justify-center items-center select-none'>
      <Flex className='w-full flex-col text-[60px] px-40 py-0'>
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
    </FadeIn>
  );
};

export default MainLayout;
