import {AnimatePresence, motion} from 'framer-motion';
import React, {useState} from 'react';

import {Link} from 'react-router-dom';
import {list} from '@/shared/constants/links';
import {useTranslation} from 'react-i18next';
import LanguageSwitcher from '../language-switcher/LanguageSwitch';

export const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {t} = useTranslation(['nav']);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const buttonVariants = {
    closed: {rotate: 0},
    open: {rotate: 180}
  };

  const lineVariants = {
    closed: {
      rotate: 0,
      y: 0
    },
    open: {
      rotate: 45,
      y: 8
    }
  };

  const lineVariants2 = {
    closed: {
      rotate: 0,
      y: 0
    },
    open: {
      rotate: -45,
      y: -8
    }
  };

  return (
    <div className='relative'>
      <motion.button
        className={`flex flex-col ${isOpen ? 'gap-2' : 'gap-1'} p-2 z-50 ${
          isOpen ? 'fixed right-5 top-5' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
        variants={buttonVariants}
        animate={isOpen ? 'open' : 'closed'}
      >
        <motion.div
          className={`w-7 h-[4px] rounded-full ${
            isOpen ? 'bg-black' : 'bg-white'
          }`}
          variants={lineVariants}
        />
        <motion.div
          className={`w-7 h-[4px] rounded-full ${
            isOpen ? 'bg-black' : 'bg-white'
          }`}
          variants={lineVariants2}
        />
        <motion.div
          className={`w-7 h-[4px] rounded-full ${
            isOpen ? 'bg-black' : 'bg-white'
          }`}
          variants={lineVariants2}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='fixed inset-0 bg-[#FAFAFA] z-40'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
          >
            <motion.div
              className='h-full w-full flex flex-col items-center justify-center'
              variants={menuVariants}
              initial='closed'
              animate='open'
              exit='closed'
            >
              <ul className='flex flex-col gap-3'>
                {list.map(({titleKey, link}, i: number) => (
                  <motion.li
                    key={i}
                    whileTap={{scale: 0.95}}
                    className='text-center'
                  >
                    <Link
                      to={link}
                      className='text-black font-bold text-2xl'
                      onClick={() => setIsOpen(false)}
                    >
                      {t(titleKey, {ns: 'nav'})}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <LanguageSwitcher
                className='bg-transparent !text-black font-bold !text-2xl pt-3'
                iconSize={24}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
