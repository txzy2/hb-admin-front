import {CircleAlert, Eye, EyeOff, Lock, LogIn, User2} from 'lucide-react';
import {IconButton, TextField} from '@radix-ui/themes';
import {Link, useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import useAuthStore, {useIsAuthenticated} from '@/store/auth/auth-store';

import {Hover} from '@/shared/animations';
import Validator from '@/shared/lib/validator';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [islValid, setIslValid] = useState<boolean>(true);
  const [error, setError] = useState<string | boolean>();

  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const validateandLogIn = (event: React.MouseEvent) => {
    event.preventDefault();

    const validator = new Validator({email, password});
    const validateData = validator.validate();

    if (
      validateData.validEmail &&
      validateData.validPass &&
      email === 'kamaeff2@gmail.com' &&
      password === 'kal%08Py'
    ) {
      login('1234', email);
      navigate('/');
      console.log('Успешный вход');
    } else {
      setError(
        validateData.validateInputs === true
          ? validator.getErrorMessage(validateData)
          : validateData.validateInputs
      );
    }
  };

  return (
    <div className='h-[95vh] flex flex-col items-center justify-center gap-5'>
      <a href='/'>
        {/* <img src='/LogoLight.png' alt='loginLogo' width={230} /> */}
        <img src='/logo.png' alt='loginLogo' width={230} />
      </a>

      <form className='w-[80%] md:w-[40%] xl:w-[17%] flex flex-col gap-5 text-[14px]'>
        <TextField.Root
          className={`w-full text-[13px]`}
          type='email'
          placeholder='Электронная почта'
          maxLength={30}
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            setError('');
            setIslValid(true);
          }}
        >
          <TextField.Slot>
            <User2 size={20} color={`${!islValid ? '#f87171' : '#fb923c'}`} />
          </TextField.Slot>
        </TextField.Root>

        <TextField.Root
          className={`text-[13px]`}
          type={showPassword ? 'text' : 'password'}
          placeholder='Пароль'
          maxLength={24}
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            setError('');
            setIslValid(true);
          }}
        >
          <TextField.Slot>
            <Lock size={20} color={`${!islValid ? '#f87171' : '#fb923c'}`} />
          </TextField.Slot>

          <TextField.Slot>
            <button
              onClick={(event: React.MouseEvent) => {
                event.preventDefault();
                setShowPassword(!showPassword);
              }}
            >
              <Hover scale={1.1}>
                {showPassword ? (
                  <EyeOff
                    size={20}
                    color={`${!islValid ? '#f87171' : '#fb923c'}`}
                  />
                ) : (
                  <Eye
                    size={20}
                    color={`${!islValid ? '#f87171' : '#fb923c'}`}
                  />
                )}
              </Hover>
            </button>
          </TextField.Slot>
        </TextField.Root>

        <div className='flex flex-col items-center justify-between gap-2'>
          <Hover scale={1.02} className='w-full'>
            <IconButton
              type='submit'
              onClick={validateandLogIn}
              className='w-full flex items-center gap-1 cursor-pointer bg-[#fb923c] text-black font-bold'
            >
              <LogIn size={18} strokeWidth={3} /> Войти
            </IconButton>
          </Hover>

          <Hover scale={1.05}>
            <Link to='/register' className='text-[#fb923c] text-[13px]'>
              Еще нет аккаунта?
            </Link>
          </Hover>
        </div>

        <div
          className='flex items-center justify-center gap-1 text-red-400 text-[12px]'
          style={{minHeight: '20px'}}
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
