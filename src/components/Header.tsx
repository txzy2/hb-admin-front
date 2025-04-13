import {Button, Dialog, DropdownMenu, Flex} from '@radix-ui/themes';
import {DownToUp, Hover, LeftToRight} from '@/shared/animations';
import {Link, useNavigate} from 'react-router-dom';
import {LogOut, User2, X} from 'lucide-react';
import React, {useEffect, useState} from 'react';
import useAuthStore, {
  useAuthEmail,
  useAuthUsername,
  useIsAuthenticated
} from '@/store/auth/auth-store';

import {ThemeSwitch} from '@/shared/ui';
import {useTheme} from '@/store/ui/ui-store';

const Header: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const isAuthenticated = useIsAuthenticated();
  const email = useAuthEmail();
  const username = useAuthUsername();
  const logout = useAuthStore(state => state.logout);
  const theme = useTheme();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      event.ctrlKey &&
      event.shiftKey &&
      (event.key === 'E' || event.key === 'У')
    ) {
      setIsDialogOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className='h-[10vh] flex items-center justify-between gap-2 px-10 '>
      {isAuthenticated && (
        <>
          <LeftToRight delay={0.5}>
            <Hover scale={1.1}>
              <Link className='font-bold' to='/panel'>
                <img src='/logo.png' alt='Logo' />
              </Link>
            </Hover>
          </LeftToRight>

          <DownToUp>
            <div className='flex items-center gap-5 font-bold'>
              <Hover scale={1.05}>
                <button onClick={() => navigate('/panel')}>Dashboard</button>
              </Hover>
              <Hover scale={1.05}>
                <button onClick={() => navigate('/panel/about')}>
                  Clients
                </button>
              </Hover>
            </div>
          </DownToUp>
        </>
      )}

      <div className='flex items-center gap-2'>
        {isAuthenticated ? (
          <div className='flex items-center gap-3 text-[16px]'>
            <ThemeSwitch className='bg-transparent' />

            <DropdownMenu.Root>
              <DropdownMenu.Trigger
                title='Профиль'
                className={`cursor-pointer bg-transparent p-0 ${
                  theme === 'light' ? 'text-black' : 'text-white'
                } outline-none`}
              >
                <Button variant='soft'>
                  {username ?? email}
                  <DropdownMenu.TriggerIcon />
                </Button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content>
                <Hover scale={1.01}>
                  <DropdownMenu.Item
                    className='cursor-pointer'
                    shortcut='Ctrl+Shift+E'
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <User2 size={16} /> Профиль
                  </DropdownMenu.Item>
                </Hover>
                <Hover scale={1.01}>
                  <DropdownMenu.Item
                    className='cursor-pointer font-bold'
                    onClick={() => {
                      logout();
                      navigate('/');

                      window.location.reload();
                    }}
                  >
                    <LogOut size={16} /> Выйти
                  </DropdownMenu.Item>
                </Hover>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        ) : (
          ''
        )}
      </div>

      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Content>
          <Dialog.Title>
            <Flex
              justify={'between'}
              className={theme === 'light' ? 'text-black' : 'text-white'}
            >
              <div className='flex gap-1'>
                {username ?? ''}{' '}
                <span className='text-[16px] font-normal'>
                  {username ? '(' + email + ')' : email}
                </span>
              </div>
              <Hover scale={1.02}>
                <Button
                  className='bg-transparent cursor-pointer p-0 outline-none'
                  onClick={() => setIsDialogOpen(false)}
                >
                  <X size={18} className='text-orange-500' />
                </Button>
              </Hover>
            </Flex>
          </Dialog.Title>
          <Dialog.Description>
            TODO: добавить DATA LIST из radix
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default Header;
