import React, {useState} from 'react';

import RegisterStepOne from '@/components/auth/RegisterStepOne';
import {ValidateTypes} from '@/shared/types/types';
import Validator from '@/shared/lib/validator';
import useAuthStore from '@/store/auth/auth-store';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordRetype, setPasswordRetype] = useState<string>('');
  const [islValid, setIslValid] = useState<boolean>(true);
  const [error, setError] = useState<string | boolean>();
  const [step, setStep] = useState<number>(1);

  const login = useAuthStore(state => state.login);

  const validateandLogIn = (event: React.MouseEvent) => {
    event.preventDefault();

    const data: ValidateTypes = {
      email,
      password,
      passwordRetype
    };

    const validator = new Validator(data);
    const validateData = validator.validate();

    if (
      validateData.validEmail &&
      validateData.validPass &&
      validateData.validRetypePass
    ) {
      login('1234', email);

      setStep(2);
      console.log('Зареган');
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
