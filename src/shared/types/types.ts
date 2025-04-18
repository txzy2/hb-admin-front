import {ReactNode} from 'react';

export interface DefaultAnimationsProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export type ValidateTypes = {
  email: string;
  username?: string;
  password: string;
  passwordRetype?: string;
};

export type ValidateReturnTypes = {
  validEmail: boolean;
  validUsername: boolean;
  validPass: boolean;
  validRetypePass?: boolean;
  validateInputs?: boolean | string;
};

export type PasswordValidateType = {
  password: string;
  passwordRetype?: string;
};

export type PasswordValidateReturnType = {
  isValidPass: boolean;
  isValidRetype: boolean;
};

export type ValidationConditionsType = {
  condition: boolean | string;
  message: string;
};
