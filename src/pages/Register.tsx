import React, {useState} from 'react';

import {LoginReturnType} from '@/shared/types/storage.types';
import {RegisterCore} from '@/shared/lib/auth/register';
import RegisterStepOne from '@/components/auth/RegisterStepOne';
import RegisterStepTwo from '@/components/auth/RegisterStepTwo';
import Validator from '@/shared/lib/validator';
import useAuthStore from '@/store/auth/auth-store';
import { useTranslation } from 'react-i18next';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [passwordRetype, setPasswordRetype] = useState<string>('');
  const [islValid, setIslValid] = useState<boolean>(true);
  const [error, setError] = useState<string | boolean>();
  const [step, setStep] = useState<number>(() => {
    const savedStep = localStorage.getItem('currentStep');
    return savedStep ? parseInt(savedStep) : 1;
  });

  const login = useAuthStore(state => state.login);
  const t = useTranslation();

  const setStepAndSave = (newStep: number) => {
    setStep(newStep);
    localStorage.setItem('currentStep', newStep.toString());
  };

  const validateandLogIn = async (event: React.MouseEvent) => {
    event.preventDefault();

    const validator = new Validator({
      email,
      username,
      password,
      passwordRetype
    }, t);
    const validateData = validator.validate();

    if (
      validateData.validEmail &&
      validateData.validUsername &&
      validateData.validPass &&
      validateData.validRetypePass
    ) {
      const registration = new RegisterCore({email, username, password});
      const sendRegisterRequest = await registration.firstStepRegiserUser();

      if (sendRegisterRequest.jwt) {
        const tryLogin: LoginReturnType = await login({
          jwt: sendRegisterRequest.jwt,
          username,
          email
        });

        if (!tryLogin.status) {
          setError(tryLogin.message);
          return;
        }

        setStepAndSave(2);
      }

      setError(sendRegisterRequest.message);
      setIslValid(false);
    } else {
      setIslValid(false);
      setError(
        validateData.validateInputs === true
          ? validator.getErrorMessage(validateData)
          : validateData.validateInputs
      );
    }
  };

  return (
    <div className='h-[95vh] flex items-center justify-center'>
      {step === 1 ? (
        <RegisterStepOne
          email={email}
          username={username}
          password={password}
          passwordRetype={passwordRetype}
          showPassword={showPassword}
          islValid={islValid}
          error={error}
          setEmail={setEmail}
          setUsername={setUsername}
          setPassword={setPassword}
          setPasswordRetype={setPasswordRetype}
          setShowPassword={setShowPassword}
          setError={setError}
          setIslValid={setIslValid}
          validateandLogIn={validateandLogIn}
        />
      ) : (
        <RegisterStepTwo setStepRegister={setStepAndSave} />
      )}
    </div>
  );
};

export default Register;
