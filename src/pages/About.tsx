import React from 'react';
import { FadeIn, Hover, LeftToRight } from '@/shared/animations';
import { Link } from 'react-router-dom';
import { HouseIcon } from 'lucide-react';
import { list } from '@/shared/constants/links';

const About: React.FC = () => {
  return (
    <FadeIn className='h-[75vh] flex flex-col items-center justify-center'>
      <div className='flex items-center gap-4 about'>
        <div className='flex items-center gap-1'>
          <code className='font-bold'> Simple</code>

          <FadeIn delay={1.2}>and</FadeIn>

          <code className='font-bold'>Powerfull</code>

          <FadeIn className='flex items-center gap-1' delay={1.2}>
            starter pack for
            <Hover>
              <code>
                <a
                  className='flex items-center gap-1 font-bold underline'
                  href='https://react.dev'
                  target='_blank'
                >
                  <img src='/react.svg' width={25} alt='logo' />
                  React
                </a>
              </code>
            </Hover>
          </FadeIn>
        </div>

        <div className='border-s-2 border-black px-2 about__border'>
          <ul>
            {list.map(({ title, link }, i) => (
              <LeftToRight delay={1 + i * 0.1}>
                <li key={i} className='flex'>
                  -
                  <Hover scale={1.05}>
                    <a href={link} target='_blank'>
                      <code className='underline font-bold ps-2'>{title}</code>
                    </a>
                  </Hover>
                </li>
              </LeftToRight>
            ))}
          </ul>
        </div>
      </div>

      <FadeIn delay={0.8}>
        <Hover scale={1.05}>
          <Link className='underline' to='/'>
            <code className='flex items-center gap-1'>
              <HouseIcon /> Back
            </code>
          </Link>
        </Hover>
      </FadeIn>
    </FadeIn>
  );
};

export default About;
