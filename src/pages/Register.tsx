import React, { useState } from 'react';

import RegisterStepOne from '@/components/auth/RegisterStepOne';
import { useNavigate } from 'react-router-dom';
import { validateAuth } from '@/shared/lib/validator';
import { ValidateTypes } from '@/shared/types/types';

const Register: React.FC = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordRetype, setPasswordRetype] = useState<string>('');
	const [islValid, setIslValid] = useState<boolean>(false);
	const [error, setError] = useState<string | boolean>();
	const [step, setStep] = useState<number>(1);

	// const navigate = useNavigate();

	const validateandLogIn = (event: React.MouseEvent) => {
		event.preventDefault();

		const data: ValidateTypes = {
			email,
			password,
			passwordRetype
		};

		const validateData = validateAuth(data);

		if (password !== passwordRetype) {
			setError('Введенные пароли не совпадают');
			return;
		}

		if (
			validateData.validEmail &&
			validateData.validPass &&
			validateData.validRetypePass
		) {
			localStorage.setItem('token', '1234');
			setIslValid(true);
			setStep(2);
			console.log('Зареган');
		} else if (validateData?.validateInputs === true) {
			if (!validateData.validEmail) {
				setError('Невалидная почта');
			} else if (!validateData.validPass || !validateData?.validRetypePass) {
				setError('Пароль не соответствует требованиям');
			} else {
				setError('Непредвиденная ошибка, обновите страницу');
			}
		} else {
			setError(validateData.validateInputs);
		}
	};

	return (
		<div className='h-[95vh] flex items-center justify-center'>
			{step === 1 ? (
				<RegisterStepOne
					email={email}
					password={password}
					passwordRetype={passwordRetype}
					showPassword={showPassword}
					islValid={islValid}
					error={error}
					setEmail={setEmail}
					setPassword={setPassword}
					setPasswordRetype={setPasswordRetype}
					setShowPassword={setShowPassword}
					setError={setError}
					setIslValid={setIslValid}
					validateandLogIn={validateandLogIn}
				/>
			) : (
				<>step 2</>
			)}
		</div>
	);
};

export default Register;
