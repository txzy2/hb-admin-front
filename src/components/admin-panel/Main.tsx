import {DownToUp, FadeIn, Hover, Rotete} from '@/shared/animations';

import {BookCopy} from 'lucide-react';
import Header from './Header.tsx';
import {Link} from 'react-router-dom';
import React from 'react';

const Main: React.FC = () => {
  return (
    <div className=''>
      <Header />

      <div className='h-[85vh] flex flex-col justify-center items-center gap-2'>
        <div className='flex flex-col items-center gap-2'>
          <div className='flex items-center gap-2'>
            <FadeIn delay={1}>
              <a href='https://vitejs.dev' target='_blank'>
                <Hover
                  className='cursor-pointer flex items-center gap-2 '
                  scale={1.05}
                >
                  <Rotete delay={0.7}>
                    <img src='/vite.svg' width={60} alt='logo1' />
                  </Rotete>
                  <code className='px-2 font-bold border rounded-lg'>Vite</code>
                </Hover>
              </a>
            </FadeIn>

            <span className='text-[20px]'>+</span>

            <FadeIn delay={1.2}>
              <a href='https://react.dev' target='_blank'>
                <Hover
                  className='cursor-pointer flex items-center gap-2 '
                  scale={1.05}
                >
                  <Rotete delay={1}>
                    <img src='/react.svg' width={60} alt='logo2' />
                  </Rotete>
                  <code className='px-2 font-bold border rounded-lg'>
                    React
                  </code>
                </Hover>
              </a>
            </FadeIn>
          </div>
        </div>

        <DownToUp delay={1.5}>
          <Link to='/about'>
            <Hover>
              <code className='flex items-center gap-1 font-bold underline'>
                <BookCopy /> About
              </code>
            </Hover>
          </Link>
        </DownToUp>
      </div>
    </div>
  );
};

export default Main;
