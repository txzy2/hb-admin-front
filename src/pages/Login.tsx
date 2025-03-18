import { CircleAlert, Eye, EyeOff, Lock, LogIn, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { Hover } from '@/shared/animations';
import { validateAuth } from '@/shared/lib/validator';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [islValid, setIslValid] = useState<boolean>(true);
  const [error, setError] = useState<string | boolean>();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const validateandLogIn = (event: React.MouseEvent) => {
    event.preventDefault();

    const validateData = validateAuth({ email, password });
    console.log(validateData);

    if (
      validateData.validEmail &&
      validateData.validPass &&
      email === 'kamaeff2@gmail.com' &&
      password === 'kal%08Py'
    ) {
      localStorage.setItem('token', '1234');
      navigate('/');
      console.log('Успешный вход');
    } else if (validateData?.validateInputs === true) {
      if (!validateData.validEmail) {
        setError('Невалидная почта');
      } else if (!validateData.validPass) {
        setError('Пароль не соответствует требованиям');
      } else {
        setError('Непредвиденная ошибка, обновите страницу');
      }
    } else {
      setError(validateData.validateInputs);
    }
  };

  return (
    <div className='h-[95vh] flex flex-col items-center justify-center gap-5'>
      <a href='/'>
        {/* <img src='/LogoLight.png' alt='loginLogo' width={230} /> */}
        <img src='/logo.png' alt='loginLogo' width={230} />
      </a>

      <form className='flex flex-col gap-5 text-[14px]'>
        <div className='relative'>
          <input
            className={`px-24 pb-1 bg-transparent border-b outline-none pl-8 w-full text-[13px]`}
            type='email'
            placeholder='Электронная почта'
            maxLength={30}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setError('');
              setIslValid(true);
            }}
          />
          <span className='absolute left-1 top-1/3 transform -translate-y-1/2'>
            <User2 size={20} color={`${!islValid ? '#f87171' : '#fb923c'}`} />
          </span>
        </div>

        <div className='relative'>
          <input
            className={`px-24 pb-1 bg-transparent border-b outline-none pl-8 w-full text-[13px]`}
            type={showPassword ? 'text' : 'password'}
            placeholder='Пароль'
            maxLength={24}
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setError('');
              setIslValid(true);
            }}
          />

          <span className='absolute left-1 top-1/3 transform -translate-y-1/2'>
            <Lock size={20} color={`${!islValid ? '#f87171' : '#fb923c'}`} />
          </span>

          <button
            onClick={(event: React.MouseEvent) => {
              event.preventDefault();
              setShowPassword(!showPassword);
            }}
            className='absolute right-1 top-1/2 transform -translate-y-1/2'
          >
            <Hover scale={1.1}>
              {showPassword ? (
                <EyeOff
                  size={20}
                  color={`${!islValid ? '#f87171' : '#fb923c'}`}
                />
              ) : (
                <Eye size={20} color={`${!islValid ? '#f87171' : '#fb923c'}`} />
              )}
            </Hover>
          </button>
        </div>

        <div className='flex flex-col items-center justify-between gap-2'>
          <button className='w-full' type='submit' onClick={validateandLogIn}>
            <Hover
              scale={1.02}
              className='flex items-center gap-2 justify-center py-2 bg-[#fb923c] text-gray-800 font-bold rounded-2xl'
            >
              <LogIn size={18} strokeWidth={3} /> Войти
            </Hover>
          </button>

          <Hover scale={1.05}>
            <Link to='/register' className='text-[#fb923c] text-[13px]'>
              Еще нет аккаунта?
            </Link>
          </Hover>
        </div>

        <div
          className='flex items-center justify-center gap-1 text-red-400 text-[12px]'
          style={{ minHeight: '20px' }}
        >
          {error && (
            <>
              <CircleAlert size={18} /> {error}
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
