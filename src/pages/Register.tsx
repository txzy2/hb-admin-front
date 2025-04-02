import React, {useState} from 'react';

import {LoginReturnType} from '@/shared/types/storage.types';
import {RegisterCore} from '@/shared/lib/auth/register';
import RegisterStepOne from '@/components/auth/RegisterStepOne';
import Validator from '@/shared/lib/validator';
import useAuthStore from '@/store/auth/auth-store';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [passwordRetype, setPasswordRetype] = useState<string>('');
  const [islValid, setIslValid] = useState<boolean>(true);
  const [error, setError] = useState<string | boolean>();
  const [step, setStep] = useState<number>(1);

  const login = useAuthStore(state => state.login);

  const validateandLogIn = async (event: React.MouseEvent) => {
    event.preventDefault();

    const validator = new Validator({
      email,
      username,
      password,
      passwordRetype
    });
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

        setStep(2);
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
        <>step 2</>
      )}
    </div>
  );
};

export default Register;
