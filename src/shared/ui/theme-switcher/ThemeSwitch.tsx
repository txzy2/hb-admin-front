import {Moon, Sun} from 'lucide-react';
import {useSetTheme, useTheme} from '@/store/ui/ui-store';

import {Button} from '@radix-ui/themes';
import {Hover} from '@/shared/animations';
import React from 'react';

interface ThemeSwitcherProps {
  className?: string
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({className=''}) => {
  const theme = useTheme();
  const setTheme = useSetTheme();

  return (
    <Hover scale={1.1}>
      <Button
        className={`cursor-pointer  group ${className}`}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        title='Сменить тему'
      >
        {theme === 'dark' ? (
          <Sun size={20} className={`text-${theme as 'dark' | 'light' === 'dark' ? 'white' : 'black'}`} />
        ) : (
          <Moon size={20} className={`group-hover:text-${theme as 'dark' | 'light' === 'dark' ? 'white' : 'black'}`} />
        )}
      </Button>
    </Hover>
  );
};

export default ThemeSwitcher;
