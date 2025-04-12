import {
  PasswordValidateReturnType,
  ValidateReturnTypes,
  ValidateTypes,
  ValidationConditionsType
} from '../types/types';

export default class Validator {
  private email: string;
  private password: string;
  private passwordRetype: string;

  private t: any;

  constructor(data: ValidateTypes, t: any) {
    this.email = data.email;
    this.password = data.password;
    this.passwordRetype = data.passwordRetype || '';

    this.t = t;
  }

  private validatePassword(): PasswordValidateReturnType {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    return {
      isValidPass: passwordRegex.test(this.password),
      isValidRetype: passwordRegex.test(this.passwordRetype)
    };
  }

  private validateEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  private validateInput(): {isValid: boolean; message?: string} {
    const validations: ValidationConditionsType[] = [
      {
        condition: !this.email.trim(),
        message: this.t('validator.email')
      },
      {
        condition: !this.password.trim(),
        message: this.t('validator.password')
      },
      {
        condition: this.password.length < 8,
        message: this.t('validator.least8')
      },
      {
        condition: this.passwordRetype && this.passwordRetype !== this.password,
        message: this.t('validator.passwordDontSame')
      }
    ];

    const failedValidation = validations.find(
      validation => validation.condition
    );

    return {
      isValid: !failedValidation,
      message: failedValidation?.message
    };
  }

  public validate(): ValidateReturnTypes {
    const inputValidation = this.validateInput();
    const passwordValidation = this.validatePassword();

    return {
      validEmail: this.validateEmail(),
      validUsername: inputValidation.isValid,
      validPass: passwordValidation.isValidPass,
      validRetypePass: passwordValidation.isValidRetype,
      validateInputs: inputValidation.isValid ? true : inputValidation.message
    };
  }

  public getErrorMessage(validateData: ValidateReturnTypes): string {
    if (!validateData.validEmail) {
      return 'Невалидная почта';
    } else if (!validateData.validPass || !validateData.validRetypePass) {
      return 'Пароль не соответствует требованиям';
    } else if (typeof validateData.validateInputs === 'string') {
      return validateData.validateInputs;
    } else {
      return 'Непредвиденная ошибка, обновите страницу';
    }
  }
}
