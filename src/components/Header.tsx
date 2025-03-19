import {DownToUp, Hover, LeftToRight} from '@/shared/animations';
import {Link, useNavigate} from 'react-router-dom';

import {LogIn} from 'lucide-react';
import React from 'react';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='h-[10vh] flex items-center justify-between gap-2 px-10 '>
      <LeftToRight delay={0.5}>
        <Hover scale={1.1}>
          <Link className='font-bold' to='/'>
            <img src='/logo.png' alt='Logo' />
          </Link>
        </Hover>
      </LeftToRight>

      {localStorage.getItem('token') && (
        <DownToUp>
          <div className='flex items-center gap-5 font-bold'>
            <Hover scale={1.05}>
              <button onClick={() => navigate('/')}>Dashboard</button>
            </Hover>
            <Hover scale={1.05}>
              <button onClick={() => navigate('/about')}>Clients</button>
            </Hover>
          </div>
        </DownToUp>
      )}

      {localStorage.getItem('token') ? (
        <div className='flex items-center gap-3 text-[16px]'>
          <button title='Профиль'>
            <Hover scale={1.05} className='cursor-pointer bg-[#685b14] bg-opacity-45 px-5 py-1 rounded-xl text-[13px]'>
              {localStorage.getItem('email')}
            </Hover>
          </button>

          <button
            title='Выход'
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('email')
              navigate('/login');
            }}
          >
            <Hover scale={1.1}>
              <LogIn size={20} className='text-orange-400' />
            </Hover>
          </button>
        </div>
      ) : (
        <Hover scale={1.05}>
          <Link to='/login'>Log In</Link>
        </Hover>
      )}
    </div>
  );
};

export default Header;
