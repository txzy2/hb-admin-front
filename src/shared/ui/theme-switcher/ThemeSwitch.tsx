import {Moon, Sun} from 'lucide-react';
import {useSetTheme, useTheme} from '@/store/ui/ui-store';

import {Button} from '@radix-ui/themes';
import {Hover} from '@/shared/animations';
import React from 'react';

const ThemeSwitcher: React.FC = () => {
  const theme = useTheme();
  const setTheme = useSetTheme();

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <Hover scale={1.1}>
      <Button
        className='bg-transparent cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'
        onClick={toggleTheme}
        title='Сменить тему'
      >
        {theme === 'dark' ? (
          <Sun size={20} className='text-white' />
        ) : (
          <Moon size={20} />
        )}
      </Button>
    </Hover>
  );
};

export default ThemeSwitcher;
