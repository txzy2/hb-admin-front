import {Moon, Sun} from 'lucide-react';
import {useSetTheme, useTheme} from '@/store/ui/ui-store';

import {Button} from '@radix-ui/themes';
import {Hover} from '@/shared/animations';
import React from 'react';

const ThemeSwitcher: React.FC = () => {
  const theme = useTheme();
  const setTheme = useSetTheme();
  return (
    <Hover scale={1.1}>
      <Button
        className='bg-transparent cursor-pointer'
        onClick={() => {
          setTheme(theme === 'light' ? 'dark' : 'light');
        }}
        title='Сменить тему'
      >
        {theme === 'dark' ? (
          <Sun size={20} color={'white'} />
        ) : (
          <Moon size={20} />
        )}
      </Button>
    </Hover>
  );
};

export default ThemeSwitcher;
