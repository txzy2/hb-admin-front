import {Code, Theme} from '@radix-ui/themes';
import {FadeIn} from '@/shared/animations';
import {Outlet, useLocation} from 'react-router-dom';
import React, {useEffect, useState} from 'react';

import {Loader} from '@/shared/ui';
import useThemeStore from '@/store/ui/ui-store';

const Layout: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(true);

  const currentRoute = useLocation();
  const theme = useThemeStore(state => state.theme);

  useEffect(() => {
    const timeout = setTimeout(() => setLoader(false));

    return () => clearTimeout(timeout);
  }, []);

  if (loader) {
    return (
      <FadeIn delay={0.5}>
        <Loader
          className='h-screen flex items-center justify-center gap-1'
          needSpin={true}
          iconSize={25}
          title={{
            need: true
          }}
          sub={false}
        />
      </FadeIn>
    );
  }

  return (
    <Theme
      accentColor='amber'
      grayColor='sand'
      panelBackground='solid'
      appearance={theme}
      radius='medium'
      className={`${currentRoute.pathname === '/' ? 'bg' : ''}`}
    >
      <div>
        <div className='w-full'>
          <Outlet />
        </div>

        <footer className='h-[5vh] text-[13px] flex items-center justify-center gap-1'>
          <div className='flex items-center gap-1'>
            HookahBooking
            <FadeIn delay={1.5}>
              <Code className='font-bold text-orange-400'>
                {/* {import.meta.env.VITE_APP_VERSION} */}
                {import.meta.env.VITE_APP_VERSION}
              </Code>
            </FadeIn>
          </div>
        </footer>
      </div>
    </Theme>
  );
};

export default Layout;
