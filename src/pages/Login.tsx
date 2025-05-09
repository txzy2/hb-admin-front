import {CircleAlert, Eye, EyeOff, Lock, LogIn, User2} from 'lucide-react';
import {Form, Link, useNavigate} from 'react-router-dom';
import {IconButton, TextField} from '@radix-ui/themes';
import React, {useEffect, useState} from 'react';
import useAuthStore, {useIsAuthenticated} from '@/store/auth/auth-store';

import {Hover} from '@/shared/animations';
import {Loader} from '@/shared/ui';
import {LoginCore} from '@/shared/lib/auth/login';
import {LoginReturnType} from '@/shared/types/storage.types';
import ThemeSwitcher from '@/shared/ui/theme-switcher/ThemeSwitch';
import Validator from '@/shared/lib/validator';
import {useTranslation} from 'react-i18next';

const LanguageSwitcher = React.lazy(
  () => import('@/shared/ui/language-switcher/LanguageSwitch')
);

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [islValid, setIslValid] = useState<boolean>(true);
  const [error, setError] = useState<string | boolean>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  const isAuthenticated = useIsAuthenticated();

  const {t} = useTranslation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/panel');
    }
  }, [isAuthenticated, navigate]);

  const validateandLogIn = async (event: React.MouseEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const validator = new Validator({email, password}, t);
      const validateData = validator.validate();

      if (validateData.validEmail && validateData.validPass) {
        const loginCore = new LoginCore({email, password}, t);
        const tryLogInRequest = await loginCore.sendLogInRequest();

        if (tryLogInRequest.jwt) {
          const tryLogin: LoginReturnType = await login({
            jwt: tryLogInRequest.jwt,
            email
          });

          if (!tryLogin.status) {
            setError(tryLogin.message);
            setIsLoading(false);
            return;
          }

          navigate('/panel');
        } else {
          setError(tryLogInRequest.message || 'Ошибка авторизации');
        }
      } else {
        setError(
          validateData.validateInputs === true
            ? validator.getErrorMessage(validateData)
            : validateData.validateInputs
        );
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Произошла ошибка при входе');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='h-[95vh] flex flex-col items-center justify-center gap-5'>
      <Link to='/'>
        <img src='/logo.png' alt='loginLogo' width={230} />
      </Link>

      <Form className='w-[80%] md:w-[40%] xl:w-[17%] flex flex-col gap-3 text-[14px]'>
        <TextField.Root
          className={`w-full text-[13px]`}
          type='email'
          placeholder={t('email', {ns: 'login'})}
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
          placeholder={t('password', {ns: 'login'})}
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
          <div className='w-full flex items-center gap-5'>
            <div className='' onClick={() => setError('')}>
              <ThemeSwitcher className='bg-transparent p-0' />
            </div>

            <div className='' onClick={() => setError('')}>
              <LanguageSwitcher
                text={{size: 13}}
                className='bg-transparent p-0'
              />
            </div>

            <div className='w-full'>
              <IconButton
                type='submit'
                onClick={validateandLogIn}
                className='w-full flex items-center gap-1 cursor-pointer bg-[#fb923c] text-black font-bold'
              >
                {isLoading ? (
                  <Loader title={{need: false}} />
                ) : (
                  <>
                    <LogIn size={18} strokeWidth={3} />{' '}
                    {t('enter', {ns: 'login'})}
                  </>
                )}
              </IconButton>
            </div>
          </div>

          <Link to='/register' className='text-[#fb923c] text-[13px]'>
            {t('question', {ns: 'login'})}
          </Link>
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
      </Form>
    </div>
  );
};

export default Login;
