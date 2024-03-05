import {
  AT_LEAST_ONE_DIGIT,
  AT_LEAST_ONE_LOWER,
  AT_LEAST_ONE_UPPER,
  INVALID_LENGTH_6_TEXT,
  INVALID_REQUIRED_TEXT,
  NO_WHITESPACES,
  atLeastOneDigitRegExp,
  atLeastOneLowerRegExp,
  atLeastOneUpperRegExp,
  noWhitespacesRegExp,
} from "components/Auth/config";
import { Validation } from "types/authConfig";

// Validation schemes

// Password Validation
export const passwordValidation: Validation = {
  required: {
    value: true,
    message: INVALID_REQUIRED_TEXT,
  },
  minLength: {
    value: 6,
    message: INVALID_LENGTH_6_TEXT,
  },
  validate: {
    hasUpper: (value: string) => atLeastOneUpperRegExp.test(value) || AT_LEAST_ONE_UPPER,
    hasNumber: (value: string) => atLeastOneDigitRegExp.test(value) || AT_LEAST_ONE_DIGIT,
    hasLower: (value: string) => atLeastOneLowerRegExp.test(value) || AT_LEAST_ONE_LOWER,
    hasNoWhitespaces: (value: string) => noWhitespacesRegExp.test(value) || NO_WHITESPACES,
  },
};

// UserName Validation
export const userNameValidation: Validation = {
  required: {
    value: true,
    message: INVALID_REQUIRED_TEXT,
  },
};

// Success messages

export const passwordSuccess = "Your password was successfully changed!";
export const userNameSuccess = "Your username was successfully changed!";
export const userAvatarSuccess = "Your photo was successfully changed!";
