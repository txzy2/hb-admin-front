import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { list } from '@/shared/constants/links';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../language-switcher/LanguageSwitch';

export const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation(['nav']);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: { duration: 0.3 }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  // Анимация для верхней линии (превращается в верхнюю часть крестика)
  const topLine = {
    closed: { rotate: 0, y: 0, width: '28px' },
    open: { rotate: 45, y: 8, width: '28px' }
  };

  // Анимация для средней линии (исчезает)
  const middleLine = {
    closed: { opacity: 1, width: '28px' },
    open: { opacity: 0, width: '0px' }
  };

  // Анимация для нижней линии (превращается в нижнюю часть крестика)
  const bottomLine = {
    closed: { rotate: 0, y: 0, width: '28px' },
    open: { rotate: -45, y: -8, width: '28px' }
  };

  return (
    <div className='relative'>
      <motion.button
        className={`flex flex-col items-center justify-center gap-1.5 z-50 ${isOpen ? 'fixed left-1/2 top-5 -translate-x-1/2' : ''
          }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          className={`h-[3px] ${isOpen ? 'bg-black' : 'bg-white'} rounded-full`}
          variants={topLine}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className={`h-[3px] ${isOpen ? 'bg-black' : 'bg-white'} rounded-full`}
          variants={middleLine}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className={`h-[3px] ${isOpen ? 'bg-black' : 'bg-white'} rounded-full`}
          variants={bottomLine}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Меню */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='fixed inset-0 bg-[#FAFAFA] z-40'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className='h-full w-full flex flex-col items-center justify-center'
              variants={menuVariants}
              initial='closed'
              animate='open'
              exit='closed'
            >
              <ul className='flex flex-col gap-6 text-center'>
                {list.map(({ titleKey, link }, i) => (
                  <motion.li key={i} whileTap={{ scale: 0.95 }}>
                    <Link
                      to={link}
                      className='text-black font-bold text-2xl'
                      onClick={() => setIsOpen(false)}
                    >
                      {t(titleKey, { ns: 'nav' })}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className='mt-8'>
                <LanguageSwitcher
                  className='bg-transparent !text-black font-bold text-2xl'
                  iconSize={28}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
