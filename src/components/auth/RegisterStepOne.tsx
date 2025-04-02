import {Callout, IconButton, TextField} from '@radix-ui/themes';
import {
  CircleAlert,
  Eye,
  EyeOff,
  FileLock2,
  Lock,
  LogIn,
  User2
} from 'lucide-react';
import {FadeIn, Hover} from '@/shared/animations';

import {Link} from 'react-router-dom';
import React from 'react';

interface StepOneProps {
  username: string;
  email: string;
  password: string;
  passwordRetype: string;
  showPassword: boolean;
  islValid: boolean;
  error?: string | boolean;
  setEmail: (value: string) => void;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  setPasswordRetype: (value: string) => void;
  setShowPassword: (value: boolean) => void;
  setError: (value: string) => void;
  setIslValid: (value: boolean) => void;
  validateandLogIn: (event: React.MouseEvent) => void;
}

const RegisterStepOne: React.FC<StepOneProps> = ({
  username,
  email,
  password,
  passwordRetype,
  showPassword,
  islValid,
  error,
  setEmail,
  setUsername,
  setPassword,
  setPasswordRetype,
  setShowPassword,
  setError,
  setIslValid,
  validateandLogIn
}) => {
  return (
    <div className='flex flex-col items-center gap-7'>
      <FadeIn>
        <a href='/'>
          <img src='/logo.png' alt='loginLogo' width={230} />
        </a>
      </FadeIn>

      <form className='w-[80%] xl:w-1/2 flex flex-col gap-3 text-[14px]'>
        <TextField.Root
          className={`w-full text-[13px]`}
          type='text'
          placeholder='ФИО'
          maxLength={35}
          value={username}
          onChange={e => {
            setUsername(e.target.value);
            setError('');
            setIslValid(true);
          }}
        >
          <TextField.Slot>
            <User2 size={20} color={`${!islValid ? '#f87171' : '#fb923c'}`} />
          </TextField.Slot>
        </TextField.Root>

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
          className={`w-full text-[13px]`}
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
        </TextField.Root>

        <TextField.Root
          className={`w-full text-[13px]`}
          type={showPassword ? 'text' : 'password'}
          maxLength={24}
          placeholder={'Повторите пароль'}
          value={passwordRetype}
          onChange={e => {
            setPasswordRetype(e.target.value);
            setError('');
            setIslValid(true);
          }}
        >
          <TextField.Slot>
            <FileLock2
              size={20}
              color={`${!islValid ? '#f87171' : '#fb923c'}`}
            />
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

        <div className='flex items-center justify-between px-1'>
          <Hover scale={1.02} className='text-center'>
            <Link to='/login' className='text-[#fb923c] text-[12px]'>
              Уже зарегистрирован?
            </Link>
          </Hover>

          <Hover scale={1.02} className='w-1/2'>
            <IconButton
              type='submit'
              onClick={validateandLogIn}
              className='ml-auto w-full flex items-center gap-1 cursor-pointer bg-[#fb923c] text-gray-800 font-bold'
            >
              <LogIn size={18} strokeWidth={3} /> Отправить
            </IconButton>
          </Hover>
        </div>
      </form>

      <FadeIn className='w-[75%] flex items-center'>
        <Callout.Root>
          <Callout.Icon>
            <CircleAlert />
          </Callout.Icon>
          <Callout.Text className='text-[12px] leading-4'>
            Пароль должен содержать как минимум 8 элементов, заглавную букву,
            цифру и спец сивол.
          </Callout.Text>
        </Callout.Root>
      </FadeIn>
    </div>
  );
};

export default RegisterStepOne;
