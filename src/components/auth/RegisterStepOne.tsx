import {
	CircleAlert,
	Eye,
	EyeOff,
	FileLock2,
	Lock,
	LogIn,
	User2
} from 'lucide-react';

import { Hover } from '@/shared/animations';
import { Link } from 'react-router-dom';
import React from 'react';

interface StepOneProps {
	email: string;
	password: string;
	passwordRetype: string;
	showPassword: boolean;
	islValid: boolean;
	error?: string | boolean;
	setEmail: (value: string) => void;
	setPassword: (value: string) => void;
	setPasswordRetype: (value: string) => void;
	setShowPassword: (value: boolean) => void;
	setError: (value: string) => void;
	setIslValid: (value: boolean) => void;
	validateandLogIn: (event: React.MouseEvent) => void;
}

const RegisterStepOne: React.FC<StepOneProps> = ({
	email,
	password,
	passwordRetype,
	showPassword,
	islValid,
	error,
	setEmail,
	setPassword,
	setPasswordRetype,
	setShowPassword,
	setError,
	setIslValid,
	validateandLogIn
}) => {
	return (
		<div className='flex flex-col items-center gap-5'>
			<a href='/'>
				<img src='/logo.png' alt='loginLogo' width={230} />
			</a>

			<form className='flex flex-col gap-4 text-[14px]'>
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
				</div>

				<div className='relative'>
					<input
						className={`px-24 pb-1 bg-transparent border-b outline-none pl-8 w-full text-[13px]`}
						type={showPassword ? 'text' : 'password'}
						placeholder='Повторите пароль'
						maxLength={24}
						value={passwordRetype}
						onChange={e => {
							setPasswordRetype(e.target.value);
							setError('');
							setIslValid(true);
						}}
					/>
					<span className='absolute left-1 top-1/3 transform -translate-y-1/2'>
						<FileLock2
							size={20}
							color={`${!islValid ? '#f87171' : '#fb923c'}`}
						/>
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

				<button type='submit' onClick={validateandLogIn}>
					<Hover
						scale={1.02}
						className='flex items-center gap-2 justify-center py-2 bg-[#fb923c] text-gray-800 font-bold rounded-2xl'
					>
						<LogIn size={18} strokeWidth={3} /> Зарегистрироваться
					</Hover>
				</button>

				<Hover scale={1.05} className='text-center'>
					<Link to='/login' className='text-[#fb923c] text-[13px]'>
						Уже зарегистрирован?
					</Link>
				</Hover>

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

export default RegisterStepOne;
