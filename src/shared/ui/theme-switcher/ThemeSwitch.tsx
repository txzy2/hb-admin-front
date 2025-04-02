import {Moon, Sun} from 'lucide-react';
import React from 'react';
import {Button} from '@radix-ui/themes';

import {useSetTheme, useTheme} from '@/store/ui/ui-store';
import {Hover} from '@/shared/animations';

const ThemeSwitcher: React.FC = () => {
  const theme = useTheme();
  const setTheme = useSetTheme();

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <Hover scale={1.1}>
      <Button
        className='bg-transparent cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 group'
        onClick={toggleTheme}
        title='Сменить тему'
      >
        {theme === 'dark' ? (
          <Sun size={20} className='text-white' />
        ) : (
          <Moon size={20} className='group-hover:text-white' />
        )}
      </Button>
    </Hover>
  );
};

export default ThemeSwitcher;
