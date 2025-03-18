import {
	PasswordValidateReturnType,
	PasswordValidateType,
	ValidateReturnTypes,
	ValidateTypes
} from '../types/types';

const validatePassword = ({
	password,
	passwordRetype
}: PasswordValidateType): PasswordValidateReturnType => {
	const passwordRegex =
		/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

	return {
		isValidPass: passwordRegex.test(password),
		isValidRetype: passwordRetype ? passwordRegex.test(passwordRetype) : false
	};
};

const validateEmail = (email: string) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export const validateAuth = (data: ValidateTypes): ValidateReturnTypes => {
	const inputValidation = validateInput(data);
	const passwordValidation = validatePassword(data);

	return {
		validEmail: validateEmail(data.email),
		validPass: passwordValidation.isValidPass,
		validRetypePass: passwordValidation.isValidRetype,
		validateInputs: inputValidation
	};
};

const validateInput = (data: ValidateTypes): string | boolean => {
	if (!data.email.trim() || !data.password.trim()) {
		return 'Поля не могут быть пустыми';
	}

	if (data.passwordRetype !== undefined && !data.passwordRetype.trim()) {
		return 'Поле повторного ввода пароля не может быть пустым';
	}

	if (data.password.length < 8) {
		return 'Пароль должен быть больше 8 символов';
	}

	return true;
};
