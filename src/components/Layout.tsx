import React, {useEffect, useState} from 'react';

import {Loader} from '@/shared/ui';
import {Outlet} from 'react-router-dom';
import {Theme} from '@radix-ui/themes';
import useThemeStore from '@/store/ui/ui-store';

const Layout: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // const currentRoute = useLocation();
  const theme = useThemeStore(state => state.theme);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 500);

    window.addEventListener('load', () => setIsLoading(false));

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('load', () => setIsLoading(false));
    };
  }, []);

  if (isLoading) {
    return (
      <Loader
        className='h-screen flex items-center justify-center gap-1'
        needSpin={true}
        iconSize={25}
        title={{
          need: true
        }}
        sub={false}
      />
    );
  }

  return (
    <Theme
      accentColor='amber'
      grayColor='sand'
      panelBackground='solid'
      appearance={theme}
      radius='medium'
      // className={`${currentRoute.pathname === '/' ? 'bg' : ''}`}
    >
      <div>
        <div className='w-full'>
          <Outlet />
        </div>
      </div>
    </Theme>
  );
};

export default Layout;
